# 通用元素

这个类是所有其他UI元素的基类，但是您可以使用它来创建带有任意HTML标记的元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| tag        | 元素的 HTML 标签 |
| _client    | 此元素的客户端(仅供内部测试) |

```python:line-numbers
from nicegui import ui

with ui.element('div').classes('p-2 bg-blue-100'):
    ui.label('inside a colored div')

ui.run()
```

### 注册事件钩子

事件处理器可以是 Python 函数、JavaScript 函数或两者的组合：

若需在服务端处理事件并接收所有（可序列化的）事件参数，请使用 Python 处理器。

若需在客户端处理事件且不向服务端发送任何数据，请使用带有 JavaScript 函数的 js_handler 来处理事件。

若需在服务端处理事件参数的部分子集或转换后的版本，请使用带有 JavaScript 函数的 js_handler通过 `emit()` 发送转换后的参数，同时在服务端使用 Python 处理器处理这些参数。

js_handler 也可选择性地向服务端发送参数，此时 Python 处理器不会总是被调用。

- 可同时指定两种处理器<Badge type="tip" text="^2.18.0" />

```python:line-numbers
from nicegui import ui

ui.button('Python handler') \
    .on('click',
        lambda e: ui.notify(f'click: ({e.args["clientX"]}, {e.args["clientY"]})'))

ui.button('JavaScript handler') \
    .on('click',
        js_handler='(e) => alert(`click: (${e.clientX}, ${e.clientY})`)')

ui.button('Combination') \
    .on('click',
        lambda e: ui.notify(f'click: {e.args}'),
        js_handler='(e) => emit(e.clientX, e.clientY)')

ui.run()
```

### 移动元素

此演示展示了如何在不同的容器中移动元素。

```python:line-numbers
from nicegui import ui

with ui.card() as a:
    ui.label('A')
    x = ui.label('X')

with ui.card() as b:
    ui.label('B')

ui.button('Move X to A', on_click=lambda: x.move(a))
ui.button('Move X to B', on_click=lambda: x.move(b))
ui.button('Move X to top', on_click=lambda: x.move(target_index=0))

ui.run()
```

### 将元素移动到插槽中

此演示展示了元素如何在容器和插槽中移动。

```python:line-numbers
from nicegui import ui

with ui.card() as card:
    name = ui.input('Name', value='Paul')
    name.add_slot('append')
    icon = ui.icon('face')

ui.button('Move into input', on_click=lambda: icon.move(name, target_slot='append'))
ui.button('Move out of input', on_click=lambda: icon.move(card))

ui.run()
```

### 默认参数

你可以为元素设置一些默认的 `classes`, `styles` 以及 `props`，它们可以避免大量重复使用同一个参数去改变一个元素。

只有在使用了此方法后创建的元素才能应用这些参数，否则将会保持原状。

```python:line-numbers
from nicegui import ui

ui.label.default_classes('bg-blue-100 p-2')
ui.label('Label A')
ui.label('Label B')

ui.label.default_style('color: tomato')
ui.label('Label A')
ui.label('Label B')


ui.button.default_props('rounded outline')
ui.button('Button A')
ui.button('Button B')

ui.run()
```