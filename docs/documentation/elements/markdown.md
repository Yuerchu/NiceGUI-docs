# Markdown 元素 `Markdown Element`

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