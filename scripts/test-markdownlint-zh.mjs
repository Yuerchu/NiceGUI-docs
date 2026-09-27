// 自定义中文规则的自测：反例必须报出预期条数，正例一条都不能报
import { main } from 'markdownlint-cli2'

const cases = [
  {
    file: 'scripts/fixtures/zh-bad.md',
    expected: { 'zh-emphasis-flanking': 4, 'zh-fullwidth-punct-spacing': 2, 'zh-no-honorific': 1 },
  },
  { file: 'scripts/fixtures/zh-good.md', expected: {} },
]

let failed = false
for (const { file, expected } of cases) {
  const errors = []
  await main({ argv: ['--no-globs', file], logMessage: () => {}, logError: message => errors.push(message) })
  const actual = {}
  for (const message of errors) {
    const rule = message.match(/ error (zh-[a-z-]+) /)?.[1]
    if (rule) actual[rule] = (actual[rule] ?? 0) + 1
  }
  const ok = JSON.stringify(Object.entries(actual).sort()) === JSON.stringify(Object.entries(expected).sort())
  console.log(`${ok ? 'PASS' : 'FAIL'} ${file} expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`)
  if (!ok) {
    failed = true
    errors.filter(message => /zh-/.test(message)).forEach(message => console.log(`  ${message}`))
  }
}
process.exitCode = failed ? 1 : 0
