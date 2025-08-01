# 按钮 `Button`

此元素基于 Quasar 的 [QBtn](https://quasar.dev/vue-components/button) 组件。

color 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。 如果使用 Quasar 颜色，按钮将根据 Quasar 主题进行样式设置，包括文本颜色。

::: tip 注意
存在像 `red` 这种同时属于 Quasar 颜色和 CSS 颜色的名称。
此类情况下将优先使用 Quasar 颜色。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 按钮的标签       |
| on_click   | 按钮被点击时的回调函数 |
| color      | 按钮颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |
| icon| 显示在按钮上的图标名称 (默认值: `None`) |

```python:line-numbers
from nicegui import ui

ui.button('点我', on_click=lambda: ui.notify('您点了我'))

ui.run()
```