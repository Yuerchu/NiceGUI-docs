---
title: 数据元素
prev:
  text: '视听元素'
  link: '/documentation/section_audiovisual_elements'
next:
  text: '绑定属性'
  link: '/documentation/section_binding_properties'
---


# 数据元素

## 表格 Table

此元素基于 Quasar 的 [QTable](https://quasar.dev/vue-components/table) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| rows | 行对象列表 |
| columns | 列对象列表（自2.0.0版本起默认为第一行的列） |
| column_defaults | 可选的默认列属性 <Badge type="tip" text="^2.0.0" /> |
| row_key | 包含行唯一标识数据的列名（默认值: `"id"`） |
| title | 表格标题 |
| selection | 选择类型（"single"或"multiple"；默认值: `None`） |
| pagination | 分页对象字典或每页行数（`None`隐藏分页，0表示"无限"；默认值: `None`） |
| on_select | 当选择发生变化时触发的回调函数 |
| on_pagination_change | 当分页发生变化时触发的回调函数 |

如果选择模式为 `'single'` 或 `'multiple'`，则可通过 `selected` 属性访问已选中的行。

```python:line-numbers
from nicegui import ui

columns = [
    {'name': 'name', 'label': 'Name', 'field': 'name', 'required': True, 'align': 'left'},
    {'name': 'age', 'label': 'Age', 'field': 'age', 'sortable': True},
]
rows = [
    {'name': 'Alice', 'age': 18},
    {'name': 'Bob', 'age': 21},
    {'name': 'Carol'},
]
ui.table(columns=columns, rows=rows, row_key='name')

ui.run()
```

## 数据网格 AG Grid

一个用于创建数据网格的元素，它基于 [AG Grid](https://www.ag-grid.com/)。

方法 `run_grid_method` 和 `run_row_method` 可用于与客户端上的AG Grid实例进行交互。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options | AG Grid 配置选项字典 |
| html_columns | 需要渲染为HTML的列列表（默认值: `[]`） |
| theme | AG Grid主题样式（默认值: `"balham"`） |
| auto_size_columns | 是否自动调整列宽以适应网格宽度（默认值: `None`，即列未使用 `flex` 时自动适应网格宽度） |

```python:line-numbers
from nicegui import ui

grid = ui.aggrid({
    'defaultColDef': {'flex': 1},
    'columnDefs': [
        {'headerName': 'Name', 'field': 'name'},
        {'headerName': 'Age', 'field': 'age'},
        {'headerName': 'Parent', 'field': 'parent', 'hide': True},
    ],
    'rowData': [
        {'name': 'Alice', 'age': 18, 'parent': 'David'},
        {'name': 'Bob', 'age': 21, 'parent': 'Eve'},
        {'name': 'Carol', 'age': 42, 'parent': 'Frank'},
    ],
    'rowSelection': 'multiple',
}).classes('max-h-40')

def update():
    grid.options['rowData'][0]['age'] += 1
    grid.update()

ui.button('Update', on_click=update)
ui.button('Select all', on_click=lambda: grid.run_grid_method('selectAll'))
ui.button('Show parent', on_click=lambda: grid.run_grid_method('setColumnsVisible', ['parent'], True))

ui.run()
```

### 添加行时保留客户端编辑 Adding rows without losing client-side edits

修改 `grid.options['rowData']` 会在客户端触发整个网格的重建，并丢弃所有正在进行的单元格编辑。

AG Grid 的 [transaction](https://www.ag-grid.com/javascript-data-grid/data-update-transactions/) 可以在不重建网格的情况下添加行，因此未保存的编辑会被保留。将对 `rowData` 的修改包裹在 `grid.props.suspend_updates()` 中，既能让服务端的列表保持同步，又不会触发重建。

试试看：开始编辑某个单元格，然后在不离开该单元格的情况下点击*添加行*——你的编辑会保持不变。

```python:line-numbers
from nicegui import ui

def add():
    row = {'Name': f'Row {len(grid.options["rowData"])}'}
    with grid.props.suspend_updates():
        grid.options['rowData'].append(row)
    grid.run_grid_method('applyTransaction', {'add': [row]})
    grid.run_grid_method('ensureIndexVisible', len(grid.options['rowData']) - 1)

grid = ui.aggrid({
    'columnDefs': [{'field': 'Name', 'editable': True}],
    'rowData': [],
    'stopEditingWhenCellsLoseFocus': True,
}).classes('h-52')
ui.button('添加行', on_click=add)

ui.run()
```

::: warning 注意
某些事件（例如 `rowClicked`）看起来无法正常工作。这是因为部分事件参数包含循环引用。对于这些看似无效的事件，你会在浏览器的开发者控制台中看到序列化错误。

要查看事件参数并找到你关心的值，可以把事件注册替换为以下 JavaScript 处理函数：

```python
.on('rowClicked', js_handler='console.log')
```

然后将事件参数限制为必要的部分（例如 `data`），从而排除循环引用：

```python
.on('rowClicked', lambda event: ui.notify(f'Row: {event.args}'), ['data'])
```

这样筛选后的参数可以被安全地序列化，事件也能正常工作。
:::

## Highcharts chart <Badge type="info" text="扩展包" />

一个用于通过 [Highcharts](https://www.highcharts.com/) 创建图表的元素。通过更改 options 属性可向图表推送更新。数据变更后，调用update方法以刷新图表。

由于 Highcharts 的严格许可限制，该元素不属于标准 NiceGUI 包的一部分。它被维护在[单独的代码库](https://github.com/zauberzeug/nicegui-highcharts/)中，可通过 `pip install nicegui[highcharts]` 安装。

默认情况下会创建 `Highcharts.chart`。若需改用如 `Highcharts.stockChart`，请将 `type` 属性设置为 `"stockChart"`。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options | Highcharts 配置选项字典 |
| type | 图表类型（如："chart", "stockChart", "mapChart"等；默认值: `"chart"`） |
| extras | 需要包含的额外依赖项列表（如："annotations", "arc-diagram", "solid-gauge"等） |
| on_point_click | 点击数据点时触发的回调函数 |
| on_point_drag_start | 开始拖拽数据点时触发的回调函数 |
| on_point_drag | 拖拽数据点时触发的回调函数 |
| on_point_drop | 释放拖拽的数据点时触发的回调函数 |

```python:line-numbers
from nicegui import ui
from random import random

chart = ui.highchart({
    'title': False,
    'chart': {'type': 'bar'},
    'xAxis': {'categories': ['A', 'B']},
    'series': [
        {'name': 'Alpha', 'data': [0.1, 0.2]},
        {'name': 'Beta', 'data': [0.3, 0.4]},
    ],
}).classes('w-full h-64')

def update():
    chart.options['series'][0]['data'][0] = random()
    chart.update()

ui.button('Update', on_click=update)

ui.run()
```

### 添加和移除数据系列 Adding and removing series

`options` 字典是图表的唯一数据源：当它发生变化时，数据系列和坐标轴会被相应地添加、更新和移除，使其始终与 options 保持一致。在客户端添加的状态（例如通过 JavaScript 添加的）不会在更新后保留。

动态添加和移除数据系列时，建议为每个数据系列指定明确的 `id`。否则数据系列会按位置进行匹配，诸如点击图例切换可见性之类的用户状态可能会被关联到错误的数据系列上。

::: warning 注意
当用户处于图表的下钻视图中时（`extras=['drilldown']`），来自服务端的更新会重置下钻视图。
:::

```python:line-numbers
from nicegui import ui
from random import random

chart = ui.highchart({
    'title': False,
    'series': [],
}).classes('w-full h-64')

def toggle(name: str, value: bool) -> None:
    series = chart.options['series']
    if value:
        series.append({'id': name, 'name': name, 'data': [random() for _ in range(5)]})
    else:
        series.remove(next(s for s in series if s['id'] == name))

with ui.row():
    ui.switch('Alpha', on_change=lambda e: toggle('Alpha', e.value))
    ui.switch('Beta', on_change=lambda e: toggle('Beta', e.value))

ui.run()
```

## Apache Echart

一个用于通过 [ECharts](https://echarts.apache.org/) 创建图表的元素。通过修改 `options` 属性可将更新推送至图表。数据变更后，调用 `.update()` 方法即可刷新图表。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options | EChart 配置选项字典 |
| on_click_point | 点击数据点时触发的回调函数 |
| enable_3d | 是否强制导入 echarts-gl 库 |
| renderer | 使用的渲染器（"canvas" 或 "svg"）<Badge type="tip" text="^2.7.0" /> |
| theme | EChart 主题配置（字典或返回 JSON 对象的 URL）<Badge type="tip" text="^2.15.0" /> |

```python:line-numbers
from nicegui import ui
from random import random

echart = ui.echart({
    'xAxis': {'type': 'value'},
    'yAxis': {'type': 'category', 'data': ['A', 'B'], 'inverse': True},
    'legend': {'textStyle': {'color': 'gray'}},
    'series': [
        {'type': 'bar', 'name': 'Alpha', 'data': [0.1, 0.2]},
        {'type': 'bar', 'name': 'Beta', 'data': [0.3, 0.4]},
    ],
})

def update():
    echart.options['series'][0]['data'][0] = random()
    echart.update()

ui.button('Update', on_click=update)

ui.run()
```

## Pyplot Context

创建一个上下文用来配置 [Matplotlib](https://matplotlib.org/) 图表。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| close | 是否在退出上下文后关闭图表；设为 `False` 以便后续更新（默认值: `True`） |
| kwargs | 传递给 [`pyplot.figure`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html) 的参数，如 `figsize` 等 |

```python:line-numbers
import numpy as np
from matplotlib import pyplot as plt
from nicegui import ui

with ui.pyplot(figsize=(3, 2)):
    x = np.linspace(0.0, 5.0)
    y = np.cos(2 * np.pi * x) * np.exp(-x)
    plt.plot(x, y, '-')

ui.run()
```

## Matplotlib

创建一个 [Matplotlib](https://matplotlib.org/) 元素以渲染 Matplotlib 图形。当退出图形上下文时，该图形会自动更新。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| kwargs | 传递给 [`pyplot.figure`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html) 的参数，如 `figsize` 等 |

```python:line-numbers
import numpy as np
from nicegui import ui

with ui.matplotlib(figsize=(3, 2)).figure as fig:
    x = np.linspace(0.0, 5.0)
    y = np.cos(2 * np.pi * x) * np.exp(-x)
    ax = fig.gca()
    ax.plot(x, y, '-')

ui.run()
```

## 实时折线图 Line Plot <Badge type="info" text="扩展包" />

使用 pyplot 创建一个折线图。`push` 方法与 `ui.timer` 结合使用时可实现实时更新。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| n          | 折线数量 |
| limit      | 每条折线的最大数据点数（新数据将替换最旧的数据，默认值: `100`） |
| update_every | 推送多次新数据后才更新图表，以节省 CPU 和带宽（默认值: `1`） |
| close      | 退出上下文后是否关闭图表；设为 `False` 可后续更新（默认值: `True`） |
| kwargs     | 传递给 [`pyplot.figure`](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html) 的参数，如 `figsize` 等 |

```python:line-numbers
import math
from datetime import datetime
from nicegui import ui

line_plot = ui.line_plot(n=2, limit=20, figsize=(3, 2), update_every=5) \
    .with_legend(['sin', 'cos'], loc='upper center', ncol=2)

def update_line_plot() -> None:
    now = datetime.now()
    x = now.timestamp()
    y1 = math.sin(x)
    y2 = math.cos(x)
    line_plot.push([now], [[y1], [y2]], y_limits=(-1.5, 1.5))

line_updates = ui.timer(0.1, update_line_plot, active=False)
ui.checkbox('active').bind_value(line_updates, 'active')

ui.run()
```

## Plotly 元素

渲染一个 Plotly 图表。有两种方式传递 Plotly 图形进行渲染，具体参见参数 `figure`：

- 传递一个 `go.Figure` 对象，详见 https://plotly.com/python/
- 传递一个包含 `data`、`layout`、`config（可选）`键的Python字典对象，详见 https://plotly.com/javascript/

为获得最佳性能，建议使用声明式字典方法创建 Plotly 图表。

```python:line-numbers
import plotly.graph_objects as go
from nicegui import ui

fig = go.Figure(go.Scatter(x=[1, 2, 3, 4], y=[1, 2, 3, 2.5]))
fig.update_layout(margin=dict(l=0, r=0, t=0, b=0))
ui.plotly(fig).classes('w-full h-40')

ui.run()
```

### 追加轨迹数据而无需重发整个图形 Extending traces without re-sending the full figure

调用 `plot.update()` 会把整个图形重新传输到客户端。对于实时数据，[`Plotly.extendTraces`](https://plotly.com/javascript/plotlyjs-function-reference/#plotlyextendtraces) 能以极小的流量向已有轨迹追加数据点。使用 `plot.run_plot_method('extendTraces', ...)` 直接调用它，同时在服务端修改 `figure['data']`，这样下一次 `plot.update()` 就能反映完整的状态。注意这里使用的是字典形式的图形（而不是 `go.Figure`），这样轨迹的 `x` 和 `y` 仍是可以追加的可变列表。*3.13.0 版本新增。*

```python:line-numbers
from random import random
from nicegui import ui

fig = {
    'data': [{'type': 'scatter', 'x': [], 'y': []}],
    'layout': {'margin': {'l': 30, 'r': 0, 't': 0, 'b': 30}},
}
plot = ui.plotly(fig).classes('w-full h-40')

def add_point():
    t = len(fig['data'][0]['x'])
    y = random()
    fig['data'][0]['x'].append(t)
    fig['data'][0]['y'].append(y)
    plot.run_plot_method('extendTraces', {'x': [[t]], 'y': [[y]]}, [0])

ui.button('添加数据点', on_click=add_point)

ui.run()
```

### 大型数据集 Large datasets

绘制大量数据点时，请将 NumPy 数组（或 pandas Series）直接传给 Plotly，而不是 Python 列表，并避免用 `.tolist()` 把它们转换回列表。对于 NumPy 数组，Plotly 会使用紧凑的二进制编码（base64 编码的类型化数组），使载荷大小大约减半——需要传输、解析和保存在内存中的数据大幅减少——这正是在大规模更新时避免界面卡死的关键。此功能需要 Plotly 6.0 或更高版本，这些版本默认使用二进制编码。

```python:line-numbers
import numpy as np
import plotly.graph_objects as go
from nicegui import ui

x = np.linspace(0, 10, 100_000)
y = np.sin(x) + np.random.normal(0, 0.1, x.size)
fig = go.Figure(go.Scattergl(x=x, y=y, mode='markers', marker=dict(size=2)))
fig.update_layout(margin=dict(l=0, r=0, t=0, b=0))
ui.plotly(fig).classes('w-full h-40')

ui.run()
```

## Altair 图表 <Badge type="tip" text="^3.5.0" /> <Badge type="info" text="扩展包" />

通过 anywidget 在 NiceGUI 中封装 [Altair](https://altair-viz.github.io/) 图表。

有关同步 Altair 参数与 Python 的更多信息，请参阅 [Altair 文档](https://altair-viz.github.io/user_guide/interactions/jupyter_chart.html#accessing-variable-params)。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| chart      | 要封装的图表 |
| throttle   | Python 接收 widget 更新的最小间隔时间（秒）（默认值: `0.0`） |

```python:line-numbers
import altair as alt
from altair.datasets import data
from nicegui import ui

cars = data.cars()

chart = alt.Chart(cars).mark_point() \
    .encode(x='Horsepower', y='Miles_per_Gallon', color='Origin') \
    .interactive()

ui.altair(chart)

ui.run()
```

### 交互式图表

Altair 图表可以通过添加参数实现交互。此演示展示了如何添加一个滑块来控制数据点的颜色。

```python:line-numbers
import altair as alt
import numpy as np
import pandas as pd
from nicegui import ui

df = pd.DataFrame({'x': range(100), 'y': np.random.randn(100).cumsum()})

slider = alt.binding_range(min=0, max=100, step=1)
cutoff = alt.param(name='cutoff', bind=slider, value=50)
color = alt.condition(alt.datum.x < cutoff, alt.value('red'), alt.value('blue'))

chart = alt.Chart(df).mark_point() \
    .encode(x='x', y='y', color=color) \
    .add_params(cutoff)

ui.altair(chart)

ui.run()
```

## AnyWidget <Badge type="tip" text="^3.5.0" /> <Badge type="info" text="扩展包" />

[anywidget](https://anywidget.dev/en/getting-started/) 是一个允许你以跨前端兼容的方式嵌入任意 JavaScript 小部件的库。

在 [anywidget gallery](https://try.anywidget.dev/) 中有许多公开可用的 anywidget 小部件示例，包括 [altair.JupyterChart](https://altair-viz.github.io/user_guide/interactions/jupyter_chart.html) 和 [quak](https://github.com/manzt/quak)。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| widget     | 要封装的 `anywidget.AnyWidget` |
| throttle   | Python 接收 widget 更新的最小间隔时间（秒）（默认值: `0.0`） |

```python:line-numbers
import anywidget
import traitlets
from nicegui import ui

class CounterWidget(anywidget.AnyWidget):
    _esm = '''
        function render({ model, el }) {
            const button = document.createElement("button");
            button.innerHTML = `Count is ${model.get("value")}`;
            button.addEventListener("click", () => {
                model.set("value", model.get("value") + 1);
                model.save_changes();
            });
            model.on("change:value", () => {
                button.innerHTML = `Count is ${model.get("value")}`;
            });
            el.classList.add("counter-widget");
            el.appendChild(button);
        }
        export default { render };
    '''
    _css = '''
        .counter-widget button {
            color: white;
            background-color: DarkOrange;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }
    '''
    value = traitlets.Int(0).tag(sync=True)

    def increment(self) -> None:
        self.value += 1

counter = CounterWidget(value=42)
ui.anywidget(counter)

ui.label('↑ AnyWidget')
ui.separator()
ui.label('↓ NiceGUI')

ui.button(on_click=counter.increment) \
    .bind_text_from(counter, 'value', backward=lambda c: f'Count is {c}')

ui.run()
```

### 使用 AnyWidget 集成 Altair 图表

你可以使用 `ui.anywidget` 将现有的 AnyWidget 小部件集成到 NiceGUI 中。此演示展示了如何集成 Altair 图表。

```python:line-numbers
import altair as alt
import numpy as np
import pandas as pd
from nicegui import ui

df = pd.DataFrame(np.random.random((60, 3)), columns=['x', 'y', 'size'])

chart = alt.Chart(df).mark_circle() \
    .encode(x='x', y='y', size='size', color='size', tooltip=['x', 'y', 'size'])

jchart = alt.JupyterChart(chart)

ui.anywidget(jchart)

ui.run()
```

## 线性进度条 Linear Progress

此组件基于 Quasar 的 [QLinearProgress](https://quasar.dev/vue-components/linear-progress) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value | 字段初始值（0.0到1.0之间） |
| size | 进度条高度（带数值标签时默认值: `"20px"`，不带时默认值: `"4px"`） |
| show_value | 是否在中心显示数值标签（默认值: `True`） |
| color | 颜色（可以是Quasar、Tailwind或CSS颜色值，或设为None，默认值: `"primary"`） |

```python:line-numbers
from nicegui import ui

slider = ui.slider(min=0, max=1, step=0.01, value=0.5)
ui.linear_progress().bind_value_from(slider, 'value')

ui.run()
```

## 环形进度条 Circular Progress

此组件基于 Quasar 的 [QCircularProgress](https://quasar.dev/vue-components/circular-progress) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value | 字段初始值 |
| min | 最小值（默认值: `0.0`） |
| max | 最大值（默认值: `1.0`） |
| size | 圆形进度条尺寸（默认值: `"xl"`） |
| show_value | 是否在中心显示数值标签（默认值: `True`） |
| color      | 颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |

```python:line-numbers
from nicegui import ui

slider = ui.slider(min=0, max=1, step=0.01, value=0.5)
ui.circular_progress().bind_value_from(slider, 'value')

ui.run()
```

## 无精确进度的进度条 Spinner

此组件基于 Quasar 的 [QSpinner](https://quasar.dev/vue-components/spinners) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| type | 加载动画类型（如："audio"、"ball"、"bars"等，默认值: `"default"`） |
| size | 加载动画尺寸（如："3em"、"10px"、"xl"等，默认值: `"1em"`） |
| color      | 颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| thickness | 加载动画线条粗细（仅适用于"default"类型，默认值: `5.0`） |

## 3D 图形 3D Scene

使用 [three.js](https://threejs.org/) 展示 3D 场景。当前 NiceGUI 支持立方体、球体、圆柱体/圆锥体、拉伸体、直线、曲线及带纹理的网格。对象可进行平移、旋转，并以不同颜色、透明度或线框模式显示，还能通过分组实现联动运动。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| width | 画布宽度 |
| height | 画布高度 |
| grid | 是否显示网格（布尔值或 [Three.js GridHelper](https://threejs.org/docs/#api/en/helpers/GridHelper) 的尺寸和分割数元组，默认值: 100x100） |
| camera | 相机定义，可以是 `ui.scene.perspective_camera`实例（默认）或 `ui.scene.orthographic_camera` |
| on_click | 点击 3D 对象时执行的回调函数（使用 `click_events` 指定要订阅的事件） |
| click_events | 要订阅的 JavaScript 点击事件列表（默认值: `['click', 'dblclick']`） |
| on_drag_start | 开始拖动 3D 对象时执行的回调函数 |
| on_drag_end | 释放拖动 3D 对象时执行的回调函数 |
| drag_constraints | 用于约束拖动对象位置的 JavaScript 表达式（如: 'x = 0, z = y / 2'） |
| control_type | 场景的控制模式，可选 `"orbit"`、`"trackball"`、`"map"`（默认值: `"orbit"`） <Badge type="tip" text="^3.9.0" /> |
| background_color | 场景背景颜色（默认值: `"#eee"`） |

```python:line-numbers
from nicegui import ui

with ui.scene().classes('w-full h-64') as scene:
    scene.axes_helper()
    scene.sphere().material('#4488ff').move(2, 2)
    scene.cylinder(1, 0.5, 2, 20).material('#ff8800', opacity=0.5).move(-2, 1)
    scene.extrusion([[0, 0], [0, 1], [1, 0.5]], 0.1).material('#ff8888').move(2, -1)

    with scene.group().move(z=2):
        scene.box().move(x=2)
        scene.box().move(y=2).rotate(0.25, 0.5, 0.75)
        scene.box(wireframe=True).material('#888888').move(x=2, y=2)

    scene.line([-4, 0, 0], [-4, 2, 0]).material('#ff0000')
    scene.curve([-4, 0, 0], [-4, -1, 0], [-3, -1, 0], [-3, 0, 0]).material('#008800')

    logo = 'https://avatars.githubusercontent.com/u/2843826'
    scene.texture(logo, [[[0.5, 2, 0], [2.5, 2, 0]],
                         [[0.5, 0, 0], [2.5, 0, 0]]]).move(1, -3)

    teapot = 'https://upload.wikimedia.org/wikipedia/commons/9/93/Utah_teapot_(solid).stl'
    scene.stl(teapot).scale(0.2).move(-3, 4)

    avocado = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb'
    scene.gltf(avocado).scale(40).move(-2, -3, 0.5)

    scene.text('2D', 'background: rgba(0, 0, 0, 0.2); border-radius: 5px; padding: 5px').move(z=2)
    scene.text3d('3D', 'background: rgba(0, 0, 0, 0.2); border-radius: 5px; padding: 5px').move(y=-2).scale(.05)

ui.run()
```

### 切换控制模式 Changing Controls

你可以通过 `control_type` 参数来更改场景的控制模式。*3.9.0 版本新增。*

可用的控制类型有：

- **"orbit"（默认）**：适用于大多数应用场景。但相机在绕过"北极"和"南极"时会停止，以保持固定的向上方向。
- **"trackball"**：类似于 orbit，但可以绕过极点继续旋转。适合需要更灵活的相机操作的应用。
- **"map"**：允许像 3D 地图视图一样平移和缩放。适合类地图应用，例如 [RoSys](https://rosys.io)。

```python:line-numbers
from nicegui import ui

ui.label('Orbit 控制（默认）')
with ui.scene(width=285, height=220):
    ui.scene.sphere()

ui.label('Trackball 控制')
with ui.scene(width=285, height=220, control_type='trackball'):
    ui.scene.sphere()

ui.label('Map 控制')
with ui.scene(width=285, height=220, control_type='map'):
    ui.scene.sphere()

ui.run()
```

### 自定义 Three.js 对象 Custom Three.js Objects

如果 NiceGUI 内置的基本图元无法满足你的需求，或者你想在客户端运行复杂的逻辑，可以创建自己的 3D 对象。继承 `Object3D`，并通过 `component=` 传入 JavaScript 模块的路径，该路径相对于 Python 文件解析。传给 `super().__init__(...)` 的参数会按位置转发给该模块的工厂方法。额外的 Python 方法可以通过 `run_method` 调用 JavaScript 类中的同名方法。

此示例所用的 JavaScript 模块见下文。*3.16.0 版本新增。*

```python:line-numbers
from nicegui import ui
from nicegui.elements.scene import Object3D

class TorusKnot(Object3D, component='static/torus_knot.js'):
    def __init__(self, *, radius: float, tube: float, p: int, q: int) -> None:
        super().__init__(radius, tube, p, q)

    def update_topology(self, p: int, q: int) -> None:
        self.run_method('update_topology', p, q)

with ui.scene().classes('w-full h-96'):
    knot = TorusKnot(radius=1.5, tube=0.4, p=2, q=3).move(z=1)

ui.label('绕旋转轴缠绕的圈数：')
p_slider = ui.slider(min=1, max=10, value=2)
ui.label('绕内部圆环缠绕的圈数：')
q_slider = ui.slider(min=1, max=10, value=3)

p_slider.on_value_change(lambda e: knot.update_topology(e.value, q_slider.value))
q_slider.on_value_change(lambda e: knot.update_topology(p_slider.value, e.value))

ui.run()
```

**JavaScript 模块**

通过 `component=` 引用的 JavaScript 模块（即上面示例中的 `static/torus_knot.js`）需要默认导出一个类。NiceGUI 会为每个场景对象实例化一次该类，并调用以下两个入口之一来构建网格：

- `create_geometry(...args)` 返回一个 `THREE.BufferGeometry`。NiceGUI 会用 `MeshPhongMaterial` 包装它（如果向 `super().__init__()` 传入了 `wireframe=True`，则包装为线框 `LineSegments`），因此内置的 `material()`、`move()`、`scale()` 等方法可以直接生效。
- `create_mesh(...args)` 返回一个 `THREE.Object3D`，让你拥有完全的控制权。当对象不只是单个几何体，或者你自己的方法需要持续访问该网格时（例如下面的 `update_topology`），请使用它。

```js:line-numbers
// torus_knot.js
import { THREE } from "nicegui-scene";

export default class TorusKnot {
  mesh;
  radius;
  tube;

  create_mesh(radius, tube, p, q) {
    this.radius = radius;
    this.tube = tube;

    const geometry = new THREE.TorusKnotGeometry(radius, tube, 128, 16, p, q);
    const material = new THREE.MeshStandardMaterial({
      color: 0xcc33ff,
      roughness: 0.1,
      metalness: 0.8,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    return this.mesh;
  }

  update_topology(p, q) {
    this.mesh.geometry.dispose();
    this.mesh.geometry = new THREE.TorusKnotGeometry(this.radius, this.tube, 128, 16, p, q);
  }
}
```

**复合对象的材质**

当 Python 调用 `material(...)` 时，NiceGUI 会将颜色、不透明度和渲染面应用到网格的材质上。由多个子网格构成的复合对象可以定义可选的 `apply_material` 钩子，来决定材质应用到哪些部分。该钩子接收单个选项对象；请只解构你需要的字段，这样未来的 NiceGUI 版本新增字段时就不会破坏你的组件。`nicegui-scene` 模块导出的 `apply_material` 函数实现了 NiceGUI 的材质语义（`color=None` 会启用顶点颜色，`side` 可为 "front"、"back" 或 "both"）。

```js:line-numbers
// robot.js
import { apply_material, THREE } from "nicegui-scene";

export default class Robot {
  create_mesh() {
    this.body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 2), new THREE.MeshPhongMaterial({ transparent: true }));
    this.eyes = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshPhongMaterial({ color: "black" }));
    this.eyes.position.set(0.5, 0, 1);
    return new THREE.Group().add(this.body, this.eyes);
  }

  apply_material(options) {
    apply_material(this.body.material, options); // 只给机身着色，眼睛保持黑色
  }
}
```

此外还有一个可选的 `created()` 钩子，它会在网格构建完成后立即被调用。

注意，NiceGUI 在 WebGL 上下文丢失后进行恢复时，会根据每个对象的构造参数（`self.args`）以及位置、旋转、材质等内置状态重新创建所有对象。仅通过 `run_method` 修改的状态在这种情况下会丢失——请在会修改状态的方法中同步更新 `self.args`，使重新创建的对象能反映最新状态。

## 地图 Leaflet map

该元素是对 [Leaflet](https://leafletjs.com/) JavaScript 库的封装。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| center     | 地图初始中心位置（纬度/经度，默认值: `(0.0, 0.0)`） |
| zoom       | 地图初始缩放级别（默认值: `13`） |
| draw_control | 是否显示绘制工具栏（默认值: `False`） |
| options    | 传递给Leaflet地图的额外选项（默认值: `{}`） |
| hide_drawn_items | 是否隐藏地图上绘制的项目（默认值: `False`）<Badge type="tip" text="^2.0.0" /> |
| additional_resources | 需要加载的额外资源如CSS或JS文件（默认值: `None`）<Badge type="tip" text="^2.11.0" /> |

```python:line-numbers
from nicegui import ui

m = ui.leaflet(center=(51.505, -0.09))
ui.label().bind_text_from(m, 'center', lambda center: f'Center: {center[0]:.3f}, {center[1]:.3f}')
ui.label().bind_text_from(m, 'zoom', lambda zoom: f'Zoom: {zoom}')

with ui.grid(columns=2):
    ui.button('London', on_click=lambda: m.set_center((51.505, -0.090)))
    ui.button('Berlin', on_click=lambda: m.set_center((52.520, 13.405)))
    ui.button(icon='zoom_in', on_click=lambda: m.set_zoom(m.zoom + 1))
    ui.button(icon='zoom_out', on_click=lambda: m.set_zoom(m.zoom - 1))

ui.run()
```

## 树 Tree

此组件基于 Quasar 的 [QTree](https://quasar.dev/vue-components/tree) 组件，用于展示层级数据。

若使用 ID ，请确保整棵树中 ID 的唯一性。

要启用复选框及 `on_tick` 功能，需将 `tick_strategy` 参数设为 `"leaf"`、`"leaf-filtered"` 或 `"strict"`。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| nodes      | 节点对象的层级结构列表 |
| node_key   | 节点对象中存储唯一标识的属性名（默认值: `"id"`） |
| label_key  | 节点对象中存储标签文本的属性名（默认值: `"label"`） |
| children_key | 节点对象中存储子节点列表的属性名（默认值: `"children"`） |
| on_select  | 当节点选中状态变化时触发的回调函数 |
| on_expand  | 当节点展开状态变化时触发的回调函数 |
| on_tick    | 当节点勾选状态变化时触发的回调函数 |
| tick_strategy | 是否及如何使用复选框（可选值: `"leaf"`/`"leaf-filtered"`/`"strict"`，默认值: `None`） |

```python:line-numbers
from nicegui import ui

ui.tree([
    {'id': 'numbers', 'children': [{'id': '1'}, {'id': '2'}]},
    {'id': 'letters', 'children': [{'id': 'A'}, {'id': 'B'}]},
], label_key='id', on_select=lambda e: ui.notify(e.value))

ui.run()
```

## 日志视图 Log View

创建一个日志视图，允许在不向客户端重新传输完整历史记录的情况下添加新行。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| max_lines  | 最大行数限制，超过时将丢弃最早的行（默认值: `None`） |

```python:line-numbers
from datetime import datetime
from nicegui import ui

log = ui.log(max_lines=10).classes('w-full h-20')
ui.button('Log time', on_click=lambda: log.push(datetime.now().strftime('%X.%f')[:-5]))

ui.run()
```

## HTML 编辑器 Editor

此组件基于 Quasar 的 [QTree](https://quasar.dev/vue-components/tree) 组件，是一个所见即所得的 HTML 编辑器。其值为包含格式化文本的 HTML 代码字符串。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始值           |
| on_change  | 值变化时触发的回调函数 |

## 代码块 Code

该元素展示一个带有语法高亮的代码块。

在安全环境（HTTPS或本地主机）下，会显示一个复制按钮用于将代码复制到剪贴板。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | 要显示的代码内容 |
| language   | 代码语言（默认值: `"python"`） |

```python:line-numbers
from nicegui import ui

ui.code('''
    from nicegui import ui

    ui.label('Code inception!')

    ui.run()
''').classes('w-full')

ui.run()
```

## JSON 编辑器 JSONEditor

一个用于通过 [JSONEditor](https://github.com/josdejong/svelte-jsoneditor) 创建JSON编辑器的元素。通过更改properties属性可将更新推送到编辑器。数据变更后，调用update方法以刷新编辑器。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| properties | JSONEditor 的属性字典 |
| on_select  | 当部分内容被选中时触发的回调函数 |
| on_change  | 当内容发生变化时触发的回调函数 |
| schema     | 用于验证被编辑数据的可选 JSON 模式 <Badge type="tip" text="^2.8.0" /> |

```python:line-numbers
from nicegui import ui

json = {
    'array': [1, 2, 3],
    'boolean': True,
    'color': '#82b92c',
    None: None,
    'number': 123,
    'object': {
        'a': 'b',
        'c': 'd',
    },
    'time': 1575599819000,
    'string': 'Hello World',
}
ui.json_editor({'content': {'json': json}},
               on_select=lambda e: ui.notify(f'Select: {e}'),
               on_change=lambda e: ui.notify(f'Change: {e}'))

ui.run()
```