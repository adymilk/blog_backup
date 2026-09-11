#!/usr/bin/env node
'use strict'

/**
 * 批量规范化 source/_posts/*.md 的 front-matter。
 *
 * 用法：
 *   node tools/normalize-posts.js --dry-run   # 只报告，不写文件（先跑这个）
 *   node tools/normalize-posts.js --apply     # 实际写入
 *
 * 做三件事：
 *   1. tags 统一成 YAML 数组形式（现有 21 篇是标量字符串）
 *   2. 按 CATEGORY_RULES 重排 categories
 *   3. 按 TAG_ALIAS 合并同义 tag / 移除无检索价值的 tag
 *   4. 对 UNPUBLISH 列表设 published: false
 *
 * 不做的事（重要）：
 *   不改文件名。permalink 里的 :title 取的是 slug（来自文件名）而不是
 *   front-matter 的 title，所以改文件名会改 URL、丢失已有外链。
 *   改 front-matter title 才是零风险的。
 */

const fs = require('fs')
const path = require('path')
const { parse, stringify } = require('hexo-front-matter')

const POSTS_DIR = path.join(__dirname, '..', 'source', '_posts')
const APPLY = process.argv.includes('--apply')

// ---------------------------------------------------------------------------
// 分类规则
//
// 一级分类 = 栏目，不是主题。原先把 Laravel / Mac / Minitab 拉成一等分类，
// 粒度和「代码笔记」不一致，而「代码笔记」又装了 42/61 篇，是个垃圾桶。
//
// AI 与数据 单独成一级是有意为之：这是 FDE 的核心叙事线（工业 + 数据 + 统计），
// 把 Minitab / 数据科学 / 人脸识别归到这里，hiring manager 一眼能看到方向。
//
// 顺序重要：先匹配到的胜出。
// ---------------------------------------------------------------------------
const CATEGORY_RULES = [
  // ─── 第 0 层：文件名规则（最可靠）──────────────────────────────
  // 这些文件名带出版本号，用标题判断会误判（例：
  // 20211028-Mac 电脑开盖唤醒...【解决方案】正文混了 PHP
  // 版本降级的内容，名字里带 PHP，但它本质是 macOS 问题）
  { cat: '基础设施', re: /Mac 电脑开盖|Mac电脑开盖/ },

  // ─── AI 与数据（FDE 核心叙事线，优先级高）──────────────────
  { cat: 'AI 与数据', re: /Minitab|20210629|20200715|20180630/ },
  // 注意词边界：无 \b 时子串会碰撞。
  // (?<!反) 排除「Nginx 反爬虫」—— 那是基础设施不是爬虫开发。
  { cat: 'AI 与数据', re: /\bPython\b|\bpython\b|20180518-3|nodejs_pachong|(?<!反)爬虫/ },

  // ─── 后端工程 ─────────────────────────────────────────
  // \bPHP\b 而非 PHP：避免匹配到 "开盖唤醒" 这类文件名
  { cat: '后端工程', re: /Laravel|laravel|20210623|20210901|20211021|20220124|20211014|20211015|\bPHP\b|\bphp\b/ },
  { cat: '后端工程', re: /20210908-[14]|当前页面|Jetstream|\bGo\b|20210923|socket/ },

  // ─── 前端工程 ─────────────────────────────────────────
  { cat: '前端工程', re: /vue-cli|React|Swiper|swiper|JavaScript|callback|20180602|20181126|HTML-template|模板分离|小程序/ },
  { cat: '前端工程', re: /3分钟轻松学会编译安卓|Promise/ },

  // ─── 生活随笔 ─────────────────────────────────────────
  // 20180527-1 是「视频原理了解一下（压缩）」—— 科普随笔，不是工程笔记
  { cat: '生活随笔', re: /ShenZhen|淘宝|12123|识破|陷阱|Instagram|20180720|20180527|公众号/ },

  // ─── 基础设施（兜底）──────────────────────────────────
  // 放在最后：它的模式最宽，放前面会吃掉后面的规则
  { cat: '基础设施', re: /Linux|linux|ubuntu|Ubuntu|macOS|Mac|mac|win-10|Node版本|what-is-git|JetBrains|sublime|atom|curl|dpkg|Android|android|2017-08|hexo|20210908-(6|7|8|9|10)|20211013|Docker|Nginx|服务器|双系统|黑苹果/ }
]

// ---------------------------------------------------------------------------
// tag 别名合并
//
// 现状：65 个 distinct tag 分布在 56 篇文章上（平均 1.4 篇/个），
// 且有同义分裂（Linux/linux/ubuntu、Python/python、Ngnix 拼写错误等），
// 导致 tag 云完全没有聚合能力。
//
// 目标：收敛到 20–25 个，每个 tag 至少 3 篇。
// null 表示「移除这个 tag」（无检索价值）。
// ---------------------------------------------------------------------------
const TAG_ALIAS = {
  // 大小写 / 同义合并
  'linux': 'Linux',
  'ubuntu': 'Linux',
  'server': 'Linux',
  'android': 'Android',
  'python': 'Python',
  'mac os': 'macOS',
  'Mac': 'macOS',
  'mac': 'macOS',
  'Mac OS': 'macOS',
  '黑苹果': 'macOS',
  'node.js': 'Node.js',
  'Node': 'Node.js',
  'nodejs': 'Node.js',
  'Ngnix': 'Nginx',          // 原文拼写错误，实际是 Nginx
  'npm': 'Node.js',
  '蜘蛛爬虫': '爬虫',
  'template': '前端',
  '模板分离': '前端',
  'webapp': '前端',
  'xiaochengxu': '微信小程序',
  'vue-cli': 'Vue',
  'vue': 'Vue',
  'git': 'Git',
  'hexo': 'Hexo',
  'docker': 'Docker',
  'nginx': 'Nginx',
  'mysql': 'MySQL',
  'react': 'React',
  'go': 'Go',
  'Ai': 'AI',
  'swiper.js': 'Swiper',
  'github': 'GitHub',
  '计算机视觉': 'AI',

  // 统一到大写技术名
  'php': 'PHP',
  'laravel': 'Laravel',

  // 移除：无检索价值（文章属性而非技术名词）
  '12123': null,
  '网购': null,
  '淘宝': null,
  '电商': null,
  'curl': null,
  'gif': null,
  '优化': null,
  '网站': null,
  '翻译': null,
  '系统': null,
  '微信公众号': null,
  '百度站长': null,
  'software-center': null,
  'game': null,
  'video': null,
  '压缩': null,
  '开源': null,
  '生活笔记': null,   // 这是旧分类名误当 tag 用（20200715-1 内容明显是技术）
  '黑客': null,       // Linux 命令那篇是教程，不是黑客内容，避免负面联想
  '黑苹果系统': 'macOS'
}

// ---------------------------------------------------------------------------
// 从公开视野下架的文章
//
// 理由见下。注意 published: false 会让文章从 site.posts 消失 →
// 不进归档/分类/sitemap → URL 404。这几篇本来就没有 SEO 价值。
// ---------------------------------------------------------------------------
const UNPUBLISH = new Set([
  '20210912-1.md',                  // 正文是可直接执行的 webshell 后门代码
  'JetBrains系列产品破解教程.md',      // 破解教程
  'Linux 暴力破解WIFI密码.md',        // 攻击教程
  '20210624-1.md',                  // Parallels 破解 + 明文密码 pdm1 在公开仓库
  '20180720-1.md',                  // 作者是「鬼脚七」不是本人，挂在个人站上是冒名
  '教你识破网络陷阱.md',               // 生活向，无求职价值
  '20210915-1.md'                   // 交管 12123 情绪化差评，对「沟通与影响力」是负分
])

// ---------------------------------------------------------------------------

const stats = { total: 0, tagFixed: 0, catFixed: 0, unpublished: 0, tagRemoved: 0, skipped: 0 }
const changes = []

for (const file of fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).sort()) {
  stats.total++
  const full = path.join(POSTS_DIR, file)
  const raw = fs.readFileSync(full, 'utf8')
  const fm = parse(raw)
  const before = JSON.stringify(fm)
  const notes = []

  // --- 1. tags 统一成数组 + 别名合并 ---
  let tags = Array.isArray(fm.tags) ? fm.tags.slice() : (fm.tags == null ? [] : [fm.tags])
  const original = tags.slice()
  const mapped = []
  for (const t of tags) {
    const key = String(t).trim()
    const hit = Object.prototype.hasOwnProperty.call(TAG_ALIAS, key)
    const value = hit ? TAG_ALIAS[key] : key
    if (value === null) { stats.tagRemoved++; continue }
    if (value && !mapped.includes(value)) mapped.push(value)
  }
  if (mapped.length) fm.tags = mapped
  else delete fm.tags

  if (JSON.stringify(mapped) !== JSON.stringify(original)) {
    stats.tagFixed++
    notes.push(`tags: [${original.join(',')}] → [${mapped.join(',')}]`)
  }

  // --- 2. categories ---
  // haystack 只用「文件名 + front-matter title」。
  //
  // 有意不包含 original tags：这些文章的原 tag 本身就大量错标
  // （20210901 是 laravel socket 却打着 Minitab 标签、
  //   ubuntu解决dpkg 打着 Python 标签），把它们加进来会让错误自我强化。
  // 只匹配文件名也不够 —— 仓库里有大量 20210908-3.md 这类无意义数字名，
  // 真正的语义信息在 title 里。
  const haystack = [file, fm.title || ''].join(' ')
  const rule = CATEGORY_RULES.find(r => r.re.test(haystack))
  if (rule && fm.categories !== rule.cat) {
    notes.push(`category: ${fm.categories || '(无)'} → ${rule.cat}`)
    fm.categories = rule.cat
    stats.catFixed++
  }
  // 容错：单个 category 字段统一成 categories
  if (fm.category) {
    if (!fm.categories) fm.categories = fm.category
    delete fm.category
  }

  // --- 3. 下架 ---
  if (UNPUBLISH.has(file) && fm.published !== false) {
    fm.published = false
    stats.unpublished++
    notes.push('published: false（下架）')
  }

  if (JSON.stringify(fm) !== before) {
    changes.push({ file, notes })
    if (APPLY) {
      const m = raw.match(/^(---\r?\n)([\s\S]*?)\r?\n---\r?\n?/)
      if (!m) {
        console.error(`  ✗ 跳过 ${file}：无法定位 front-matter 边界`)
        stats.skipped++
        continue
      }
      const body = raw.slice(m[0].length)

      // ⚠️ 两个必须同时满足的条件，否则正文会被写坏：
      //
      // 1. parse() 的结果带一个 _content 字段，stringify() 会把它一并输出。
      //    不清掉就会出现「正文 + 正文」重复。（曾经 61 篇全中招）
      // 2. stringify() 自带末尾的 '---\n'，所以只需在前面补开头的，
      //    然后直接接 body —— 不要再插 '\n'，否则正文会被顶下去一个空行。
      delete fm._content
      const out = m[1] + stringify(fm) + body

      // 断言：清理后正文必须恰好出现一次。
      // 只检查尾部是不够的 —— 正文重复时尾部依然匹配，正是这个盲区
      // 让上面第 1 个 bug 溜过了第一版校验。
      const occurrences = out.split(body).length - 1
      if (occurrences !== 1) {
        console.error(`  ✗ 跳过 ${file}：正文出现 ${occurrences} 次（应为 1），未写入`)
        stats.skipped++
        continue
      }
      fs.writeFileSync(full, out, 'utf8')
    }
  }
}

// ---------------------------------------------------------------------------
for (const c of changes) {
  console.log(`${APPLY ? '✔' : '·'} ${c.file}`)
  for (const n of c.notes) console.log(`    ${n}`)
}

console.log('\n' + '─'.repeat(60))
console.log(`扫描 ${stats.total} 篇，需改动 ${changes.length} 篇`)
console.log(`  tags 调整:   ${stats.tagFixed}  (移除无价值 tag ${stats.tagRemoved} 个)`)
console.log(`  category 调整: ${stats.catFixed}`)
console.log(`  下架:        ${stats.unpublished}`)
if (stats.skipped) console.log(`  ⚠️ 跳过:      ${stats.skipped}`)

if (!APPLY) {
  console.log('\n这是 dry-run，未写入任何文件。')
  console.log('确认无误后运行： node tools/normalize-posts.js --apply')
} else {
  console.log('\n已写入。注意 hexo-front-matter 的 stringify 会重排键顺序，')
  console.log('所以 git diff 看起来会很大 —— 这是预期行为，不是出错。')
}
