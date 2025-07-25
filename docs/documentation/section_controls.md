# 控制元素

## 按钮 `Button`

此元素基于 Quasar 的 [QBtn](https://quasar.dev/vue-components/button) 组件。

color 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。 如果使用 Quasar 颜色，按钮将根据 Quasar 主题进行样式设置，包括文本颜色。

::: tip 注意
存在像 `red` 这种同时属于 Quasar 颜色和 CSS 颜色的名称。
此类情况下将优先使用 Quasar 颜色。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 按钮的标签       |
| on_click   | 按钮被点击时的回调函数 |
| color      | 按钮颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |
| icon| 显示在按钮上的图标名称 (默认值: `None`) |

```python:line-numbers
from nicegui import ui

ui.button('点我', on_click=lambda: ui.notify('您点了我'))

ui.run()
```

[查看更多...](./elements/button)

## 按钮组 `Button Group`

此元素基于 Quasar 的 [QBtnGroup](https://quasar.dev/vue-components/button-group) 组件。

::: tip 注意
您必须为按钮组和按钮使用相同的 `props` 设计。
:::

```python:line-numbers
from nicegui import ui

with ui.button_group():
    ui.button('一', on_click=lambda: ui.notify('您按下了按钮 1!'))
    ui.button('二', on_click=lambda: ui.notify('您按下了按钮 2!'))
    ui.button('三', on_click=lambda: ui.notify('您按下了按钮 3!'))

ui.run()
```

[查看更多...](./elements/button_group)

## 下拉按钮 `Dropdown Button`

此元素基于 Quasar 的 [QBtnDropDown](https://quasar.dev/vue-components/button-dropdown) 组件。

color 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。 如果使用 Quasar 颜色，按钮将根据 Quasar 主题进行样式设置，包括文本颜色。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 按钮的标签       |
| value      | 下拉菜单是否被打开（默认值：`False`） |
| on_value_change | 在下拉菜单被打开或关闭时的回调函数 |
| on_click   | 按钮被点击时的回调函数 |
| color      | 按钮颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |

```python:line-numbers
from nicegui import ui

with ui.dropdown_button('打开我!', auto_close=True):
    ui.item('项目 1', on_click=lambda: ui.notify('You clicked 项目 1'))
    ui.item('项目 2', on_click=lambda: ui.notify('You clicked 项目 2'))

ui.run()
```

[查看更多...](./elements/button_dropdown)

## 标签 `Badge`

基于 Quasar 的 [QBadge](https://quasar.dev/vue-components/badge) 构建的组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本框的初始值   |
| color      | 按钮颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| text_color | 文本颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| outline   | 使用外框设计 (默认值：`False`) |

```python:line-numbers
from nicegui import ui

with ui.button('点我则会计数+1', on_click=lambda: badge.set_text(int(badge.text) + 1)):
    badge = ui.badge('0', color='red').props('floating')

ui.run()
```

[查看更多...](./elements/badge)

## 小标签 Chip

基于 Quasar 的 [QChip](https://quasar.dev/vue-components/chip) 组件。它可以被点击、选择或者移除。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本的初始值 (默认值: `""`) |
| icon       | 显示在此标签上的图标名 (默认值: `None`) |
| color      | 标签的背景色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| text_color | 标签的背景色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `None`) |
| on_click   | 标签被点击时的回调函数，前提是按钮被设置为可点击 |
| selectable | 该标签是否可被选中 (默认值: `False`) |
| selected   | 该标签是否被选中 (默认值: `False`) |
| on_selection_change | 标签选中状态改变的回调函数 |
| removable  | 此标签是否可被移除。如果可被移除则会显示一个 `×` 按钮 (默认值: `False`) |
| on_value_change | 标签被移除或未被移除时调用的回调函数 |

```python:line-numbers
from nicegui import ui

with ui.row().classes('gap-1'):
    ui.chip('Click me', icon='ads_click', on_click=lambda: ui.notify('Clicked'))
    ui.chip('Selectable', selectable=True, icon='bookmark', color='orange')
    ui.chip('Removable', removable=True, icon='label', color='indigo-3')
    ui.chip('Styled', icon='star', color='green').props('outline square')
    ui.chip('Disabled', icon='block', color='red').set_enabled(False)

ui.run()
```

## 切换器 Toggle

基于 Quasar 的 [QBtnToggle](https://quasar.dev/vue-components/button-toggle) 组件。

选项可以指定为值列表，或作为将值映射到标签的字典。操作选项后，调用 `update()` 以更新用户界面中的选项。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 一个列表 `['value1', ...]` 或一个字典(值) `{'value1':'label1', ...}` |
| value      | 初始选中的的值   |
| on_change  | 当选中项改变时的回调函数 |
| clearable  | 选中状态是否可移除 (是否可以不选择项目，译者注) |

```python:line-numbers
from nicegui import ui

toggle1 = ui.toggle([1, 2, 3], value=1)
toggle2 = ui.toggle({1: 'A', 2: 'B', 3: 'C'}).bind_value(toggle1, 'value')

ui.run()
```

## 单项选择器 Radio Selection

基于 Quasar 的 [QRadio](https://quasar.dev/vue-components/radio) 组件。

选项可以指定为值列表，或作为将值映射到标签的字典。操作选项后，调用 `update()` 以更新用户界面中的选项。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 一个列表 `['value1', ...]` 或一个字典(值) `{'value1':'label1', ...}` |
| value      | 初始选中的的值  |
| on_change  | 当选中项改变时的回调函数 |

```python:line-numbers
from nicegui import ui

radio1 = ui.radio([1, 2, 3], value=1).props('inline')
radio2 = ui.radio({1: 'A', 2: 'B', 3: 'C'}).props('inline').bind_value(radio1, 'value')

ui.run()
```

## 下拉选择器 Dropdown Selection

基于 Quasar 的 [QSelect](https://quasar.dev/vue-components/select) 组件。

选项可以指定为值列表，或作为将值映射到标签的字典。操作选项后，调用 `update()` 以更新用户界面中的选项。

若 `with_input` 为 `True`，则显示输入框用于筛选选项。

若 `new_value_mode` 不为 `None`，则隐含 `with_input=True`，用户可在输入框中输入新值。详情参见 [Quasar 文档](https://quasar.dev/vue-components/select#the-new-value-mode-prop)。注意，当以编程方式设置 `value` 属性时，此模式无效。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 一个列表 `['value1', ...]` 或一个字典(值) `{'value1':'label1', ...}` |
| label      | 选择器的标题     |
| value      | 初始选中的的值   |
| on_change  | 当选中项改变时的回调函数 |
| with_input | 是否显示用于筛选选项的输入框 |
| new_value_mode | 是否接受用户输入新的值 (默认值: `None`，代表不接受新值) |
| multiple   | 是否允许多选     |
| clearable  | 是否添加清除选择的按钮 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |
| key_generator | 为新增值生成字典键的回调函数或迭代器 |

```python:line-numbers
from nicegui import ui

select1 = ui.select([1, 2, 3], value=1)
select2 = ui.select({1: 'One', 2: 'Two', 3: 'Three'}).bind_value(select1, 'value')

ui.run()
```

## 复选框 Checkbox

基于 Quasar 的 [QCheckBox](https://quasar.dev/vue-components/checkbox) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在复选框边上的文字 |
| value      | 是否默认被选中 (默认值: `False`) |
| on_change  | 当选中项改变时的回调函数 |

```python:line-numbers
from nicegui import ui

checkbox = ui.checkbox('check me')
ui.label('Check!').bind_visibility_from(checkbox, 'value')

ui.run()
```

## 开关 Switch

基于 Quasar 的 [QToggle](https://quasar.dev/vue-components/toggle) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在开关边上的文字 |
| value      | 是否默认被打开 (默认值: `False`) |
| on_change  | 当开启状态改变时的回调函数 |

```python:line-numbers
from nicegui import ui

switch = ui.switch('打开我')
ui.label('您打开了按钮').bind_visibility_from(switch, 'value')

ui.run()
```

## 滑块 Slider

此元素基于 Quasar 的 [QSlider](https://quasar.dev/vue-components/slider) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| min        | 滑块的最小值     |
| max        | 滑块的最大值     |
| step       | 滑块的步进       |
| value      | 滑块的初始值     |
| on_change  | 当滑块的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

slider = ui.slider(min=0, max=100, value=50)
ui.label().bind_text_from(slider, 'value')

ui.run()
```

## 范围选择器 Range

此元素基于 Quasar 的 [QRange](https://quasar.dev/vue-components/range) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| min        | 选择器的最小值   |
| max        | 选择器的最大值   |
| step       | 选择器的步进     |
| value      | 选择器的初始值   |
| on_change  | 当选择器的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

min_max_range = ui.range(min=0, max=100, value={'min': 20, 'max': 80})
ui.label().bind_text_from(min_max_range, 'value',
                          backward=lambda v: f'min: {v["min"]}, max: {v["max"]}')

ui.run()
```

## 评分组件 Rating <Badge type="tip" text="^2.12.0" />

此元素基于 Quasar 的 [QRating](https://quasar.dev/vue-components/rating) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始值 (默认值: `None`) |
| max        | 最大分值 (默认值: `5`) |
| icon       | 分值图标的名称 (默认值: `"star"`) |
| icon_selected | 选中的值的图标 (默认跟随 `icon`) |
| icon_half  | 当选中半分的时候的图标 (默认跟随 `icon`) |
| color      | 图标的颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| size       | CSS单元尺寸，包括单位名称或标准尺寸名称 `xs/sm/md/lg/xl`，例如 `16px` 和 `2rem` |
| on_change  | 当评分的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

ui.rating(value=4)

ui.run()
```

## 虚拟摇杆 Joystick

使用 [nipple.js](https://yoannmoi.net/nipplejs/) 创建一个虚拟摇杆。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_start   | 当用户开始使用摇杆执行的回调函数 |
| on_move    | 当用户开始移动摇杆执行的回调函数 |
| on_end     | 当用户结束使用摇杆执行的回调函数 |
| throttle   | 移动事件的节流间隔 (单位: 秒，默认值: `0.05`，不宜设置得过低，会显著降低服务端的性能，译者注) |
| options    | 应传递给 [`nipple.js`](https://github.com/yoannmoinet/nipplejs#options) 库的参数，例如 `color` |

::: details 可传入 `nipple.js` 的参数
```typescript
var options = {
    zone: Element,                  // active zone
    color: String,
    size: Integer,
    threshold: Float,               // before triggering a directional event
    fadeTime: Integer,              // transition time
    multitouch: Boolean,
    maxNumberOfNipples: Number,     // when multitouch, what is too many?
    dataOnly: Boolean,              // no dom element whatsoever
    position: Object,               // preset position for 'static' mode
    mode: String,                   // 'dynamic', 'static' or 'semi'
    restJoystick: Boolean|Object,   // Re-center joystick on rest state
    restOpacity: Number,            // opacity when not 'dynamic' and rested
    lockX: Boolean,                 // only move on the X axis
    lockY: Boolean,                 // only move on the Y axis
    catchDistance: Number,          // distance to recycle previous joystick in
                                    // 'semi' mode
    shape: String,                  // 'circle' or 'square'
    dynamicPage: Boolean,           // Enable if the page has dynamically visible elements
    follow: Boolean,                // Makes the joystick follow the thumbstick
};
```
:::

```python:line-numbers
from nicegui import ui

ui.joystick(
    color='blue', size=50,
    on_move=lambda e: coordinates.set_text(f'{e.x:.3f}, {e.y:.3f}'),
    on_end=lambda _: coordinates.set_text('0, 0'),
).classes('bg-slate-300')
coordinates = ui.label('0, 0')

ui.run()
```

## 单行文本输入 Text Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件。

每次按键都会响应 `on_change` 事件，并让相应的值更新。如果您希望等待到用户确认输入，那么您可以注册一个自定义事件回调，比如 `ui.input(...).on('keydown.enter', ...)` 或 `ui.input(...).on('blur', ...)`。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

关于输入框样式的说明：Quasar 的 `QInput` 组件是对原生 `<input>` 元素的封装。这意味着您无法直接对输入框进行样式设置，但可以通过 `input-class` 和 `input-style` 属性来为原生 input 元素添加样式。更多详情请参阅 [`QInput`](https://quasar.dev/vue-components/input) 文档中的 Style 属性部分。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 输入框的标题     |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| password   | 是否需要隐藏输入内容 (默认值: `False`) |
| password_toggle_button | 是否需要显示一个用于切换输入内容显示和隐藏的按钮 (默认值: `False`) |
| on_change  | 当输入框的内容被改变时的回调函数 |
| autocomplete | 可选，一个用于自动完成的列表 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.input(label='Text', placeholder='开始输入',
         on_change=lambda e: result.set_text('您输入了: ' + e.value),
         validation={'太长了!': lambda value: len(value) < 20})
result = ui.label()

ui.run()
```

## 多行文本输入 Textarea

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，与 [单行文本输入 Text Input](#单行文本输入-text-input) 相比，它被设计为可以进行多行输入。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 输入框的标题     |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| on_change  | 当输入框的内容被改变时的回调函数 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.textarea(label='Text', placeholder='开始输入',
            on_change=lambda e: result.set_text('您输入了: ' + e.value))
result = ui.label()

ui.run()
```

## 代码编辑器 CodeMirror

一个使用 [CodeMirror](https://codemirror.net) 创建代码编辑器的元素。

支持超过 140 种语言的语法高亮、30 余种主题、行号显示、代码折叠、（有限的）自动补全等功能。

::: details 支持的语言

支持的语言列表可查看 [@codemirror/language-data](https://github.com/codemirror/language-data/blob/main/src/language-data.ts) 包。

译者也推荐您参阅 `nicegui/elements/codemirror.py` 的 `SUPPORTED_LANGUAGES` 容器：

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

同样的，译者也推荐您参阅 `nicegui/elements/codemirror.py` 的 `SUPPORTED_THEMES` 容器：

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
| language   | 编辑器的初始语言 (不区分大小写，默认值: `None`) |
| theme      | 编辑器的初始主题 (默认值: `"basicLight"`) |
| indent     | 用于缩进的字符串 (必须由相同空白字符组成的任意字符，默认值: `" "`) |
| line_wrapping | 是否自动换行 (默认值: `False`) |
| highlight_whitespace | 是否高亮空白字符 (默认值: False) |

```python:line-numbers
from nicegui import ui

editor = ui.codemirror('print("开始您的编辑")', language='Python').classes('h-32')
ui.select(editor.supported_languages, label='Language', clearable=True) \
    .classes('w-32').bind_value(editor, 'language')
ui.select(editor.supported_themes, label='Theme') \
    .classes('w-32').bind_value(editor, 'theme')

ui.run()
```

## 数字输入器 Number Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'太小啦！': lambda value: value > 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 数字输入框的标题 |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| min        | 允许的最小值     |
| max        | 允许的最大值     |
| precision  | 允许的小数位数（默认: 无限制，负值表示小数点前的位数） |
| step       | 步进按钮的步长   |
| prefix     | 显示值前添加的前缀 |
| suffix     | 显示值后添加的后缀 |
| format | 格式化显示值的字符串，如 `%.2f` |
| on_change  | 当输入框中的内容被改变时的回调函数 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.number(label='Number', value=3.1415927, format='%.2f',
          on_change=lambda e: result.set_text(f'您输入了: {e.value}'))
result = ui.label()

ui.run()
```

## 旋钮 Knob

此元素基于 Quasar 的 [QKnob](https://quasar.dev/vue-components/knob) 组件。该元素用于通过鼠标/触摸滑动从用户处获取数字输入。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始值 (默认值: `0.0`) |
| min        | 最小值 (默认值: `0.0`) |
| max        | 最大值 (默认值: `1.0`) |
| step       | 步进 (默认值: `0.01`) |
| color      | 轨迹的颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| center_color | 组件中心的颜色，比如 `primary` 或 `teal-10` |
| track_color | 轨道的颜色，比如 `primary` 或 `teal-10` |
| size       | CSS单元尺寸，包括单位名称或标准尺寸名称 `xs/sm/md/lg/xl`，例如 `16px` 和 `2rem` |
| show_value | 是否显示旋钮的值 |
| on_change  | 当旋钮的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

knob = ui.knob(0.3, show_value=True)

with ui.knob(color='orange', track_color='grey-2').bind_value(knob, 'value'):
    ui.icon('volume_up')

ui.run()
```

## 颜色输入器 Color Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，但添加了一个颜色选择作为扩展。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | RGB 色号输入框的标题 |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| on_change  | 当输入框中的色号被改变时的回调函数 |
| preview    | 将选择的颜色应用到按钮背景 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

label = ui.label('选一个颜色吧！')
ui.color_input(label='Color', value='#000000',
               on_change=lambda e: label.style(f'color:{e.value}'))

ui.run()
```

## 颜色选择器 Color Picker

此元素基于 Quasar 的 [QMenu](https://quasar.dev/vue-components/menu) 和 [QColor](https://quasar.dev/vue-components/color-picker) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_pick    | 当选择了一个色号执行的回调函数 |
| value      | 选择器是否打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.button(icon='colorize') as button:
    ui.color_picker(on_pick=lambda e: button.classes(f'!bg-[{e.color}]'))

ui.run()
```

## 日期选择器 Date Input

此元素基于 Quasar 的 [QDate](https://quasar.dev/vue-components/date) 组件。日期是以 `mask` 参数定义的格式字符串。

您还可以使用 `range` 或 `multiple` 属性来选择日期范围或多个日期。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始日期         |
| mask       | 日期的格式 (默认值: `'YYYY-MM-DD'`) |
| on_change  | 当选择了一个日期执行的回调函数 |

```python:line-numbers
from nicegui import ui

# 选择一个日期范围
ui.date({'from': '2023-01-01', 'to': '2023-01-05'}, on_change=lambda e: result_1.set_text(e.value)).props('range')

# 选择多个日期
ui.date(['2023-01-01', '2023-01-02', '2023-01-03'], on_change=lambda e: result_2.set_text(e.value)).props('multiple')

# 既要选择日期范围又要选择多个日期
ui.date([{'from': '2023-01-01', 'to': '2023-01-05'}, '2023-01-07'], on_change=lambda e: result_3.set_text(e.value)).props('multiple range')

result_1 = ui.label()
result_2 = ui.label()
result_3 = ui.label()

ui.run()
```

## 时间选择器 Time Input

此元素基于 Quasar 的 [QTime](https://quasar.dev/vue-components/time) 组件。时间是以 `mask` 参数定义的格式字符串。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始时间         |
| mask       | 时间的格式 (默认值: `'HH:mm'`) |
| on_change  | 当选择了一个时间执行的回调函数 |

```python:line-numbers
from nicegui import ui

ui.time(value='12:00', on_change=lambda e: result.set_text(e.value))
result = ui.label()

ui.run()
```

## 文件上传 File Upload

此元素基于 Quasar 的 [QUploader](https://quasar.dev/vue-components/uploader) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| multiple | 是否允许一次性上传多个文件 (默认值: `False`) |
| max_file_size | 单个文件的最大大小 (单位: 字节) (默认值: `0`) |
| max_total_size | 所有文件总大小的上限 (单位: 字节) (默认值: `0`) |
| max_files | 最大文件数量限制 (默认值: `0`) |
| on_upload | 每个文件上传完成后执行的回调函数 |
| on_multi_upload | 多个文件全部上传完成后执行的回调函数 |
| on_rejected | 每个被拒绝的文件执行的回调函数 |
| label | 上传组件的标签文字 (默认值: `''`) |
| auto_upload | 选择文件后自动上传 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

ui.upload(on_upload=lambda e: ui.notify(f'已上传 {e.name}')).classes('max-w-full')

ui.run()
```