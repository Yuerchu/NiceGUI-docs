---
title: 绑定属性
prev:
  text: '数据元素'
  link: '/documentation/section_data_elements'
next:
  text: '页面布局'
  link: '/documentation/section_page_layout'
---

# 绑定属性

## 绑定
NiceGUI 能够直接将 UI 元素与模型绑定。这种绑定适用于 UI 元素的属性，如文本 `text`、值 `value` 或可见性 `visiable` ，也适用于作为（嵌套）类属性的模型属性。每个元素都提供了诸如 `bind_value` 和 `bind_visibility` 等方法，用于与相应属性建立双向绑定。若要定义单向绑定，可使用这些方法的 `_from` 和 `_to` 变体。只需将模型的某个属性作为参数传递给这些方法即可创建绑定。绑定后，数值会立即更新，并在任一属性发生变化时同步更新。

```python{9-12}:line-numbers
from nicegui import ui

class Demo:
    def __init__(self):
        self.number = 1

demo = Demo()
v = ui.checkbox('visible', value=True)
with ui.column().bind_visibility_from(v, 'value'):
    ui.slider(min=1, max=3).bind_value(demo, 'number')
    ui.toggle({1: 'A', 2: 'B', 3: 'C'}).bind_value(demo, 'number')
    ui.number().bind_value(demo, 'number')

ui.run()
```

## 转换函数

您可以使用正向和反向转换函数在值从一个对象传播到另一个对象时进行转换。每当源属性发生变化时，或者——在活动链接的情况下（见下文）——每当检查源属性是否有变化时，这些函数就会被调用。

::: warning 注意
NiceGUI 2.16.0 通过严格遵循深度优先搜索方法，提高了绑定传播的效率，每个受影响的节点仅更新一次，转换函数也仅执行一次。如果您是从 NiceGUI 2.15.0 或更早版本迁移过来的，可能会遇到转换函数的额外运行，尤其是那些与当前传播方向相反的转换函数，这些在 NiceGUI 2.16.0 中不再运行。因此，您需要相应地调整代码。
:::

我们还想提到的是，为了在不同版本间获得最稳定的行为，最佳实践是让转换函数没有副作用，仅执行基本的转换操作。这样，无论 NiceGUI 以何种顺序调用它们或调用多少次，都不会产生影响。

```python{5}:line-numbers
from nicegui import ui

i = ui.input(value='Lorem ipsum')
ui.label().bind_text_from(i, 'value',
                          backward=lambda text: f'{len(text)} characters')

ui.run()
```

## 绑定到字典

这里我们将标签的文本绑定到一个字典上。

```python:line-numbers
from nicegui import ui

data = {'name': 'Bob', 'age': 17}

ui.label().bind_text_from(data, 'name', backward=lambda n: f'Name: {n}')
ui.label().bind_text_from(data, 'age', backward=lambda a: f'Age: {a}')

ui.button('Turn 18', on_click=lambda: data.update(age=18))

ui.run()
```

## 绑定到变量

这里我们将日期选择器的值绑定到一个裸变量上。为此，我们使用了包含所有全局变量的字典 `globals()`。本演示基于 [官方日期选择器示例](https://nicegui.io/documentation/date#input_element_with_date_picker)。

```python:line-numbers
from nicegui import ui

date = '2023-01-01'

with ui.input('Date').bind_value(globals(), 'date') as date_input:
    with ui.menu() as menu:
        ui.date(on_change=lambda: ui.notify(f'Date: {date}')).bind_value(date_input)
    with date_input.add_slot('append'):
        ui.icon('edit_calendar').on('click', menu.open).classes('cursor-pointer')

ui.run()
```

## 绑定到存储

我们还可以把东西绑定到 [app.storage]() 上。我们在此存储了文本区域在多次访问之间的值。该笔记还会在同一用户的所有标签页之间共享。

```python:line-numbers
from nicegui import app, ui

@ui.page('/')
def index():
    ui.textarea('This note is kept between visits')
        .classes('w-full').bind_value(app.storage.user, 'note')

ui.run()
```

## 实现最佳性能的可绑定属性

绑定分为两种类型：

1. "可绑定属性"能自动检测写入操作并触发值传播。NiceGUI 大多数元素都使用这类属性，例如 `ui.input` 中的 `value` 或 `ui.label` 中的 `text`。基本上所有带有 `bind()` 方法的属性都支持这种绑定方式。
2. 其他绑定有时被称为"主动链接"。当您将标签文本绑定到字典条目或自定义数据模型的属性时，NiceGUI 的绑定模块必须主动检查值是否变化。这是通过每 0.1 秒运行一次的 `refresh_loop()` 实现的，该间隔可通过 `ui.run()` 中的 `binding_refresh_interval` 配置。

"可绑定属性"非常高效，只要值不改变就不会产生任何开销。但"主动链接"需要每秒检查所有绑定值10次。这在绑定到列表或字典等复杂对象时尤其耗费资源。

由于确保主线程不被长时间阻塞至关重要，当 `refresh_loop()` 的某一步骤耗时过长时，我们会显示警告。您可以通过默认值为 0.01 秒的 `binding.MAX_PROPAGATION_TIME` 配置阈值。但这类警告通常是性能或内存问题的有效指标——如果 CPU 长时间忙于更新绑定，主线程将无法处理其他操作，导致UI"冻结"。

以下示例演示了如何为首个示例中的 Demo 类定义和使用可绑定属性。number 属性现在作为 `BindableProperty`，使得NiceGUI能立即检测写入操作并触发值传播。

```python:line-numbers
from nicegui import binding, ui

class Demo:
    number = binding.BindableProperty()

    def __init__(self):
        self.number = 1

demo = Demo()
ui.slider(min=1, max=3).bind_value(demo, 'number')
ui.toggle({1: 'A', 2: 'B', 3: 'C'}).bind_value(demo, 'number')
ui.number(min=1, max=3).bind_value(demo, 'number')

ui.run()
```

## 可绑定的数据类 <Badge type="tip" text="^2.11.0" />

`bindable_dataclass` 装饰器提供了一种便捷方式来创建具有可绑定属性的类。它扩展了Python标准 `dataclasses.dataclass` 装饰器的功能，通过自动使所有数据类字段可绑定。这消除了手动将每个字段声明为 `BindableProperty` 的需求，同时保留了常规数据类的所有优势。

```python:line-numbers{3}
from nicegui import binding, ui

@binding.bindable_dataclass
class Demo:
    number: int = 1

demo = Demo()
ui.slider(min=1, max=3).bind_value(demo, 'number')
ui.toggle({1: 'A', 2: 'B', 3: 'C'}).bind_value(demo, 'number')
ui.number(min=1, max=3).bind_value(demo, 'number')

ui.run()
```