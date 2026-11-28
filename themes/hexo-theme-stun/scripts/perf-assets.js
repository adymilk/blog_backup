'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function loadImageMeta(baseDir) {
  const metaPath = path.join(baseDir, 'source', '_data', 'images_meta.json');
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch (e) {
    return {};
  }
}

function escapeAttr(val) {
  return String(val || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

hexo.extend.helper.register('responsive_img', function (src, opts) {
  opts = opts || {};
  const meta = loadImageMeta(hexo.base_dir);
  const info = meta[src];
  const cls = opts.class ? ` class="${escapeAttr(opts.class)}"` : '';
  const style = opts.style ? ` style="${escapeAttr(opts.style)}"` : '';
  const alt = escapeAttr(opts.alt || '');
  const loading = opts.loading || 'lazy';
  const decoding = opts.decoding || 'async';
  const fetchpriority = opts.fetchpriority ? ` fetchpriority="${escapeAttr(opts.fetchpriority)}"` : '';
  const sizes = escapeAttr(opts.sizes || '(max-width: 768px) 100vw, 800px');

  if (!info) {
    const w = opts.width ? ` width="${opts.width}"` : '';
    const h = opts.height ? ` height="${opts.height}"` : '';
    return `<img src="${this.url_for(src)}" alt="${alt}"${cls}${style}${w}${h} loading="${loading}" decoding="${decoding}"${fetchpriority}>`;
  }

  const w = opts.width || info.width;
  const h = opts.height || info.height;
  const fullAttr = opts.lightbox !== false ? ` data-full="${this.url_for(info.original)}"` : '';
  const webpSource = info.webp_variants && info.webp_variants.length
    ? `<source type="image/webp" srcset="${info.webp_variants.map((v) => `${this.url_for(v.src)} ${v.w}w`).join(', ')}" sizes="${sizes}">`
    : '';

  return (
    `<picture>` +
    webpSource +
    `<img src="${this.url_for(info.fallback)}" alt="${alt}"${cls}${style} width="${w}" height="${h}" loading="${loading}" decoding="${decoding}"${fetchpriority}${fullAttr}>` +
    `</picture>`
  );
});

hexo.extend.helper.register('hero_preload', function (src, sizes) {
  const meta = loadImageMeta(hexo.base_dir);
  const info = meta[src];
  if (!info || !info.webp_variants || !info.webp_variants.length) return '';
  const srcset = info.webp_variants.map((v) => `${this.url_for(v.src)} ${v.w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="${escapeAttr(sizes || '(max-width: 768px) 92vw, 480px')}" fetchpriority="high">`;
});

hexo.extend.filter.register('after_render:html', function (html) {
  const svgCache = {};
  const meta = loadImageMeta(hexo.base_dir);

  function getSvgDims(imgSrc) {
    if (svgCache[imgSrc] !== undefined) return svgCache[imgSrc];
    const localPath = path.join(hexo.base_dir, 'source', imgSrc.replace(/^\//, ''));
    if (!fs.existsSync(localPath)) {
      svgCache[imgSrc] = null;
      return null;
    }
    try {
      const content = fs.readFileSync(localPath, 'utf8');
      const vb = content.match(/viewBox=["']\s*[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
      if (vb) {
        svgCache[imgSrc] = { w: Math.round(parseFloat(vb[1])), h: Math.round(parseFloat(vb[2])) };
        return svgCache[imgSrc];
      }
    } catch (e) {}
    svgCache[imgSrc] = null;
    return null;
  }

  html = html.replace(/<img\b([^>]+)>/gi, function (match, attrs) {
    let updated = attrs;
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      const src = srcMatch[1];
      if (!/\bwidth=/i.test(updated) || !/\bheight=/i.test(updated)) {
        if (src.endsWith('.svg')) {
          const dims = getSvgDims(src);
          if (dims) updated += ` width="${dims.w}" height="${dims.h}"`;
        } else if (meta[src]) {
          updated += ` width="${meta[src].width}" height="${meta[src].height}"`;
        }
      }
    }
    if (!/\bloading=/i.test(updated)) updated += ' loading="lazy"';
    if (!/\bdecoding=/i.test(updated)) updated += ' decoding="async"';
    return `<img${updated}>`;
  });

  html = html.replace(/<a\b([^>]*class=["'][^"']*heading-link[^"']*["'][^>]*)>/gi, function (match, attrs) {
    if (/\baria-label=/i.test(attrs)) return match;
    return `<a${attrs} aria-label="章节锚点链接">`;
  });

  return html;
});

hexo.extend.filter.register('after_generate', function () {
  const route = hexo.route;
  function readRoute(routePath) {
    return new Promise((resolve) => {
      const stream = route.get(routePath);
      if (!stream) return resolve(null);
      const chunks = [];
      stream.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', () => resolve(null));
    });
  }

  return Promise.all([readRoute('css/index.css'), readRoute('js/brand.js')]).then(([cssBuf, jsBuf]) => {
    const replacements = [];
    if (cssBuf) {
      const hash = crypto.createHash('sha256').update(cssBuf).digest('hex').slice(0, 8);
      const hashedPath = `css/index.${hash}.css`;
      route.set(hashedPath, cssBuf);
      replacements.push({ from: '/css/index.css', to: `/${hashedPath}` });
    }
    if (jsBuf) {
      const hash = crypto.createHash('sha256').update(jsBuf).digest('hex').slice(0, 8);
      const hashedPath = `js/brand.${hash}.js`;
      route.set(hashedPath, jsBuf);
      replacements.push({ from: '/js/brand.js', to: `/${hashedPath}` });
    }
    if (!replacements.length) return;

    const htmlRoutes = route.list().filter((r) => r.endsWith('.html'));
    return Promise.all(
      htmlRoutes.map((hr) =>
        readRoute(hr).then((buf) => {
          if (!buf) return;
          let text = buf.toString('utf8');
          let changed = false;
          for (const rep of replacements) {
            if (text.includes(rep.from)) {
              text = text.split(rep.from).join(rep.to);
              changed = true;
            }
          }
          if (changed) route.set(hr, text);
        })
      )
    );
  });
});
