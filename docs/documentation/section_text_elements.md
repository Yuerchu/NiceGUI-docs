# 文本元素

## 文本 `Label`

显示一些文本。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本的内容       |

```python:line-numbers
from nicegui import ui

ui.label('你好世界')
```

[查看更多...](./elements/label)

## 超链接 `Link`

创建超链接。

要跳转到页面内的特定位置，您可以使用 `ui.link_target("name")`
方法放置锚点，然后使用
`ui.link(target="#name")` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示的文本       |
| target     | page 函数，同一页面上的 NiceGUI 元素或字符串，该字符串是一个绝对 URL 或相对于根 URL 的相对路径 |
| new_tab    | 在新标签页中打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

ui.link('Github 上的 NiceGUI', 'https://github.com/zauberzeug/nicegui')

ui.run()
```

[查看更多...](./elements/link)

## 聊天消息 `Chat Message`

基于 Quasar 的 [Chat Message↗](https://quasar.dev/vue-components/chat/) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 消息内容(可以是一个列表的多条消息) |
| name       | 消息发送者名称 |
| label      | 仅呈现标签标题/部分 |
| stamp      | 消息的时间戳 |
| avatar     | 头像 URL |
| sent       | 是否为消息发送者(默认值：`False`) |
| text_html  | 是否以 HTML 渲染消息(默认值：`False`) |

```python:line-numbers
from nicegui import ui

ui.chat_message('Hello NiceGUI!',
                name='Robot',
                stamp='now',
                avatar='https://robohash.org/ui')

ui.run()
```

[查看更多...](./elements/chat_message)

## 通用元素

这个类是所有其他UI元素的基类，但是您可以使用它来创建带有任意HTML标记的元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| tag        | 元素的 HTML 标签 |
| _client    | 此元素的客户端(仅供内部测试) |

```python:line-numbers
from nicegui import ui

with ui.element('div').classes('p-2 bg-blue-100'):
    ui.label('inside a colored div')

ui.run()
```

[查看更多...](./elements/element)

## Markdown 元素 `Markdown Element`

在页面上渲染 Markdown。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | Markdown 内容    |
| extras     | 参考 [Markdown2 extensions](https://github.com/trentm/python-markdown2/wiki/Extras#implemented-extras) (默认值：`(default: ['fenced-code-blocks', 'tables'])`) |

```python:line-numbers
from nicegui import ui

ui.markdown('这是一段 **Markdown**.')

ui.run()
```

[查看更多...](./elements/markdown)

## reST 文本 `ReStructuredText`

在页面上渲染 ReStructuredText。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | ReStructuredText 内容 |

```python:line-numbers
from nicegui import ui

ui.restructured_text('这是一段 **reStructuredText**.')

ui.run()
```

[查看更多...](./elements/restructured_text)

## 美人鱼图 Mermaid Diagrams

将采用基于 Markdown 语法扩展的 [Mermaid](https://mermaid.js.org/)
语言编写的图表进行可视化渲染。
通过在 `ui.markdown` 元素中添加扩展字符串 'mermaid'，可将mermaid语法嵌入Markdown 元素中使用。

可选配置字典会在首个图表渲染前直接传递给mermaid。
该参数可用于设置以下选项：

- 允许在节点被点击时执行JavaScript代码: `{'securityLevel': 'loose', ...} `
- 在控制台输出信息级日志: `{'logLevel': 'info', ...}`

有关完整配置选项列表，请参阅 Mermaid 文档中的 `mermaid.initialize()` 方法说明。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | Mermaid 内容     |
| config     | 传递给 `mermaid.initialize()` 的配置字典 |

[查看更多...](./elements/mermaid)

## HTML 元素 `HTML Element`

将任意 HTML 内容渲染到页面，并包裹在指定标签中，并可使用 [Tailwind](https://tailwind.nodejs.cn/) 进行样式设计。

还可以使用 `ui.add_head_html` 将 HTML 代码添加到文档头部，使用 `ui.add_body_html` 将其添加到正文部分。

```python:line-numbers
from nicegui import ui

ui.html('这是一段 <strong>HTML</strong>.')

ui.run()
```

[查看更多...](./elements/html)

## 其他 HTML 元素 `Other HTML Elements` <Badge type="tip" text="^2.5.0" />

还存在一个html模块，允许您插入其他HTML元素如`<span>`、`<div>`、`<p>`等。
其功能等同于使用带 tag 参数的 `ui.element` 方法。

与任何其他元素一样，您可以添加类名、样式、属性、工具提示和事件。
其中一项便利之处在于，关键字参数会自动添加到元素的 props 字典中。

```python:line-numbers
from nicegui import html, ui

with html.section().style('font-size: 120%'):
    html.strong('一段粗体') \
        .classes('cursor-pointer') \
        .on('click', lambda: ui.notify('粗体!'))
    html.hr()
    html.em('一段斜体').tooltip('真棒!')
    with ui.row():
        html.img().props('src=https://placehold.co/60')
        html.img(src='https://placehold.co/60')

ui.run()
```