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