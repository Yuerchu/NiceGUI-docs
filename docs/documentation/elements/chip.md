# 小标签 Chip

基于 Quasar 的 [QChip](https://quasar.dev/vue-components/chip) 组件。它可以被点击、选择或者移除。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本的初始值 (默认值: `""`) |
| icon       | 显示在此标签上的图标名 (默认值: `None`) |
| color      | 标签的背景色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| text_color | 标签的背景色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `None`) |
| on_click   | 标签被点击时的回调函数，前提是按钮被设置为可点击 |
| selectable | 该标签是否可被选中 (默认值: `False`) |
| selected   | 该标签是否被选中 (默认值: `False`) |
| on_selection_change | 标签选中状态改变的回调函数 |
| removable  | 此标签是否可被移除。如果可被移除则会显示一个 `×` 按钮 (默认值: `False`) |
| on_value_change | 标签被移除或未被移除时调用的回调函数 |

```python:line-numbers
from nicegui import ui

with ui.row().classes('gap-1'):
    ui.chip('Click me', icon='ads_click', on_click=lambda: ui.notify('Clicked'))
    ui.chip('Selectable', selectable=True, icon='bookmark', color='orange')
    ui.chip('Removable', removable=True, icon='label', color='indigo-3')
    ui.chip('Styled', icon='star', color='green').props('outline square')
    ui.chip('Disabled', icon='block', color='red').set_enabled(False)

ui.run()
```

### 动态 Chip 元素作为标签/标记

本示例演示了如何实现一个用作标签或标记的动态 Chip 列表。您可以通过输入标签文本并按下回车键，或点击加号按钮来添加新的标签。被移除的标签仍然存在，但它们的值被设置为 `False`。

```python:line-numbers
from nicegui import ui

def add_chip():
    with chips:
        ui.chip(label_input.value, icon='label', color='silver', removable=True)
    label_input.value = ''

label_input = ui.input('添加标签').on('keydown.enter', add_chip)
with label_input.add_slot('append'):
    ui.button(icon='add', on_click=add_chip).props('round dense flat')

with ui.row().classes('gap-0') as chips:
    ui.chip('标签 1', icon='label', color='silver', removable=True)

ui.button('恢复已移除的标签', icon='unarchive',
            on_click=lambda: [chip.set_value(True) for chip in chips]) \
    .props('flat')

ui.run()
```