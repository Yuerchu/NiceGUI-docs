# HTML 元素 `HTML Element`

将任意 HTML 内容渲染到页面，并包裹在指定标签中，并可使用 [Tailwind](https://tailwind.nodejs.cn/) 进行样式设计。

还可以使用 `ui.add_head_html` 将 HTML 代码添加到文档头部，使用 `ui.add_body_html` 将其添加到正文部分。

```python:line-numbers
from nicegui import ui

ui.html('这是一段 <strong>HTML</strong>.')

ui.run()
```