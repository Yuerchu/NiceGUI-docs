---
title: 造型与外观
prev:
  text: '页面布局'
  link: '/documentation/section_page_layout'
next:
  text: '动作与事件'
  link: '/documentation/section_action_events'
---

# 造型与外观

## 样式设计 Styling

NiceGUI 基于 [Quasar 框架](https://quasar.dev/)构建，并且完美地继承其设计能力。每个 NiceGUI 元素都提供了这些用法：

- **`props`**: 该方法中的内容会传递给 [Quasar 组件](https://justpy.io/quasar_tutorial/introduction/#props-of-quasar-components)，具体请参考 [Quasar 文档](https://quasar.dev/vue-components/button#design)。
- **`classes`**: 该方法中的内容将会被传递给 [Tailwind CSS](https://v3.tailwindcss.com/)，以实现响应式的不同的布局。
- **`style`**: 该方法可以让您直接使用 CSS。但您需注意，**此时分隔符为分号而非空格**。

这三类方法均支持 `remove` 和 `replace` 参数，以便在特定场景下覆盖预定义的样式效果。

```python:line-numbers
from nicegui import ui

ui.radio(['x', 'y', 'z'], value='x').props('inline color=green')
ui.button(icon='touch_app').props('outline round').classes('shadow-lg')
ui.label('Stylish!').style('color: #6E93D6; font-size: 200%; font-weight: 300')

ui.run()
```

## Tailwind CSS

[Tailwind CSS](https://v3.tailwindcss.com/) 是一个用于快速构建自定义用户界面的 CSS 框架。NiceGUI 提供了一个流畅且支持自动补全的接口，用于向 UI 元素添加 Tailwind 类。

您可以通过浏览 tailwind 属性的方法来发现可用的类。构建器模式允许您将多个类链接在一起（如“标签 A”所示）。您还可以通过传递类列表来调用 tailwind 属性（如“标签 B”所示）。

尽管这与使用 classes 方法非常相似，但由于自动补全功能，它在处理 Tailwind 类时更为便捷。

最后同样重要的是，您还可以预定义样式并将其应用于多个元素（标签 C 和 D）。

请注意，有时 Tailwind 会被 Quasar 样式覆盖，例如在使用 `ui.button('Button').tailwind('bg-red-500')` 时。这是一个已知的限制，不完全在我们的控制范围内。但我们尝试提供解决方案，比如颜色参数：`ui.button('Button', color='red-500')`。

```python:line-numbers
from nicegui import Tailwind, ui

ui.label('Label A').tailwind.font_weight('extrabold').text_color('blue-600').background_color('orange-200')
ui.label('Label B').tailwind('drop-shadow', 'font-bold', 'text-green-600')

red_style = Tailwind().text_color('red-600').font_weight('bold')
label_c = ui.label('Label C')
red_style.apply(label_c)
ui.label('Label D').tailwind(red_style)

ui.run()
```

## Tailwind CSS 布局

Tailwind CSS 的 `@layer` 指令允许您定义可在 HTML 中使用的自定义类。NiceGUI 通过支持将自定义类添加到组件层来实现这一功能。这样，你可以定义自己的类并在UI元素中使用它们。在下面的示例中，我们定义了一个名为 `blue-box` 的自定义类，并将其应用于两个标签。

::: warning 注意
style 标签的类型是 `text/tailwindcss` 而非 `text/css` 。
:::

```python:line-numbers
from nicegui import ui

ui.add_head_html('''
    <style type="text/tailwindcss">
        @layer components {
            .blue-box {
                @apply bg-blue-500 p-12 text-center shadow-lg rounded-lg text-white;
            }
        }
    </style>
''')

with ui.row():
    ui.label('Hello').classes('blue-box')
    ui.label('world').classes('blue-box')

ui.run()
```

## 元素过滤 ElementFilter

有时，在当前页面的 Python 元素树中进行搜索会很方便。`ElementFilter()` 支持通过元素类型、标记和内容进行强大的筛选。它还提供了一个流畅的接口来应用更多筛选条件，比如排除元素或筛选特定父元素内的元素。该筛选器可用作迭代器来遍历找到的元素，并且总是在迭代时应用筛选条件，而不是在实例化时。

一个元素只有在满足以下所有条件时才会被返回：

- 该元素属于指定的类型（如果指定了类型）。
- 该元素不属于任何被排除的类型。
- 该元素拥有所有指定的标记。
- 该元素不拥有任何被排除的标记。
- 该元素包含所有指定的内容。
- 该元素不包含任何被排除的内容。
- 其父元素包含所有通过 within 指定的实例。
- 其父元素不包含任何通过 not_within 指定的实例。
- 其父元素包含所有通过 within 指定的类型。
- 其父元素不包含任何通过 not_within 指定的类型。
- 其父元素包含所有通过 within 指定的标记。
- 其父元素不包含任何通过 not_within 指定的标记。

元素的“内容”包括其文本、标签、图标、占位符、值、消息、内容和来源。对于内容筛选来说，部分匹配（如“Hello”匹配“Hello World!”）就足够了。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| kind       | 按元素类型过滤；迭代器将返回指定类型的元素 |
| marker     | 按元素标记过滤；可以是字符串列表，或使用空格分隔多个标记的单个字符串 |
| content    | 按元素内容属性（如 `.text/.value/.source` 等）过滤；可以是单个字符串或必须全部匹配的字符串列表 |
| local_scope | 若为 `True` 则仅在当前作用域内搜索元素；默认会搜索整个页面（可通过设置 `ElementFilter.DEFAULT_LOCAL_SCOPE=True` 修改默认行为） |

```python:line-numbers
from nicegui import ElementFilter, ui

with ui.card():
    ui.button('button A')
    ui.label('label A')

with ui.card().mark('important'):
    ui.button('button B')
    ui.label('label B')

ElementFilter(kind=ui.label).within(marker='important').classes('text-xl')

ui.run()
```

## Query Selector

要操作如文档主体这样的元素，可以使用 `ui.query` 函数。通过查询结果，你可以像处理其他 UI 元素一样添加类、样式和属性。例如，这可用于更改页面背景颜色（如 `ui.query('body').classes('bg-green')`）。

```python:line-numbers
from nicegui import ui

def set_background(color: str) -> None:
    ui.query('body').style(f'background-color: {color}')

ui.button('Blue', on_click=lambda: set_background('#ddeeff'))
ui.button('Orange', on_click=lambda: set_background('#ffeedd'))

ui.run()
```

## 颜色主题 Color Theming

设置 [Quasar](https://quasar.dev/style/theme-builder) 的颜色主题。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| primary    | 主色 (默认值: `"#5898d4"`) |
| secondary  | 次要色 (默认值: `"#26a69a"`) |
| accent     | 强调色 (默认值: `"#9c27b0"`) |
| dark       | 深色 (默认值: `"#1d1d1d"`) |
| dark_page  | 深色页面背景 (默认值: `"#121212"`) |
| positive   | 积极色 (默认值: `"#21ba45"`) |
| negative   | 消极色 (默认值: `"#c10015"`) |
| info       | 信息色 (默认值: `"#31ccec"`) |
| warning    | 警告色 (默认值: `"#f2c037"`) |
| custom_colors | 品牌自定义颜色 (需在使用前调用 `ui.colors`) <Badge type="tip" text="^2.2.0" /> |

```python:line-numbers
from nicegui import ui

ui.button('Default', on_click=lambda: ui.colors())
ui.button('Gray', on_click=lambda: ui.colors(primary='#555'))

ui.run()
```

## CSS 变量

您可以通过设置CSS变量来自定义NiceGUI的外观。目前，以下变量及其默认值可供使用：

- `--nicegui-default-padding: 1rem`
- `--nicegui-default-gap: 1rem`

```python:line-numbers
from nicegui import ui

ui.add_css('''
    :root {
        --nicegui-default-padding: 0.5rem;
        --nicegui-default-gap: 3rem;
    }
''')
with ui.card():
    ui.label('small padding')
    ui.label('large gap')

ui.run()
```

## 覆写 Tailwind 的默认样式

Tailwind 会重置 HTML 元素的默认样式，例如本例中 `h2` 元素的字体大小。您可以通过添加 type 为 `text/tailwindcss` 的 style 标签来覆盖这些默认值。若未指定此类型，样式会过早被解析，从而被 Tailwind 覆盖。

```python:line-numbers
from nicegui import ui

ui.add_head_html('''
    <style type="text/tailwindcss">
        h2 {
            font-size: 150%;
        }
    </style>
''')
ui.html('<h2>Hello world!</h2>')

ui.run()
```

## 深色模式 Dark mode

你可以使用这个元素来为当前页面启用、禁用或是切换深色模式。值 `None` 代表自动模式，将使用客户端的系统偏好设置。

请注意，此元素会覆盖ui.run函数及页面装饰器中的dark参数。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 是否启用暗黑模式。若为None则设为自动模式 |
| on_change  | 当值变化时触发的回调函数 |

```python:line-numbers
from nicegui import ui

dark = ui.dark_mode()
ui.label('Switch mode:')
ui.button('Dark', on_click=dark.enable)
ui.button('Light', on_click=dark.disable)

ui.run()
```

## 添加 CSS 样式定义到页面 <Badge type="tip" text="^2.0.0" />

此函数可用于向 HTML 页面的头部添加 CSS 样式定义。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | CSS内容（字符串或文件路径） |
| shared     | 是否将代码添加到所有页面 (默认值: `False`) <Badge type="tip" text="^2.14.0" /> |


## 使用其他基于 Vue 框架的 UI <Badge type="tip" text="^2.21.0" />

:::warning 注意
**这是一个实验性的功能。许多 NiceGUI 组件将会出现问题，它们的 API 也可能随时会改变。**
:::

NiceGUI 默认使用 [Quasar 框架]()，但你也可以尝试其他 Vue UI 框架，如 [Element Plus](https://element-plus.org/zh-CN/) 或 [Vuetify](https://vuetifyjs.com/zh-Hans/) 。为此，需将这些框架的 JavaScript 和 CSS 文件添加到 HTML 文档的头部，并通过扩展或替换 `app.config.vue_config_script` 来相应配置 NiceGUI 。

```python:line-numbers
from nicegui import app, ui

ui.add_body_html('''
    <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
    <script defer src="https://unpkg.com/element-plus"></script>
''')
app.config.vue_config_script += '''
    app.use(ElementPlus);
'''

with ui.element('el-button').on('click', lambda: ui.notify('Hi!')):
    ui.html('Element Plus button')

ui.button('Quasar button', on_click=lambda: ui.notify('Ho!'))

ui.run()
```