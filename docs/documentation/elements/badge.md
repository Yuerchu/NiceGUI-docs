# 标签 `Badge`

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