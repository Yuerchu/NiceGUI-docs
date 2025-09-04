# HTML 元素 `HTML Element`

将任意 HTML 内容渲染到页面，并包裹在指定标签中，并可使用 [Tailwind](https://tailwind.nodejs.cn/) 进行样式设计。

还可以使用 `ui.add_head_html` 将 HTML 代码添加到文档头部，使用 `ui.add_body_html` 将其添加到正文部分。

```python:line-numbers
from nicegui import ui

ui.html('这是一段 <strong>HTML</strong>.')

ui.run()
```

### 生成内联元素

使用 `tag` 参数可以生成 `div` 以外的元素。

```python:line-numbers
from nicegui import ui

ui.html('这是<u>带下划线</u>的文本。', tag='em')

ui.run()
```

### 其他 HTML 元素 <Badge type="tip" text="^2.5.0" />

此外，还有一个 `html` 模块，允许您插入其他 HTML 元素，如 `<span>`、`<div>`、`<p>` 等。它等同于使用带有 `tag` 参数的 `ui.element` 方法。

与任何其他元素一样，您可以添加类、样式、属性、工具提示和事件。一个便利之处在于，关键字参数会自动添加到元素的 `props` 字典中。

```python:line-numbers
from nicegui import html, ui

with html.section().style('font-size: 120%'):
    html.strong('这是粗体文本。') \
        .classes('cursor-pointer') \
        .on('click', lambda: ui.notify('粗体！'))
    html.hr()
    html.em('这是斜体文本。').tooltip('赞！')
    with ui.row():
        html.img().props('src=https://placehold.co/60')
        html.img(src='https://placehold.co/60')

ui.run()
```