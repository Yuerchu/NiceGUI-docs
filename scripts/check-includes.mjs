// 检查 <!--@include: ./x.md{a,b}--> 的行号范围：首尾不能落在围栏代码块内部，最后一个非空行也不能是标题
// （元素页被按行号 include 进章节页，元素页增删行后范围很容易截断代码块或多带进下一节的标题）
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'docs'

// 每一行是否处于围栏代码块内部（开始/结束围栏本身不算内部），围栏识别规则同 markdownlint-zh.cjs
function insideFence(lines) {
  let fence = null
  return lines.map(line => {
    const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (m && !fence) {
      fence = m[1]
      return false
    }
    if (m && fence && m[1][0] === fence[0] && m[1].length >= fence.length && m[2].trim() === '') {
      fence = null
      return false
    }
    return fence !== null
  })
}

let problems = 0
let checked = 0
for (const file of fs.readdirSync(SRC, { recursive: true })) {
  if (!file.endsWith('.md')) continue
  const source = fs.readFileSync(path.join(SRC, file), 'utf8')
  for (const m of source.matchAll(/<!--@include:\s*(\S+?)\{(\d+),(\d+)\}\s*-->/g)) {
    const [target, from, to] = [path.join(SRC, path.dirname(file), m[1]), +m[2], +m[3]]
    const lines = fs.readFileSync(target, 'utf8').split(/\r?\n/)
    const inside = insideFence(lines)
    const range = lines.slice(from - 1, to)
    const lastText = [...range].reverse().find(line => line.trim() !== '') ?? ''
    const errors = []
    if (to > lines.length) errors.push(`结束行超出文件（共 ${lines.length} 行）`)
    if (inside[from - 1]) errors.push('开始行在代码块内部')
    if (inside[to - 1]) errors.push('结束行在代码块内部')
    if (/^#{1,6}\s/.test(lastText)) errors.push(`最后一个非空行是标题「${lastText.trim()}」`)
    checked++
    if (errors.length) {
      problems++
      console.log(`${file.split(path.sep).join('/')}: ${m[1]}{${from},${to}} ${errors.join('；')}`)
    }
  }
}
console.log(`checked ${checked} ranged includes, ${problems} broken`)
process.exitCode = problems ? 1 : 0
