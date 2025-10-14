# 评分组件 Rating <Badge type="tip" text="^2.12.0" />

此元素基于 Quasar 的 [QRating](https://quasar.dev/vue-components/rating) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始值 (默认值: `None`) |
| max        | 最大分值 (默认值: `5`) |
| icon       | 分值图标的名称 (默认值: `"star"`) |
| icon_selected | 选中的值的图标 (默认跟随 `icon`) |
| icon_half  | 当选中半分的时候的图标 (默认跟随 `icon`) |
| color      | 图标的颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| size       | CSS单元尺寸，包括单位名称或标准尺寸名称 `xs/sm/md/lg/xl`，例如 `16px` 和 `2rem` |
| on_change  | 当评分的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

ui.rating(value=4)

ui.run()
```

## 自定义图标

您可以自定义图标的名称和大小。可选地，未选中、选中或半选中的值可以使用不同的图标。

```python:line-numbers
from nicegui import ui

ui.rating(
    value=3.5,
    size='lg',
    icon='sentiment_dissatisfied',
    icon_selected='sentiment_satisfied',
    icon_half='sentiment_neutral',
)
ui.rating(
    value=3.5,
    size='lg',
    icon='star',
    icon_selected='star',
    icon_half='star_half',
)

ui.run()
```

## 自定义颜色

您可以通过提供单一颜色或一系列不同颜色来自定义评分的颜色。

```python:line-numbers
from nicegui import ui

ui.rating(value=3, color='red-10')
ui.rating(value=5, color=['green-2', 'green-4', 'green-6', 'green-8', 'green-10'])

ui.run()
```

## 最大评分

此演示展示了如何更改最大可能评分，以及将值绑定到滑块。

```python:line-numbers
from nicegui import ui

slider = ui.slider(value=5, min=0, max=10)
ui.rating(max=10, icon='circle').bind_value(slider)

ui.run()
```