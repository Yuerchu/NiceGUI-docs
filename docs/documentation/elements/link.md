# 超链接 `Link`

创建超链接。

要跳转到页面内的特定位置，您可以使用 `ui.link_target("name")` 方法放置锚点，然后使用 `ui.link(target="#name")` 方法。

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