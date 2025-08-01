# 通用元素

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