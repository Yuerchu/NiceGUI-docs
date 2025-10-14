# 复选框 Checkbox

基于 Quasar 的 [QCheckBox](https://quasar.dev/vue-components/checkbox) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在复选框边上的文字 |
| value      | 是否默认被选中 (默认值: `False`) |
| on_change  | 当选中项改变时的回调函数 |

```python:line-numbers
from nicegui import ui

checkbox = ui.checkbox('勾选我')
ui.label('已勾选！').bind_visibility_from(checkbox, 'value')

ui.run()
```

## 处理用户交互

通过参数传递的 `on_change` 函数会在复选框被点击*以及*通过 `set_value` 调用更改值时被调用。要仅在用户与复选框交互时执行函数，您可以使用通用的 `on` 方法。

```python:line-numbers
from nicegui import ui

with ui.row():
    c1 = ui.checkbox(on_change=lambda e: ui.notify(str(e.value)))
    ui.button('设置值', on_click=lambda: c1.set_value(not c1.value))
with ui.row():
    c2 = ui.checkbox().on('click', lambda e: ui.notify(str(e.sender.value)))
    ui.button('设置值', on_click=lambda: c2.set_value(not c2.value))

ui.run()
```