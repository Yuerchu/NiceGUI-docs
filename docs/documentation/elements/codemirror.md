# 代码编辑器 CodeMirror

一个使用 [CodeMirror](https://codemirror.net) 创建代码编辑器的元素。

支持超过 140 种语言的语法高亮、30 余种主题、行号显示、代码折叠、（有限的）自动补全等功能。

<Badge type="tip" text="^3.13.0" /> 可以通过 `line_tooltips` 字典为每一行附加工具提示。

<Badge type="tip" text="^3.14.0" /> `keymap` 将按键（CodeMirror 按键字符串）映射到 Python 回调函数。直接传入可调用对象时使用默认配置（阻止浏览器默认行为，不区分操作系统）。用 `KeyBinding` 包装可以针对单个按键覆盖配置，例如 `prevent_default=False` 或特定平台的快捷键（`mac=`、`linux=`、`win=`）。使用 `map_key` 在运行时添加按键绑定，使用 `unmap_key` 移除按键绑定。编辑器处于禁用状态时，按键绑定不会触发。

<Badge type="tip" text="^3.16.0" /> 可以通过 `line_anchors` 字典附加行锚点，它们会在编辑过程中跟踪文档中的位置（赋值即声明，读取则返回当前位置）。

<Badge type="tip" text="^3.17.0" /> 装饰（decoration）可以在不改变文档内容的前提下，为文档的某些部分添加样式、隐藏或注释。可以将规格列表赋值给 `decorations`，也可以原地修改 `decorations`。

::: details 支持的语言

支持的语言列表可查看 [@codemirror/language-data](https://github.com/codemirror/language-data/blob/main/src/language-data.ts) 包。

译者也推荐你参阅 `nicegui/elements/codemirror/constants.py` 的 `SUPPORTED_LANGUAGES` 容器：

```python:line-numbers
SUPPORTED_LANGUAGES = Literal[
    'Angular Template',
    'APL',
    'ASN.1',
    'Asterisk',
    'Brainfuck',
    'C',
    'C#',
    'C++',
    'Clojure',
    'ClojureScript',
    'Closure Stylesheets (GSS)',
    'CMake',
    'Cobol',
    'CoffeeScript',
    'Common Lisp',
    'CQL',
    'Crystal',
    'CSS',
    'Cypher',
    'Cython',
    'D',
    'Dart',
    'diff',
    'Dockerfile',
    'DTD',
    'Dylan',
    'EBNF',
    'ECL',
    'edn',
    'Eiffel',
    'Elm',
    'Erlang',
    'Esper',
    'F#',
    'Factor',
    'FCL',
    'Forth',
    'Fortran',
    'Gas',
    'Gherkin',
    'Go',
    'Groovy',
    'Haskell',
    'Haxe',
    'HTML',
    'HTTP',
    'HXML',
    'IDL',
    'Java',
    'JavaScript',
    'Jinja2',
    'JSON',
    'JSON-LD',
    'JSX',
    'Julia',
    'Kotlin',
    'LaTeX',
    'LESS',
    'Liquid',
    'LiveScript',
    'Lua',
    'MariaDB SQL',
    'Markdown',
    'Mathematica',
    'Mbox',
    'mIRC',
    'Modelica',
    'MS SQL',
    'MscGen',
    'MsGenny',
    'MUMPS',
    'MySQL',
    'Nginx',
    'NSIS',
    'NTriples',
    'Objective-C',
    'Objective-C++',
    'OCaml',
    'Octave',
    'Oz',
    'Pascal',
    'Perl',
    'PGP',
    'PHP',
    'Pig',
    'PLSQL',
    'PostgreSQL',
    'PowerShell',
    'Properties files',
    'ProtoBuf',
    'Pug',
    'Puppet',
    'Python',
    'Q',
    'R',
    'RPM Changes',
    'RPM Spec',
    'Ruby',
    'Rust',
    'SAS',
    'Sass',
    'Scala',
    'Scheme',
    'SCSS',
    'Shell',
    'Sieve',
    'Smalltalk',
    'SML',
    'Solr',
    'SPARQL',
    'Spreadsheet',
    'SQL',
    'SQLite',
    'Squirrel',
    'sTeX',
    'Stylus',
    'Swift',
    'SystemVerilog',
    'Tcl',
    'Textile',
    'TiddlyWiki',
    'Tiki wiki',
    'TOML',
    'Troff',
    'TSX',
    'TTCN',
    'TTCN_CFG',
    'Turtle',
    'TypeScript',
    'VB.NET',
    'VBScript',
    'Velocity',
    'Verilog',
    'VHDL',
    'Vue',
    'Web IDL',
    'WebAssembly',
    'XML',
    'XQuery',
    'Xù',
    'Yacas',
    'YAML',
    'Z80',
]
```
:::

::: details 支持的主题

主题列表可查看 [@uiw/codemirror-themes-all](https://github.com/uiwjs/react-codemirror/tree/master/themes/all) 包。

同样的，译者也推荐你参阅 `nicegui/elements/codemirror/constants.py` 的 `SUPPORTED_THEMES` 容器：

```python:line-numbers
SUPPORTED_THEMES = Literal[
    'abcdef',
    'abcdefDarkStyle',
    'abyss',
    'abyssDarkStyle',
    'androidstudio',
    'androidstudioDarkStyle',
    'andromeda',
    'andromedaDarkStyle',
    'atomone',
    'atomoneDarkStyle',
    'aura',
    'auraDarkStyle',
    'basicDark',
    'basicDarkStyle',
    'basicLight',
    'basicLightStyle',
    'bbedit',
    'bbeditLightStyle',
    'bespin',
    'bespinDarkStyle',
    'consoleDark',
    'consoleLight',
    'copilot',
    'copilotDarkStyle',
    'darcula',
    'darculaDarkStyle',
    'douToneLightStyle',
    'dracula',
    'draculaDarkStyle',
    'duotoneDark',
    'duotoneDarkStyle',
    'duotoneLight',
    'eclipse',
    'eclipseLightStyle',
    'githubDark',
    'githubDarkStyle',
    'githubLight',
    'githubLightStyle',
    'gruvboxDark',
    'gruvboxDarkStyle',
    'gruvboxLight',
    'kimbie',
    'kimbieDarkStyle',
    'material',
    'materialDark',
    'materialDarkStyle',
    'materialLight',
    'materialLightStyle',
    'monokai',
    'monokaiDarkStyle',
    'monokaiDimmed',
    'monokaiDimmedDarkStyle',
    'noctisLilac',
    'noctisLilacLightStyle',
    'nord',
    'nordDarkStyle',
    'okaidia',
    'okaidiaDarkStyle',
    'oneDark',
    'quietlight',
    'quietlightStyle',
    'red',
    'redDarkStyle',
    'solarizedDark',
    'solarizedDarkStyle',
    'solarizedLight',
    'solarizedLightStyle',
    'sublime',
    'sublimeDarkStyle',
    'tokyoNight',
    'tokyoNightDay',
    'tokyoNightDayStyle',
    'tokyoNightStorm',
    'tokyoNightStormStyle',
    'tokyoNightStyle',
    'tomorrowNightBlue',
    'tomorrowNightBlueStyle',
    'vscodeDark',
    'vscodeDarkStyle',
    'vscodeLight',
    'vscodeLightStyle',
    'whiteDark',
    'whiteDarkStyle',
    'whiteLight',
    'whiteLightStyle',
    'xcodeDark',
    'xcodeDarkStyle',
    'xcodeLight',
    'xcodeLightStyle',
]
```
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 编辑器的初始值   |
| on_change  | 当编辑器中的内容被改变时的回调函数 |
| keymap     | CodeMirror 按键字符串（如 "Mod-s"、"F5"）到处理函数的映射，处理函数可以用 `KeyBinding` 包装 (默认值: `None`) <Badge type="tip" text="^3.14.0" /> |
| language   | 编辑器的初始语言 (不区分大小写，默认值: `None`) |
| theme      | 编辑器的初始主题 (默认值: `"basicLight"`) |
| indent     | 用于缩进的字符串 (必须由相同空白字符组成的任意字符，默认值: `" "`) |
| line_wrapping | 是否自动换行 (默认值: `False`) |
| highlight_whitespace | 是否高亮空白字符 (默认值: False) |
| decorations | 应用到编辑器的初始装饰规格列表，规格中的偏移量（`from`/`to`/`position`）是 Python `str` 索引 (默认值: `None`) <Badge type="tip" text="^3.17.0" /> |
| decoration_html | 是否将 replace/widget 装饰的 `text` 字段渲染为经过净化的 HTML，而不是纯文本 (默认值: `False`) <Badge type="tip" text="^3.17.0" /> |
| line_anchors | 初始的 `{锚点 ID: 行号（从 1 开始）}` 映射，锚点会在编辑过程中跟踪文档中的位置 (默认值: `None`) <Badge type="tip" text="^3.16.0" /> |
| on_anchor_change | 被跟踪的锚点位置发生变化时执行的回调函数 (默认值: `None`) <Badge type="tip" text="^3.16.0" /> |
| line_tooltips | 初始的行号（从 1 开始）到工具提示内容的映射 (默认值: `None`) <Badge type="tip" text="^3.13.0" /> |
| line_tooltip_html | 是否将工具提示内容渲染为经过净化的 HTML，而不是纯文本 (默认值: `False`) <Badge type="tip" text="^3.13.0" /> |

```python:line-numbers
from nicegui import ui

editor = ui.codemirror('print("开始你的编辑")', language='Python').classes('h-32')
ui.select(editor.supported_languages, label='Language', clearable=True) \
    .classes('w-32').bind_value(editor, 'language')
ui.select(editor.supported_themes, label='Theme') \
    .classes('w-32').bind_value(editor, 'theme')

ui.run()
```

### 自定义按键绑定 <Badge type="tip" text="^3.14.0" />

通过构造函数参数 `keymap` 或 `map_key` 方法，可以将按键映射到 Python 回调函数。按键遵循 CodeMirror 的 [keymap 语法](https://codemirror.net/docs/ref/#view.KeyBinding)——使用 "Mod" 表示 macOS 上的 Cmd 键和其他系统上的 Ctrl 键。

默认情况下，按键绑定会阻止浏览器的默认行为，因此可以覆盖 "Mod-s" 之类的快捷键。用 `ui.codemirror.KeyBinding(...)` 包装回调函数，可以改变这一行为（`prevent_default=False`），或者提供特定平台的快捷键（`mac=`、`linux=`、`win=`）。

使用 `unmap_key(key)` 可以在运行时移除映射。

```python:line-numbers
from nicegui import ui

editor = ui.codemirror(
    keymap={
        'a': lambda: ui.notify('按下了 a'),
        'Ctrl-c': lambda: ui.notify('按下了 Ctrl-c'),
        'Mod-r': lambda: ui.notify('按下了 Mod-r'),
        'Mod-s': ui.codemirror.KeyBinding(
            lambda: ui.notify('按下了 Mod-s（未阻止默认行为）'),
            prevent_default=False,
        ),
        'Mod-x Mod-y': lambda: ui.notify('先按下了 Mod-x，再按下了 Mod-y'),
    },
).classes('h-32')
ui.button('映射 F5', on_click=lambda: editor.map_key('F5', lambda: ui.notify('按下了 F5')))
ui.button('取消映射 F5', on_click=lambda: editor.unmap_key('F5'))

ui.run()
```

### 行悬停工具提示 <Badge type="tip" text="^3.13.0" />

`line_tooltips` 将行号（从 1 开始）映射到鼠标悬停时显示的内容。

```python:line-numbers
from nicegui import ui

editor = ui.codemirror(
    'def add(a, b):\n'
    '    """两数求和。"""\n'
    '    return a + b\n',
).classes('h-40')
editor.line_tooltips[1] = '符号: add，参数个数: 2'
editor.line_tooltips[3] = '返回 a 与 b 之和'

ui.run()
```

### 以 HTML 渲染工具提示 <Badge type="tip" text="^3.13.0" />

传入 `line_tooltip_html=True` 可以将工具提示内容渲染为 HTML，并通过 NiceGUI 基于 DOMPurify 的 `setHTML` polyfill 进行净化。

```python:line-numbers
from nicegui import ui

editor = ui.codemirror(
    'def add(a, b):\n'
    '    return a + b\n',
    line_tooltip_html=True,
).classes('h-32')
editor.line_tooltips[2] = '<b>返回</b> <code>a</code> 与 <code>b</code> 之和'

ui.run()
```

### 装饰 <Badge type="tip" text="^3.17.0" />

`decorations` 属性是一个可变列表，其中的装饰会以带样式的覆盖层形式叠加在编辑器文本之上，而不会修改文档本身。装饰共有四种：

- **mark**——为一段字符范围设置样式
- **line**——为整行设置样式
- **replace**——隐藏一段范围（不提供 `text` 时），或在视觉上将其替换为文本
- **widget**——在某个位置插入一段文本注释

`from`、`to` 和 `position` 字段是编辑器值的 Python `str` 索引。读取 `decorations` 返回的是声明时的规格，而不是文档发生变化后浏览器重新映射的位置。

`class` 字段接受任意 CSS 类，既可以是 Tailwind 工具类，也可以是你通过 `ui.add_css` 自己定义的类。widget 和 replace 装饰的 `text` 值默认以纯文本渲染；向构造函数传入 `decoration_html=True` 可以将其渲染为经过净化的 HTML。该选项只作用于 `text`：mark 和 line 装饰的 `attributes` 字段始终作为原始 DOM 属性应用（包括 `onclick` 之类的事件处理器），永远不会被净化，因此绝不要通过它传入不可信的输入。

```python:line-numbers
from nicegui import ui

ui.codemirror(
    'alpha\n'
    'beta\n'
    'gamma\n'
    'delta\n'
    'epsilon\n'
    'zeta',
    decorations=[
        {
            'kind': 'mark',
            'from': 6,
            'to': 10,
            'class': 'bg-red-200',
        },
        {
            'kind': 'line',
            'line': 3,
            'class': 'bg-yellow-100',
        },
        {
            'kind': 'widget',
            'position': 5,
            'text': '← 第一行',
            'class': 'text-gray-500 text-xs ml-2',
        },
        {
            'kind': 'replace',
            'from': 17,
            'to': 30,
            'text': '{ 已折叠 2 行 }',
            'class': 'text-gray-500 italic',
            'block': True,
        },
    ],
)

ui.run()
```

### 行锚点 <Badge type="tip" text="^3.16.0" />

与行号相比，行锚点能让你更稳定地引用特定的行。浏览器会在每次变更（插入、删除、重新格式化）中跟踪每个锚点的位置，在 Python 端读取 `line_anchors` 即可得到其当前所在的行。在被锚定的行上方添加或删除几行，就能看到显示的行号随之变化。传入 `on_anchor_change` 可以在被跟踪的位置发生移动时收到通知。

```python:line-numbers
from nicegui import ui

editor = ui.codemirror('def answer():\n    return 42', line_anchors={'return': 2}).classes('h-40')
ui.label().bind_text_from(editor, 'line_anchors',
                          lambda anchors: f'"return" 位于第 {anchors.get("return", "—")} 行')

ui.run()
```
