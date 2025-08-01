# 下拉按钮 `Dropdown Button`

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