# 浮动按钮（FAB）<Badge type="tip" text="^2.22.0" />

一个可以被展开一些功能按钮的按钮。此元素基于 Quasar 的 [QFab](https://quasar.dev/vue-components/floating-action-button#qfab-api) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| icon | 在 FAB 上显示的图标 |
| value | FAB 是否已打开（默认：`False`） |
| label | FAB 的可选标签 |
| color | FAB 的背景颜色（默认：`primary`） |
| direction | FAB 的方向（`up`、`down`、`left`、`right`，默认：`right`） |

```python:line-numbers
from nicegui import ui

with ui.fab('navigation', label='Transport'):
    ui.fab_action('train', on_click=lambda: ui.notify('Train'))
    ui.fab_action('sailing', on_click=lambda: ui.notify('Boat'))
    ui.fab_action('rocket', on_click=lambda: ui.notify('Rocket'))

ui.run()
```

### 样式

您可以使用 `color` 参数来为 FAB 及其操作项设置样式。`color` 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。您还可以使用 `direction` 参数来更改 FAB 的方向。

```python:line-numbers
from nicegui import ui

with ui.fab('shopping_cart', label='商店', color='teal', direction='up') \
        .classes('mt-40 mx-auto'):
    ui.fab_action('sym_o_nutrition', label='水果', color='green')
    ui.fab_action('local_pizza', label='披萨', color='yellow')
    ui.fab_action('sym_o_icecream', label='冰淇淋', color='orange')

ui.run()
```