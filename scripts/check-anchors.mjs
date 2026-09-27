// 检查站内链接的 #锚点 是否真实存在于构建产物中（需先运行 pnpm docs:build）
// VitePress 的锚点规则（Badge、{#id}、中文 slug）与 GitHub 不同，所以不用 markdownlint 的 MD051，而是直接对照生成的 HTML
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'docs/.vitepress/dist'
const SRC = 'docs'
const toPosix = p => p.split(path.sep).join('/')
// 首页是 ""，/documentation/index.html 是 "/documentation"，与链接去掉末尾 / 后的写法一致
const pageOf = file => ('/' + toPosix(file).replace(/(index)?\.(html|md)$/, '')).replace(/\/$/, '')

if (!fs.existsSync(DIST)) {
  console.error(`${DIST} 不存在，请先运行 pnpm docs:build`)
  process.exit(1)
}

// 页面路径（如 "/documentation/section_security"）-> 该页所有元素 id
const ids = {}
for (const file of fs.readdirSync(DIST, { recursive: true })) {
  if (!file.endsWith('.html')) continue
  const html = fs.readFileSync(path.join(DIST, file), 'utf8')
  ids[pageOf(file)] = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => decodeURIComponent(m[1])))
}

// 去掉围栏代码块和行内代码，示例代码里的 href="#..." 不是真正的链接（围栏识别规则同 markdownlint-zh.cjs）
function stripCode(source) {
  let fence = null
  return source.split('\n').map(line => {
    const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (m && !fence) {
      fence = m[1]
      return ''
    }
    if (m && fence && m[1][0] === fence[0] && m[1].length >= fence.length && m[2].trim() === '') {
      fence = null
      return ''
    }
    return fence ? '' : line.replace(/(`+)(.+?)\1/g, '')
  }).join('\n')
}

const links = []
const config = fs.readFileSync('docs/.vitepress/config.mts', 'utf8')
for (const m of config.matchAll(/link:\s*'(\/[^']*#[^']+)'/g)) links.push(['docs/.vitepress/config.mts', m[1]])

for (const file of fs.readdirSync(SRC, { recursive: true })) {
  const posix = toPosix(file)
  if (!posix.endsWith('.md') || posix.startsWith('.vitepress/') || posix.startsWith('public/')) continue
  const source = stripCode(fs.readFileSync(path.join(SRC, file), 'utf8'))
  for (const m of source.matchAll(/(?:\]\(|href=")((?:\/[^)"\s#]*)?#[^)"\s]+)[)"]/g)) {
    // 只写 #锚点 的页内链接按所在页面解析
    links.push([`docs/${posix}`, m[1].startsWith('#') ? pageOf(posix) + m[1] : m[1]])
  }
}

let broken = 0
for (const [source, link] of links) {
  const [rawPage, anchor] = link.split('#')
  const page = rawPage.replace(/\.html$/, '').replace(/\/$/, '')
  const pageIds = ids[page] ?? ids[`${page}/index`]
  if (!pageIds) {
    console.log(`NO PAGE   ${source}: ${link}`)
    broken++
  } else if (!pageIds.has(anchor)) {
    console.log(`NO ANCHOR ${source}: ${link}`)
    broken++
  }
}
console.log(`checked ${links.length} anchored links, ${broken} broken`)
process.exitCode = broken ? 1 : 0
