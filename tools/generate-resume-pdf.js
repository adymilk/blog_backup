#!/usr/bin/env node
/**
 * Single-Source-of-Truth macOS Native PDF Resume Generator
 * Reads `source/_data/resume.yml` and generates:
 *   - source/uploads/Professional_Resume_CN.pdf
 *   - source/uploads/Professional_Resume_EN.pdf
 * Zero external dependencies (uses Hexo's bundled js-yaml + macOS CoreGraphics/CoreText).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'source', '_data', 'resume.yml');
const OUT_DIR = path.join(ROOT, 'source', 'uploads');

const OBJC_SRC = String.raw`
#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreText/CoreText.h>

static const CGFloat PAGE_W = 595.28;
static const CGFloat PAGE_H = 841.89;
static const CGFloat MARGIN_L = 40.0;
static const CGFloat MARGIN_R = 40.0;
static const CGFloat MARGIN_T = 38.0;
static const CGFloat MARGIN_B = 40.0;

@interface PDFWriter : NSObject
@property (nonatomic) CGContextRef ctx;
@property (nonatomic) CGFloat y;
@property (nonatomic) NSInteger pageNum;
@property (nonatomic, copy) NSString *footerLeft;
@property (nonatomic) BOOL isEn;
@end

@implementation PDFWriter

- (CTFontRef)font:(NSString *)name size:(CGFloat)size {
    CTFontRef f = CTFontCreateWithName((__bridge CFStringRef)name, size, NULL);
    if (!f) f = CTFontCreateWithName(CFSTR("PingFangSC-Regular"), size, NULL);
    return f;
}

- (CGColorRef)rgb:(CGFloat)r g:(CGFloat)g b:(CGFloat)b {
    CGColorSpaceRef cs = CGColorSpaceCreateDeviceRGB();
    CGFloat comps[4] = {r/255.0, g/255.0, b/255.0, 1.0};
    CGColorRef c = CGColorCreate(cs, comps);
    CGColorSpaceRelease(cs);
    return c;
}

- (void)drawFooter {
    CTFontRef f = [self font:@"PingFangSC-Regular" size:7.5];
    CGColorRef gray = [self rgb:107 g:114 b:128];
    NSDictionary *attrs = @{
        (id)kCTFontAttributeName: (__bridge id)f,
        (id)kCTForegroundColorAttributeName: (__bridge id)gray
    };
    NSString *right = self.isEn
        ? [NSString stringWithFormat:@"Page %ld", (long)self.pageNum]
        : [NSString stringWithFormat:@"第 %ld 页", (long)self.pageNum];
    [self drawSingleLine:self.footerLeft x:MARGIN_L y:22.0 attrs:attrs];
    [self drawSingleLine:right x:PAGE_W - MARGIN_R - 42.0 y:22.0 attrs:attrs];
    CGColorRelease(gray);
    CFRelease(f);
}

- (void)beginPage {
    CGRect box = CGRectMake(0, 0, PAGE_W, PAGE_H);
    CGContextBeginPage(self.ctx, &box);
    self.pageNum += 1;
    self.y = PAGE_H - MARGIN_T;
}

- (void)endPage {
    [self drawFooter];
    CGContextEndPage(self.ctx);
}

- (void)ensureSpace:(CGFloat)needed {
    if (self.y - needed < MARGIN_B) {
        [self endPage];
        [self beginPage];
    }
}

- (void)drawSingleLine:(NSString *)text x:(CGFloat)x y:(CGFloat)y attrs:(NSDictionary *)attrs {
    if (!text.length) return;
    NSAttributedString *as = [[NSAttributedString alloc] initWithString:text attributes:attrs];
    CTLineRef line = CTLineCreateWithAttributedString((__bridge CFAttributedStringRef)as);
    CGContextSetTextPosition(self.ctx, x, y);
    CTLineDraw(line, self.ctx);
    CFRelease(line);
}

- (CGFloat)measureText:(NSString *)text width:(CGFloat)width fontName:(NSString *)fn size:(CGFloat)sz lineSpacing:(CGFloat)ls {
    if (!text.length) return 0;
    CTFontRef f = [self font:fn size:sz];
    CTParagraphStyleSetting settings[1] = {
        { kCTParagraphStyleSpecifierLineSpacingAdjustment, sizeof(CGFloat), &ls }
    };
    CTParagraphStyleRef ps = CTParagraphStyleCreate(settings, 1);
    NSDictionary *attrs = @{
        (id)kCTFontAttributeName: (__bridge id)f,
        (id)kCTParagraphStyleAttributeName: (__bridge id)ps
    };
    NSAttributedString *as = [[NSAttributedString alloc] initWithString:text attributes:attrs];
    CTFramesetterRef fs = CTFramesetterCreateWithAttributedString((__bridge CFAttributedStringRef)as);
    CGSize fit = CTFramesetterSuggestFrameSizeWithConstraints(fs, CFRangeMake(0, 0), NULL, CGSizeMake(width, 2000), NULL);
    CFRelease(fs);
    CFRelease(ps);
    CFRelease(f);
    return ceil(fit.height);
}

- (CGFloat)drawWrapped:(NSString *)text x:(CGFloat)x width:(CGFloat)width fontName:(NSString *)fn size:(CGFloat)sz r:(CGFloat)r g:(CGFloat)g b:(CGFloat)b lineSpacing:(CGFloat)ls {
    if (!text.length) return 0;
    CGFloat h = [self measureText:text width:width fontName:fn size:sz lineSpacing:ls] + 2.0;
    [self ensureSpace:h];
    CTFontRef f = [self font:fn size:sz];
    CGColorRef col = [self rgb:r g:g b:b];
    CTParagraphStyleSetting settings[1] = {
        { kCTParagraphStyleSpecifierLineSpacingAdjustment, sizeof(CGFloat), &ls }
    };
    CTParagraphStyleRef ps = CTParagraphStyleCreate(settings, 1);
    NSDictionary *attrs = @{
        (id)kCTFontAttributeName: (__bridge id)f,
        (id)kCTForegroundColorAttributeName: (__bridge id)col,
        (id)kCTParagraphStyleAttributeName: (__bridge id)ps
    };
    NSAttributedString *as = [[NSAttributedString alloc] initWithString:text attributes:attrs];
    CTFramesetterRef fs = CTFramesetterCreateWithAttributedString((__bridge CFAttributedStringRef)as);
    CGMutablePathRef path = CGPathCreateMutable();
    CGPathAddRect(path, NULL, CGRectMake(x, self.y - h, width, h));
    CTFrameRef frame = CTFramesetterCreateFrame(fs, CFRangeMake(0, 0), path, NULL);
    CTFrameDraw(frame, self.ctx);
    CFRelease(frame);
    CGPathRelease(path);
    CFRelease(fs);
    CFRelease(ps);
    CGColorRelease(col);
    CFRelease(f);
    self.y -= h;
    return h;
}

- (void)drawSectionHeader:(NSString *)title sub:(NSString *)sub {
    [self ensureSpace:28.0];
    self.y -= 6.0;
    CGFloat contentW = PAGE_W - MARGIN_L - MARGIN_R;
    CTFontRef fTitle = [self font:@"PingFangSC-Semibold" size:10.5];
    CTFontRef fSub = [self font:@"HelveticaNeue-Medium" size:7.5];
    CGColorRef dark = [self rgb:17 g:24 b:39];
    CGColorRef accent = [self rgb:43 g:91 b:132];
    NSDictionary *aTitle = @{ (id)kCTFontAttributeName: (__bridge id)fTitle, (id)kCTForegroundColorAttributeName: (__bridge id)dark };
    NSDictionary *aSub = @{ (id)kCTFontAttributeName: (__bridge id)fSub, (id)kCTForegroundColorAttributeName: (__bridge id)accent };
    [self drawSingleLine:title x:MARGIN_L y:self.y - 11.0 attrs:aTitle];
    if (sub.length) {
        NSAttributedString *as = [[NSAttributedString alloc] initWithString:sub attributes:aSub];
        CTLineRef line = CTLineCreateWithAttributedString((__bridge CFAttributedStringRef)as);
        double w = CTLineGetTypographicBounds(line, NULL, NULL, NULL);
        CGContextSetTextPosition(self.ctx, MARGIN_L + contentW - w, self.y - 10.5);
        CTLineDraw(line, self.ctx);
        CFRelease(line);
    }
    CGContextSetStrokeColorWithColor(self.ctx, [self rgb:209 g:213 b:219]);
    CGContextSetLineWidth(self.ctx, 0.8);
    CGContextMoveToPoint(self.ctx, MARGIN_L, self.y - 15.5);
    CGContextAddLineToPoint(self.ctx, MARGIN_L + contentW, self.y - 15.5);
    CGContextStrokePath(self.ctx);
    CGColorRelease(dark);
    CGColorRelease(accent);
    CFRelease(fTitle);
    CFRelease(fSub);
    self.y -= 22.0;
}

- (void)drawPortrait:(NSString *)imgPath {
    if (!imgPath.length) return;
    CFURLRef url = CFURLCreateWithFileSystemPath(NULL, (__bridge CFStringRef)imgPath, kCFURLPOSIXPathStyle, false);
    CGDataProviderRef dp = CGDataProviderCreateWithURL(url);
    if (!dp) { CFRelease(url); return; }
    CGImageRef img = CGImageCreateWithJPEGDataProvider(dp, NULL, true, kCGRenderingIntentDefault);
    CGDataProviderRelease(dp);
    CFRelease(url);
    if (!img) return;
    CGFloat w = 64.0, h = 80.0;
    CGFloat x = PAGE_W - MARGIN_R - w;
    CGFloat y = PAGE_H - MARGIN_T - h + 4.0;
    CGContextSaveGState(self.ctx);
    CGContextClipToRect(self.ctx, CGRectMake(x, y, w, h));
    CGFloat iw = CGImageGetWidth(img), ih = CGImageGetHeight(img);
    CGFloat scale = MAX(w / iw, h / ih);
    CGFloat dw = iw * scale, dh = ih * scale;
    CGContextDrawImage(self.ctx, CGRectMake(x + (w - dw)/2.0, y + (h - dh), dw, dh), img);
    CGContextRestoreGState(self.ctx);
    CGImageRelease(img);
}

@end

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        if (argc < 3) return 1;
        NSString *jsonPath = [NSString stringWithUTF8String:argv[1]];
        NSString *outPath = [NSString stringWithUTF8String:argv[2]];
        NSData *raw = [NSData dataWithContentsOfFile:jsonPath];
        NSDictionary *doc = [NSJSONSerialization JSONObjectWithData:raw options:0 error:nil];
        if (!doc) return 2;

        CFURLRef url = CFURLCreateWithFileSystemPath(NULL, (__bridge CFStringRef)outPath, kCFURLPOSIXPathStyle, false);
        CGRect box = CGRectMake(0, 0, PAGE_W, PAGE_H);
        CGContextRef ctx = CGPDFContextCreateWithURL(url, &box, NULL);
        CFRelease(url);

        PDFWriter *w = [PDFWriter new];
        w.ctx = ctx;
        w.isEn = [doc[@"isEn"] boolValue];
        w.footerLeft = doc[@"footerLeft"] ?: @"";
        [w beginPage];

        CGFloat contentW = PAGE_W - MARGIN_L - MARGIN_R;
        CGFloat headerW = contentW - 76.0;

        // Portrait
        [w drawPortrait:doc[@"portraitPath"]];

        // Header
        [w drawWrapped:doc[@"eyebrow"] x:MARGIN_L width:headerW fontName:@"HelveticaNeue-Bold" size:7.5 r:43 g:91 b:132 lineSpacing:1.5];
        w.y -= 1.0;
        [w drawWrapped:doc[@"nameLine"] x:MARGIN_L width:headerW fontName:@"PingFangSC-Semibold" size:17.0 r:17 g:24 b:39 lineSpacing:1.5];
        [w drawWrapped:doc[@"subtitle"] x:MARGIN_L width:headerW fontName:@"PingFangSC-Medium" size:9.5 r:43 g:91 b:132 lineSpacing:2.0];
        w.y -= 2.0;
        [w drawWrapped:doc[@"metaLine1"] x:MARGIN_L width:headerW fontName:@"PingFangSC-Regular" size:8.0 r:55 g:65 b:81 lineSpacing:2.0];
        [w drawWrapped:doc[@"metaLine2"] x:MARGIN_L width:headerW fontName:@"PingFangSC-Regular" size:8.0 r:55 g:65 b:81 lineSpacing:2.0];

        if (w.y > PAGE_H - MARGIN_T - 84.0) w.y = PAGE_H - MARGIN_T - 84.0;
        CGContextSetStrokeColorWithColor(ctx, [w rgb:17 g:24 b:39]);
        CGContextSetLineWidth(ctx, 1.3);
        CGContextMoveToPoint(ctx, MARGIN_L, w.y);
        CGContextAddLineToPoint(ctx, MARGIN_L + contentW, w.y);
        CGContextStrokePath(ctx);
        w.y -= 6.0;

        // Sections
        for (NSDictionary *sec in doc[@"sections"]) {
            if ([sec[@"pageBreak"] boolValue]) {
                [w endPage];
                [w beginPage];
            }
            [w drawSectionHeader:sec[@"title"] sub:sec[@"sub"]];

            for (NSDictionary *blk in sec[@"blocks"]) {
                NSString *type = blk[@"type"];
                if ([type isEqualToString:@"para"]) {
                    [w drawWrapped:blk[@"text"] x:MARGIN_L width:contentW fontName:@"PingFangSC-Regular" size:8.4 r:55 g:65 b:81 lineSpacing:2.8];
                    w.y -= 3.0;
                } else if ([type isEqualToString:@"tags"]) {
                    [w drawWrapped:blk[@"text"] x:MARGIN_L width:contentW fontName:@"PingFangSC-Medium" size:8.0 r:30 g:67 b:99 lineSpacing:2.5];
                    w.y -= 4.0;
                } else if ([type isEqualToString:@"subhead"]) {
                    [w ensureSpace:26.0];
                    w.y -= 2.0;
                    [w drawWrapped:blk[@"text"] x:MARGIN_L width:contentW fontName:@"PingFangSC-Semibold" size:9.2 r:17 g:24 b:39 lineSpacing:2.0];
                    if ([blk[@"meta"] length]) {
                        [w drawWrapped:blk[@"meta"] x:MARGIN_L width:contentW fontName:@"PingFangSC-Medium" size:8.0 r:43 g:91 b:132 lineSpacing:2.0];
                    }
                    w.y -= 2.0;
                } else if ([type isEqualToString:@"bullet"]) {
                    [w drawWrapped:[NSString stringWithFormat:@"•  %@", blk[@"text"]] x:MARGIN_L + 6.0 width:contentW - 6.0 fontName:@"PingFangSC-Regular" size:8.15 r:55 g:65 b:81 lineSpacing:2.4];
                    w.y -= 1.5;
                }
            }
        }

        [w endPage];
        CGPDFContextClose(ctx);
        CGContextRelease(ctx);
    }
    return 0;
}
`;

function compileRenderer() {
  const tmpDir = os.tmpdir();
  const srcPath = path.join(tmpDir, 'resume_pdf_gen.m');
  const binPath = path.join(tmpDir, 'resume_pdf_gen');
  fs.writeFileSync(srcPath, OBJC_SRC, 'utf8');
  execFileSync('clang', [
    '-fobjc-arc', srcPath, '-o', binPath,
    '-framework', 'Foundation',
    '-framework', 'CoreGraphics',
    '-framework', 'CoreText',
  ]);
  return binPath;
}

function buildDocSpec(data, isEn) {
  const p = data.personal || {};
  const hero = data.hero || {};
  const summary = data.summary || {};
  const highlights = data.highlights || [];
  const jobs = data.work_experience || [];
  const projects = data.featured_projects || [];
  const comps = data.core_competencies || [];
  const tech = data.technical_expertise || [];
  const lead = data.leadership || {};
  const spk = data.speaking || {};
  const langSec = data.languages_and_international || {};
  const edu = data.education || [];

  const optPortrait = path.join(ROOT, 'source', 'img', 'opt', 'avatar-pro-800w.jpg');
  const origPortrait = path.join(ROOT, 'source', 'img', 'avatar-pro.jpg');
  const portraitPath = fs.existsSync(optPortrait) ? optPortrait : origPortrait;

  const sections = [];

  // 1. Summary
  sections.push({
    title: isEn ? 'Professional Summary' : '专业能力概要',
    sub: isEn ? 'OVERVIEW' : 'PROFESSIONAL SUMMARY',
    blocks: [
      ...(isEn ? summary.paragraphs_en : summary.paragraphs).map((t) => ({ type: 'para', text: t })),
      { type: 'tags', text: (isEn ? p.career_directions_en : p.career_directions).join('  ·  ') },
    ],
  });

  // 2. Career Highlights
  sections.push({
    title: isEn ? 'Career Highlights' : '关键职业成果',
    sub: isEn ? 'KEY METRICS' : 'CAREER HIGHLIGHTS',
    blocks: highlights.map((m) => ({
      type: 'bullet',
      text: `${isEn ? m.value_en : m.value} — ${isEn ? m.label_en : m.label}（${isEn ? m.note_en : m.note}）`,
    })),
  });

  // 3. Core Competencies
  sections.push({
    title: isEn ? 'Core Competencies' : '六大核心能力',
    sub: isEn ? 'SIX PILLARS' : 'CORE COMPETENCIES',
    blocks: comps.map((c) => ({
      type: 'bullet',
      text: `${c.num} ${isEn ? c.title_en : c.title}：${isEn ? c.desc_en : c.desc}`,
    })),
  });

  // 4. Leadership
  sections.push({
    title: isEn ? 'Leadership & Management' : '研发团队管理与产品研发规划',
    sub: isEn ? 'R&D LEADERSHIP' : 'LEADERSHIP & MANAGEMENT',
    blocks: (lead.pillars || []).map((pl) => ({
      type: 'bullet',
      text: `${isEn ? pl.title_en : pl.title}：${isEn ? pl.desc_en : pl.desc}`,
    })),
  });

  // 5. Work Experience (Page 2)
  const workBlocks = [];
  for (const job of jobs) {
    workBlocks.push({
      type: 'subhead',
      text: `${isEn ? job.company_en : job.company}  |  ${isEn ? job.period_en : job.period}`,
      meta: isEn ? job.role_en : job.role,
    });
    workBlocks.push({ type: 'para', text: isEn ? job.overview_en : job.overview });
    if (job.directions && job.directions.length) {
      for (const d of job.directions) {
        workBlocks.push({ type: 'subhead', text: `${d.num} ${isEn ? d.title_en : d.title}` });
        for (const it of (isEn ? d.items_en : d.items) || []) {
          workBlocks.push({ type: 'bullet', text: it });
        }
      }
    } else if (job.bullets && job.bullets.length) {
      for (const b of (isEn ? job.bullets_en : job.bullets) || []) {
        workBlocks.push({ type: 'bullet', text: b });
      }
    }
  }
  sections.push({
    pageBreak: true,
    title: isEn ? 'Work Experience' : '详细工作履历',
    sub: isEn ? 'CAREER TIMELINE' : 'WORK EXPERIENCE',
    blocks: workBlocks,
  });

  // 6. Featured Projects (Page 3)
  const projBlocks = [];
  for (const pr of projects) {
    projBlocks.push({
      type: 'subhead',
      text: `${pr.code}  ${isEn ? pr.name_en : pr.name}  [${isEn ? pr.stage_en : pr.stage}]`,
      meta: `${isEn ? 'Role: ' : '担任角色：'}${isEn ? pr.role_en : pr.role}`,
    });
    projBlocks.push({ type: 'para', text: isEn ? pr.positioning_en : pr.positioning });
    for (const w of (isEn ? pr.responsibilities_en : pr.responsibilities) || []) {
      projBlocks.push({ type: 'bullet', text: w });
    }
    projBlocks.push({ type: 'tags', text: `${isEn ? 'Business Value: ' : '业务价值：'}${isEn ? pr.value_en : pr.value}` });
  }
  sections.push({
    pageBreak: true,
    title: isEn ? 'Featured Projects' : '代表项目案例',
    sub: isEn ? 'CASE STUDIES' : 'FEATURED PROJECTS',
    blocks: projBlocks,
  });

  // 7. Technical Expertise
  sections.push({
    title: isEn ? 'Technical Expertise' : '技术与专业领域',
    sub: isEn ? 'DOMAIN & STACK' : 'TECHNICAL EXPERTISE',
    blocks: tech.map((g) => ({
      type: 'bullet',
      text: `${isEn ? g.domain_en : g.domain}：${((isEn ? g.items_en : g.items) || []).join(' / ')}`,
    })),
  });

  // 8. Languages & International Collaboration
  const langBlocks = (langSec.languages || []).map((lg) => ({
    type: 'bullet',
    text: `${isEn ? lg.name_en : lg.name_zh}（${isEn ? lg.tag_en : lg.tag_zh}）：${isEn ? lg.desc_en : lg.desc_zh}`,
  }));
  for (const it of (isEn ? langSec.collaboration_items_en : langSec.collaboration_items_zh) || []) {
    langBlocks.push({ type: 'bullet', text: it });
  }
  sections.push({
    title: isEn ? langSec.title_en : langSec.title_zh,
    sub: isEn ? 'GLOBAL READINESS' : 'LANGUAGES & INTERNATIONAL',
    blocks: langBlocks,
  });

  // 9. Speaking & Education
  sections.push({
    title: isEn ? 'Speaking & Industry Engagement' : '公开演讲与行业交流',
    sub: isEn ? 'PUBLIC SPEAKING' : 'SPEAKING & ENGAGEMENT',
    blocks: [
      { type: 'para', text: isEn ? spk.subtitle_en : spk.subtitle },
      { type: 'tags', text: ((isEn ? spk.formats_en : spk.formats) || []).join('  ·  ') },
    ],
  });

  sections.push({
    title: isEn ? 'Education & Contact' : '教育背景与联系方式',
    sub: isEn ? 'EDUCATION' : 'EDUCATION & CONTACT',
    blocks: [
      ...edu.map((e) => ({
        type: 'bullet',
        text: `${isEn ? e.school_en : e.school} · ${isEn ? e.degree_en : e.degree} · ${isEn ? e.major_en : e.major}`,
      })),
      {
        type: 'bullet',
        text: `${isEn ? 'Email: ' : '邮箱：'}${p.email}  |  ${isEn ? 'Online Resume: ' : '在线简历：'}${p.website}/resume/  |  GitHub: ${p.github}`,
      },
    ],
  });

  return {
    isEn,
    portraitPath,
    eyebrow: isEn ? 'EXECUTIVE RESUME' : 'EXECUTIVE RESUME · 个人职业简历',
    nameLine: isEn ? `${p.name_en} (${p.name})` : `${p.name} · ${p.name_en}`,
    subtitle: isEn ? hero.subtitle_en : hero.subtitle,
    metaLine1: isEn
      ? `${p.gender_en} · ${p.birth_en}  |  ${p.location_en}  |  ${p.education_brief_en}`
      : `${p.gender} · ${p.birth}  |  ${p.location}  |  ${p.education_brief}`,
    metaLine2: `${isEn ? 'Email: ' : '邮箱：'}${p.email}  |  ${p.website}  |  ${p.github}`,
    footerLeft: isEn ? `${p.name_en} (${p.name}) · Executive Resume` : `${p.name} (${p.name_en}) · 个人职业简历`,
    sections,
  };
}

function main() {
  const data = yaml.load(fs.readFileSync(DATA_PATH, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const binPath = compileRenderer();
  const meta = data.meta || {};

  const targets = [
    { isEn: false, fname: meta.pdf_filename || 'Professional_Resume_CN.pdf' },
    { isEn: true, fname: meta.pdf_en_filename || 'Professional_Resume_EN.pdf' },
  ];

  for (const t of targets) {
    const specPath = path.join(os.tmpdir(), `resume_${t.isEn ? 'en' : 'cn'}.json`);
    const outPath = path.join(OUT_DIR, t.fname);
    fs.writeFileSync(specPath, JSON.stringify(buildDocSpec(data, t.isEn)), 'utf8');
    execFileSync(binPath, [specPath, outPath]);
    const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`Generated ${outPath} (${kb} KB)`);
  }
}

main();
