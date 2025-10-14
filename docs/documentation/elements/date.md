# 日期选择器 Date Input

此元素基于 Quasar 的 [QDate](https://quasar.dev/vue-components/date) 组件。日期是以 `mask` 参数定义的格式字符串。

您还可以使用 `range` 或 `multiple` 属性来选择日期范围或多个日期。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始日期         |
| mask       | 日期的格式 (默认值: `'YYYY-MM-DD'`) |
| on_change  | 当选择了一个日期执行的回调函数 |

```python:line-numbers
from nicegui import ui

ui.date(value='2023-01-01', on_change=lambda e: result.set_text(e.value))
result = ui.label()

ui.run()
```

## 带日期选择器的输入框

此演示展示了如何使用输入框实现日期选择器。我们在输入框的附加插槽中放置一个图标。当图标被点击时，我们打开一个带有日期选择器的菜单。[QMenu](https://quasar.dev/vue-components/menu) 的 "no-parent-event" 属性用于防止点击输入框时打开菜单。由于菜单默认不带"关闭"按钮，我们为方便起见添加了一个。

日期绑定到输入框的值。因此，无论何时更改日期，输入框和日期选择器都将保持同步。

```python:line-numbers
from nicegui import ui

with ui.input('日期') as date:
    with ui.menu().props('no-parent-event') as menu:
        with ui.date().bind_value(date):
            with ui.row().classes('justify-end'):
                ui.button('关闭', on_click=menu.close).props('flat')
    with date.add_slot('append'):
        ui.icon('edit_calendar').on('click', menu.open).classes('cursor-pointer')

ui.run()
```

## 日期范围输入

您可以使用 "range" 属性选择日期范围。`value` 将是一个包含 "from" 和 "to" 键的字典。以下演示展示了如何将日期范围选择器绑定到输入框，使用 `forward` 和 `backward` 函数在日期选择器的字典和输入字符串之间进行转换。

```python:line-numbers
from nicegui import ui

date_input = ui.input('日期范围').classes('w-40')
ui.date().props('range').bind_value(
    date_input,
    forward=lambda x: f'{x["from"]} - {x["to"]}' if x else None,
    backward=lambda x: {
        'from': x.split(' - ')[0],
        'to': x.split(' - ')[1],
    } if ' - ' in (x or '') else None,
)

ui.run()
```

## 日期过滤

此演示展示了如何过滤日期选择器中的日期。为了将函数传递给日期选择器，我们使用 `:options` 属性。前导的 `:` 告诉 NiceGUI 该值是一个 JavaScript 表达式。

```python:line-numbers
from nicegui import ui

ui.date().props('''default-year-month=2023/01 :options="date => date <= '2023/01/15'"''')

ui.run()
```
