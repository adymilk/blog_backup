#!/usr/bin/env node
'use strict'

/**
 * 扫描未填写的 TODO(James)。
 *
 * 用法：
 *   node tools/check-todos.js            # 报告，有残留则退出码 1
 *   node tools/check-todos.js --warn     # 只警告，退出码恒为 0（CI 中作为提示而非门禁）
 *
 * 为什么需要它：TODO 都写在 HTML 注释里，构建产物不会把它们渲染给读者。
 * 这是好事（半成品不会泄漏到线上），但也是坏事 —— 线上不会提醒你还没填完。
 * 这个脚本就是那个提醒。
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const WARN_ONLY = process.argv.includes('--warn')

const SCAN = [
  'source/resume',
  'source/works',
  'source/about',
  'source/_data/profile.yml',
  'source/_data/languages'
]

const hits = []

function walk (target) {
  const stat = fs.statSync(target)
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry))
    return
  }
  const lines = fs.readFileSync(target, 'utf8').split('\n')
  lines.forEach(function (line, i) {
    // 要求 TODO(James) 后面紧跟冒号 —— 这样能排除掉「说明怎么写 TODO」
    // 的那些叙述性文字，只统计真正的待办标记。
    if (/TODO\(James\)\s*[:：]/.test(line)) {
      hits.push({
        file: path.relative(ROOT, target),
        line: i + 1,
        text: line.trim().slice(0, 90)
      })
    }
  })
}

for (const rel of SCAN) {
  const full = path.join(ROOT, rel)
  if (fs.existsSync(full)) walk(full)
}

// 按文件归并输出，便于逐个攻破
const byFile = {}
for (const h of hits) {
  (byFile[h.file] = byFile[h.file] || []).push(h)
}

if (!hits.length) {
  console.log('✅ 没有残留的 TODO(James)')
  process.exit(0)
}

console.log(`\n⚠️  还有 ${hits.length} 处未填写的 TODO(James)：\n`)
for (const [file, list] of Object.entries(byFile)) {
  console.log(`  ${file}  (${list.length} 处)`)
  for (const h of list.slice(0, 3)) {
    console.log(`      L${h.line}: ${h.text}`)
  }
  if (list.length > 3) console.log(`      … 另有 ${list.length - 3} 处`)
}
console.log('\n（构建产物中这些 TODO 位于 HTML 注释内，读者看不到；')
console.log('  但它们代表简历页/作品页尚未就绪。）\n')

process.exit(WARN_ONLY ? 0 : 1)
