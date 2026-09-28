// markdownlint 自定义规则：中文排版中 GFM/markdown-it 渲染会出问题、而肉眼难以发现的写法
'use strict'

const PUNCT = /[\p{P}!-\/:-@\[-`{-~]/u
const SPACE = /\s/u
const FULLWIDTH_PUNCT = '，。、！？；：）」』】》'

// 把行内代码的内容替换成 x，保留反引号（GFM 判断定界符时反引号也算标点）和列号
function maskInlineCode(line) {
  return line.replace(/(`+)(.+?)\1/g, (match, ticks, body) => ticks + 'x'.repeat(body.length) + ticks)
}

// 逐行给出不在围栏代码块里的正文，按 CommonMark 规则识别围栏（最多缩进 3 格，结束围栏不短于开始且不带信息串）
function* proseLines(params) {
  let fence = null
  for (let i = 0; i < params.lines.length; i++) {
    const line = params.lines[i]
    const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (m && !fence) {
      fence = m[1]
      continue
    }
    if (m && fence && m[1][0] === fence[0] && m[1].length >= fence.length && m[2].trim() === '') {
      fence = null
      continue
    }
    if (!fence) yield [i + 1, maskInlineCode(line)]
  }
}

// 下一行会作为同一段落的延续（软换行渲染成空格），而不是新的块级结构
function continuesParagraph(line) {
  return line.trim() !== '' && !/^\s*([-*+]\s|\d+[.)]\s|#|\||>|```|~~~|:::|<|\$\$)/.test(line)
}

module.exports = [
  {
    names: ['zh-emphasis-flanking'],
    description: '** 的开始/结束定界符在 GFM 下不成立，加粗会原样显示成星号（如「吧！**大」）',
    tags: ['zh', 'emphasis'],
    parser: 'none',
    function(params, onError) {
      for (const [lineNumber, line] of proseLines(params)) {
        const runs = [...line.matchAll(/(?<!\*)\*\*(?!\*)/g)]
        runs.forEach((run, k) => {
          const prev = line[run.index - 1] ?? ' '
          const next = line[run.index + 2] ?? ' '
          const opening = k % 2 === 0
          const valid = opening
            ? !SPACE.test(next) && (!PUNCT.test(next) || SPACE.test(prev) || PUNCT.test(prev))
            : !SPACE.test(prev) && (!PUNCT.test(prev) || SPACE.test(next) || PUNCT.test(next))
          if (!valid) {
            onError({
              lineNumber,
              detail: `${opening ? '开始' : '结束'}定界符 "${prev}**${next}"`,
              context: line.slice(Math.max(0, run.index - 8), run.index + 10),
              range: [run.index + 1, 2],
            })
          }
        })
      }
    },
  },
  {
    names: ['zh-fullwidth-punct-spacing'],
    description: '全角标点后不应有空格或段内换行（段内换行同样会渲染成空格）',
    tags: ['zh', 'whitespace'],
    parser: 'none',
    function(params, onError) {
      let previous = null
      for (const [lineNumber, line] of proseLines(params)) {
        for (const m of line.matchAll(new RegExp(`[${FULLWIDTH_PUNCT}](?<spaces> +)(?=[^\\s|])`, 'g'))) {
          const column = m.index + 2
          onError({
            lineNumber,
            detail: '标点后有空格',
            context: line.slice(m.index, m.index + 8),
            range: [column, m.groups.spaces.length],
            fixInfo: { editColumn: column, deleteCount: m.groups.spaces.length },
          })
        }
        if (previous && previous.lineNumber === lineNumber - 1 && continuesParagraph(line)) {
          // 注意 ''.includes 恒为 true：上一行为空（段落边界）时 end 是空串，必须排除
          const end = previous.line.trimEnd().replace(/\*\*$/, '').slice(-1)
          if (end !== '' && FULLWIDTH_PUNCT.includes(end) && !/^\s*(#|\|)/.test(previous.line)) {
            onError({
              lineNumber: previous.lineNumber,
              detail: '标点后段内换行（加粗结尾时把标点移到 ** 外面再合并成一行）',
              context: previous.line.slice(-10),
            })
          }
        }
        previous = { lineNumber, line }
      }
    },
  },
  {
    names: ['zh-no-honorific'],
    description: '人称统一用「你」，不用「您」',
    tags: ['zh'],
    parser: 'none',
    function(params, onError) {
      params.lines.forEach((line, i) => {
        for (const m of line.matchAll(/您/g)) {
          onError({
            lineNumber: i + 1,
            context: line.slice(Math.max(0, m.index - 6), m.index + 6),
            range: [m.index + 1, 1],
            fixInfo: { editColumn: m.index + 1, deleteCount: 1, insertText: '你' },
          })
        }
      })
    },
  },
]
