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

## 使用前导和尾随选项节流事件

默认情况下，滑块的值更改事件会被节流到 0.05 秒。这意味着如果您快速移动滑块，值只会每 0.05 秒更新一次。

默认情况下，"前导"和"尾随"事件都会被激活。这意味着第一个事件会立即触发，最后一个事件会在节流时间后触发。

此演示显示了禁用这些选项中的任何一个如何改变行为。为了更清楚地看到效果，节流时间设置为 1 秒。第一个滑块显示默认行为，第二个仅发送前导事件，第三个仅发送尾随事件。

```python:line-numbers
from nicegui import ui

ui.label('默认')
ui.slider(min=0, max=10, step=0.1, value=5).props('label-always') \
    .on('update:model-value', lambda e: ui.notify(e.args),
        throttle=1.0)

ui.label('仅前导事件')
ui.slider(min=0, max=10, step=0.1, value=5).props('label-always') \
    .on('update:model-value', lambda e: ui.notify(e.args),
        throttle=1.0, trailing_events=False)

ui.label('仅尾随事件')
ui.slider(min=0, max=10, step=0.1, value=5).props('label-always') \
    .on('update:model-value', lambda e: ui.notify(e.args),
        throttle=1.0, leading_events=False)

ui.run()
```

## 禁用滑块

您可以使用 `disable()` 方法禁用滑块。这将阻止用户移动滑块。滑块也会变灰。

```python:line-numbers
from nicegui import ui

slider = ui.slider(min=0, max=100, value=50)
ui.button('禁用滑块', on_click=slider.disable)
ui.button('启用滑块', on_click=slider.enable)

ui.run()
```