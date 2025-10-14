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
| auto_size_columns | 是否自动调整列宽以适应网格宽度（默认值: `True`） |

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