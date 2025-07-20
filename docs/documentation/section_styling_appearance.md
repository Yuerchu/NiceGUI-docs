# 造型与外观

## 样式设计 Styling

NiceGUI 基于 [Quasar 框架](https://quasar.dev/)构建，并且完美地继承其设计能力。每个 NiceGUI 元素都提供了这些用法：

- **`props`**: 该方法中的内容会传递给 [Quasar 组件](https://justpy.io/quasar_tutorial/introduction/#props-of-quasar-components)，具体请参考 [Quasar 文档](https://quasar.dev/vue-components/button#design)。
- **`classes`**: 该方法中的内容将会被传递给 [Tailwind CSS](https://v3.tailwindcss.com/)，以实现响应式的不同的布局。
- **`style`**: 该方法可以让您直接使用 CSS。但您需注意，**此时分隔符为分号而非空格**。

这三类方法均支持 `remove` 和 `replace` 参数，以便在特定场景下覆盖预定义的样式效果。

```python:line-numbers
from nicegui import ui

ui.radio(['x', 'y', 'z'], value='x').props('inline color=green')
ui.button(icon='touch_app').props('outline round').classes('shadow-lg')
ui.label('Stylish!').style('color: #6E93D6; font-size: 200%; font-weight: 300')

ui.run()
```

## Tailwind CSS

[Tailwind CSS](https://v3.tailwindcss.com/) 是一个用于快速构建自定义用户界面的 CSS 框架。NiceGUI 提供了一个流畅且支持自动补全的接口，用于向 UI 元素添加 Tailwind 类。

您可以通过浏览 tailwind 属性的方法来发现可用的类。构建器模式允许您将多个类链接在一起（如“标签 A”所示）。您还可以通过传递类列表来调用 tailwind 属性（如“标签 B”所示）。

尽管这与使用 classes 方法非常相似，但由于自动补全功能，它在处理 Tailwind 类时更为便捷。

最后同样重要的是，您还可以预定义样式并将其应用于多个元素（标签 C 和 D）。

请注意，有时 Tailwind 会被 Quasar 样式覆盖，例如在使用 `ui.button('Button').tailwind('bg-red-500')` 时。这是一个已知的限制，不完全在我们的控制范围内。但我们尝试提供解决方案，比如颜色参数：`ui.button('Button', color='red-500')`。

```python:line-numbers
from nicegui import Tailwind, ui

ui.label('Label A').tailwind.font_weight('extrabold').text_color('blue-600').background_color('orange-200')
ui.label('Label B').tailwind('drop-shadow', 'font-bold', 'text-green-600')

red_style = Tailwind().text_color('red-600').font_weight('bold')
label_c = ui.label('Label C')
red_style.apply(label_c)
ui.label('Label D').tailwind(red_style)

ui.run()
```

## Tailwind CSS 布局

## 元素过滤 ElementFilter

## Query Selector

## 预定义主题 Color Theming

## CSS Variables

## 覆写 Tailwind 的默认样式

## 深色模式 Dark mode

## 添加 CSS 样式定义到页面 <Badge type="tip" text="^2.0.0" />

## 使用其他基于 Vue 框架的 UI <Badge type="tip" text="^2.21.0" />