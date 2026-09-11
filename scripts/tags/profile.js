'use strict'

/**
 * {% profile <keyPath> [ul|ol] %}
 *
 * 让 markdown 正文能读到 source/_data/profile.yml 的数据。
 *
 * 为什么需要这个：Hexo 渲染正文时的 nunjucks context 只有 post 自身的数据
 * （见 node_modules/hexo/lib/hexo/post.js 的 `tag.render(data.content, data)`），
 * 拿不到 site.data。所以 `{{ site.data.profile.x }}` 在正文里是取不到值的。
 *
 * 用法：
 *   {% profile contact %}              → contact 段渲染成 <dl>
 *   {% profile job_target.roles ul %}  → 数组渲染成 <ul>
 *
 * 设计原则：只做「取数据 → 简单渲染」。复杂版式请在 pug layout 里做。
 */
function profile (args) {
  const keyPath = (args[0] || '').trim()
  const wrap = (args[1] || '').trim()

  const data = hexo.locals.get('data') || {}
  const root = data.profile

  if (!root) {
    hexo.log.warn('[profile] source/_data/profile.yml not found.')
    return ''
  }

  const value = keyPath.split('.').reduce(function (acc, key) {
    return acc == null ? undefined : acc[key]
  }, root)

  if (value == null || value === '') {
    hexo.log.warn('[profile] key "%s" is empty or missing.', keyPath)
    return ''
  }

  const esc = function (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  // 数组 → 列表
  if (Array.isArray(value)) {
    if (!value.length) return ''
    const tag = wrap === 'ol' ? 'ol' : 'ul'
    const items = value.map(function (item) {
      if (item && typeof item === 'object') {
        // 对象数组：把非空的标量字段渲染成 key: value
        const parts = Object.keys(item)
          .filter(function (k) {
            const v = item[k]
            return v !== '' && v != null && typeof v !== 'object'
          })
          .map(function (k) { return esc(k) + ': ' + esc(item[k]) })
        return '<li>' + parts.join(' / ') + '</li>'
      }
      return '<li>' + esc(item) + '</li>'
    }).join('')
    return '<' + tag + ' class="profile-list">' + items + '</' + tag + '>'
  }

  // 对象 → 描述列表（跳过空值，避免把未填的 TODO 字段渲染出来）
  if (typeof value === 'object') {
    const rows = Object.keys(value)
      .filter(function (k) {
        const v = value[k]
        return v !== '' && v != null && !Array.isArray(v) && typeof v !== 'object'
      })
      .map(function (k) {
        return '<dt>' + esc(k) + '</dt><dd>' + esc(value[k]) + '</dd>'
      })
      .join('')
    if (!rows) return ''
    return '<dl class="profile-dl">' + rows + '</dl>'
  }

  return esc(value)
}

hexo.extend.tag.register('profile', profile, { ends: false })
