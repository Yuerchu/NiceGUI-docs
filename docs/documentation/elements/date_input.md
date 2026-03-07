# 日期输入框 `Date Input` <Badge type="tip" text="^3.3.0" />

此元素扩展了 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，增加了一个日期选择器。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 日期输入框的显示标签 |
| range_input | 若为 `True`，允许选择日期范围（值将为格式化为 `'起始日期 - 结束日期'` 的字符串） |
| placeholder | 未选择日期时显示的提示文本 |
| value      | 当前日期值 |
| on_change  | 值变化时触发的回调函数 |

```python:line-numbers
from nicegui import ui

date = ui.date_input('日期', value='2025-05-31')
ui.label().bind_text_from(date, 'value', lambda v: f'日期: {v}')

ui.run()
```

### 日期范围输入

此演示展示了如何使用日期输入框进行范围选择。

由于输入框期望字符串类型的值，因此值被格式化为 `'起始日期 - 结束日期'` 的字符串。

```python:line-numbers
from nicegui import ui

date = ui.date_input('范围', value='2025-05-01 - 2025-05-31', range_input=True)
date.classes('w-60')
ui.label().bind_text_from(date, 'value', lambda v: f'范围: {v}')

ui.run()
```

### 带日期过滤的日期输入

此演示展示了如何通过自定义 `.picker`（底层的 `ui.date` 元素）来为日期输入框添加日期过滤。

有关日期过滤的更多信息，请参阅 [`ui.date` 文档](date)。

```python:line-numbers
from nicegui import ui

date = ui.date_input('日期', value='2025-11-15')
date.picker.props[':options'] = 'date => date >= "2025/11/10"'
ui.label().bind_text_from(date, 'value', lambda v: f'日期: {v}')

ui.run()
```
