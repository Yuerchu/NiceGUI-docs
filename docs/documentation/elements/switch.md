# 开关 Switch

基于 Quasar 的 [QToggle](https://quasar.dev/vue-components/toggle) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在开关边上的文字 |
| value      | 是否默认被打开 (默认值: `False`) |
| on_change  | 当开启状态改变时的回调函数 |

```python:line-numbers
from nicegui import ui

switch = ui.switch('打开我')
ui.label('已打开！').bind_visibility_from(switch, 'value')

ui.run()
```

## 处理用户交互

通过参数传递的 `on_change` 函数会在开关被点击*以及*通过 `set_value` 调用更改值时被调用。要仅在用户与开关交互时执行函数，您可以使用通用的 `on` 方法。

```python:line-numbers
from nicegui import ui

with ui.row():
    s1 = ui.switch(on_change=lambda e: ui.notify(str(e.value)))
    ui.button('设置值', on_click=lambda: s1.set_value(not s1.value))
with ui.row():
    s2 = ui.switch().on('click', lambda e: ui.notify(str(e.sender.value)))
    ui.button('设置值', on_click=lambda: s2.set_value(not s2.value))

ui.run()
```