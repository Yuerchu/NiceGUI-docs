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

## 自定义标签

您可以通过单独设置或整体设置来自定义范围及其标签的颜色。

```python:line-numbers
from nicegui import ui

ui.label('为整个范围着色')
ui.range(min=0, max=100, value={'min': 20, 'max': 80}) \
    .props('label snap color="secondary"')

ui.label('自定义标签颜色')
ui.range(min=0, max=100, value={'min': 40, 'max': 80}) \
    .props('label-always snap label-color="secondary" right-label-text-color="black"')

ui.run()
```

## 改变范围限制

此演示展示了如何通过点击按钮来改变限制值。

```python:line-numbers
from nicegui import ui

def increase_limits():
    r.min -= 10
    r.max += 10

ui.button('增加限制', on_click=increase_limits)
r = ui.range(min=0, max=100, value={'min': 30, 'max': 70}).props('label-always')

ui.run()
```