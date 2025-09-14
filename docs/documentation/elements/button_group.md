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

### 带下拉按钮的按钮组

您也可以在按钮组中添加一个下拉按钮。

```python:line-numbers
from nicegui import ui

with ui.button_group():
    ui.button('一')
    ui.button('二')
    with ui.dropdown_button('下拉菜单'):
        ui.item('选项 1', on_click=lambda: ui.notify('点击了选项 1'))
        ui.item('选项 2', on_click=lambda: ui.notify('点击了选项 2'))

ui.run()
```

### 按钮组样式

您可以像为单个按钮一样，为按钮组应用相同的样式选项，例如 "flat"、"outline"、"push" 等。但是，您必须始终为按钮组及其包含的按钮使用相同的设计属性。

```python:line-numbers
from nicegui import ui

with ui.button_group().props('rounded'):
    ui.button('一')
    ui.button('二')
    ui.button('三')
with ui.button_group().props('push glossy'):
    ui.button('一', color='red').props('push')
    ui.button('二', color='orange').props('push text-color=black')
    ui.button('三', color='yellow').props('push text-color=black')
with ui.button_group().props('outline'):
    ui.button('一').props('outline')
    ui.button('二').props('outline')
    ui.button('三').props('outline')

ui.run()
```