# 范围选择器 Range

此元素基于 Quasar 的 [QRange](https://quasar.dev/vue-components/range) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| min        | 选择器的最小值   |
| max        | 选择器的最大值   |
| step       | 选择器的步进     |
| value      | 选择器的初始值   |
| on_change  | 当选择器的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

min_max_range = ui.range(min=0, max=100, value={'min': 20, 'max': 80})
ui.label().bind_text_from(min_max_range, 'value',
                          backward=lambda v: f'min: {v["min"]}, max: {v["max"]}')

ui.run()
```