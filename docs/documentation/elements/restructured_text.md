# reST 文本 `ReStructuredText`

在页面上渲染 ReStructuredText。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | ReStructuredText 内容 |

```python:line-numbers
from nicegui import ui

ui.restructured_text('这是一段 **reStructuredText**.')

ui.run()
```