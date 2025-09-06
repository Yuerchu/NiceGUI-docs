# 滑块 Slider

此元素基于 Quasar 的 [QSlider](https://quasar.dev/vue-components/slider) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| min        | 滑块的最小值     |
| max        | 滑块的最大值     |
| step       | 滑块的步进       |
| value      | 滑块的初始值     |
| on_change  | 当滑块的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

slider = ui.slider(min=0, max=100, value=50)
ui.label().bind_text_from(slider, 'value')

ui.run()
```