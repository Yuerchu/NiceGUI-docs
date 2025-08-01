# 按钮组 `Button Group`

此元素基于 Quasar 的 [QBtnGroup](https://quasar.dev/vue-components/button-group) 组件。

::: tip 注意
您必须为按钮组和按钮使用相同的 `props` 设计。
:::

```python:line-numbers
from nicegui import ui

with ui.button_group():
    ui.button('一', on_click=lambda: ui.notify('您按下了按钮 1!'))
    ui.button('二', on_click=lambda: ui.notify('您按下了按钮 2!'))
    ui.button('三', on_click=lambda: ui.notify('您按下了按钮 3!'))

ui.run()
```