# 时间输入框 `Time Input` <Badge type="tip" text="^3.3.0" />

此元素扩展了 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，增加了一个时间选择器。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 时间输入框的显示标签 |
| placeholder | 未选择时间时显示的提示文本 |
| value      | 当前时间值 |
| on_change  | 值变化时触发的回调函数 |

```python:line-numbers
from nicegui import ui

time = ui.time_input('时间', value='12:30')
ui.label().bind_text_from(time, 'value', lambda v: f'时间: {v}')

ui.run()
```
