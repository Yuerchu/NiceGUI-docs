# 时间选择器 Time Input

此元素基于 Quasar 的 [QTime](https://quasar.dev/vue-components/time) 组件。时间是以 `mask` 参数定义的格式字符串。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始时间         |
| mask       | 时间的格式 (默认值: `'HH:mm'`) |
| on_change  | 当选择了一个时间执行的回调函数 |

```python:line-numbers
from nicegui import ui

ui.time(value='12:00', on_change=lambda e: result.set_text(e.value))
result = ui.label()

ui.run()
```

## 带时间选择器的输入框

此演示展示了如何使用输入框实现时间选择器。我们在输入框的附加插槽中放置一个图标。当图标被点击时，我们打开一个带有时间选择器的菜单。[QMenu](https://quasar.dev/vue-components/menu) 的 "no-parent-event" 属性用于防止点击输入框时打开菜单。由于菜单默认不带"关闭"按钮，我们为方便起见添加了一个。

时间绑定到输入框的值。因此，无论何时更改时间，输入框和时间选择器都将保持同步。

```python:line-numbers
from nicegui import ui

with ui.input('时间') as time:
    with ui.menu().props('no-parent-event') as menu:
        with ui.time().bind_value(time):
            with ui.row().classes('justify-end'):
                ui.button('关闭', on_click=menu.close).props('flat')
    with time.add_slot('append'):
        ui.icon('access_time').on('click', menu.open).classes('cursor-pointer')

ui.run()
```
