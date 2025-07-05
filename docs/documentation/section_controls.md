# 控制元素

## 按钮 `Button`

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

```python
from nicegui import ui

ui.button('点我', on_click=lambda: ui.notify('你点了我'))

ui.run()
```

[查看更多...](./elements/button)

## 按钮组 `Button Group`

此元素基于 Quasar 的 [QBtnGroup](https://quasar.dev/vue-components/button-group) 组件。

::: tip 注意
您必须为按钮组和按钮使用相同的 `props` 设计。
:::

```python
from nicegui import ui

with ui.button_group():
    ui.button('一', on_click=lambda: ui.notify('你按下了按钮 1!'))
    ui.button('二', on_click=lambda: ui.notify('你按下了按钮 2!'))
    ui.button('三', on_click=lambda: ui.notify('你按下了按钮 3!'))

ui.run()
```

[查看更多...](./elements/button_group)

## 下拉按钮 `Dropdown Button`

此元素基于 Quasar 的 [QBtnDropDown](https://quasar.dev/vue-components/button-dropdown) 组件。

color 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。 如果使用 Quasar 颜色，按钮将根据 Quasar 主题进行样式设置，包括文本颜色。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 按钮的标签       |
| value      | 下拉菜单是否被打开（默认值：`False`） |
| on_value_change | 在下拉菜单被打开或关闭时的回调函数 |
| on_click   | 按钮被点击时的回调函数 |
| color      | 按钮颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |

```python
from nicegui import ui

with ui.dropdown_button('打开我!', auto_close=True):
    ui.item('项目 1', on_click=lambda: ui.notify('You clicked 项目 1'))
    ui.item('项目 2', on_click=lambda: ui.notify('You clicked 项目 2'))

ui.run()
```

[查看更多...](./elements/button_dropdown)

## 标签 `Badge`

基于 Quasar 的 [QBadge](https://quasar.dev/vue-components/badge) 构建的组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本框的初始值   |
| color      | 按钮颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |
| text_color      | 文本颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |
| outline   | 使用外框设计（默认值：`False`） |

```python
from nicegui import ui

with ui.button('Click me!', on_click=lambda: badge.set_text(int(badge.text) + 1)):
    badge = ui.badge('0', color='red').props('floating')

ui.run()
```

[查看更多...](./elements/badge)