---
title: 页面布局
prev:
  text: '绑定属性'
  link: '/documentation/section_binding_properties'
next:
  text: '造型与外观'
  link: '/documentation/section_styling_appearance'
---

# 页面布局

## 自动上下文

为了实现直观的 UI 描述编写，NiceGUI 会自动追踪元素创建的上下文环境。这意味着无需显式指定父级参数，而是通过 `with` 语句来定义父级上下文。该上下文也会传递给事件处理器和定时器。

在演示中，标签"Card content"被添加到卡片内。由于 `ui.button` 同样被添加到卡片中，因此标签"Click!"也会在这个上下文中创建。一秒后添加一次的标签"Tick!"同样会被加入卡片。

这种设计使得创建模块化组件变得简单，即使这些组件在UI中被移动位置也能继续正常工作。例如，您可以将标签和按钮移动到其他位置，甚至用另一个容器包裹它们，代码依然能够正常运行。

```python:line-numbers
from nicegui import ui

with ui.card():
    ui.label('Card content')
    ui.button('Add label', on_click=lambda: ui.label('Click!'))
    ui.timer(1.0, lambda: ui.label('Tick!'), once=True)

ui.run()
```

## 卡片 Card

此元素基于 Quasar 的 [QCard](https://quasar.dev/vue-components/card) 组件。它一共了一个带有边框和边框阴影的容器。

注意：与此元素不同，原版 QCard 默认无内边距，且会隐藏嵌套元素的外部边框和阴影。如需保留原版行为，请使用 `.tight()` 方法。

<Badge type="tip" text="^2.0.0" />: 不再隐藏嵌套元素的外部边框和阴影。

```python:line-numbers
from nicegui import ui

with ui.card().tight():
    ui.image('https://picsum.photos/id/684/640/360')
    with ui.card_section():
        ui.label('Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...')

ui.run()
```

## 纵向布局 Column Element

提供一个子元素为纵向排列的元素容器。

| 参数 Param      | 说明 Description |
| --------------- | ---------------- |
| wrap            | 是否自动换行 (默认值: `False`) |
| align_items     | 列内项目的对齐方式 ("start", "end", "center", "baseline" 或 "stretch"; 默认值: `None`) |

```python:line-numbers{3}
from nicegui import ui

with ui.column():
    ui.label('label 1')
    ui.label('label 2')
    ui.label('label 3')

ui.run()
```

## 横向布局 Row Element

提供一个子元素为横向排列的元素容器。

| 参数 Param      | 说明 Description |
| --------------- | ---------------- |
| wrap            | 是否自动换行 (默认值: `True`) |
| align_items     | 列内项目的对齐方式 ("start", "end", "center", "baseline" 或 "stretch"; 默认值: `None`) |

```python:line-numbers{3}
from nicegui import ui

with ui.row():
    ui.label('label 1')
    ui.label('label 2')
    ui.label('label 3')

ui.run()
```

## 网格布局 Grid Element

提供一个子元素为网格排列的元素容器。

| 参数 Param      | 说明 Description |
| --------------- | ---------------- |
| rows            | 网格的行数，或使用 grid-template-rows CSS 属性的字符串 (例如 `'auto 1fr'`) |
| columns         | 网格的列数，或使用 grid-template-columns CSS 属性的字符串 (例如 `'auto 1fr'`) |

```python:line-numbers{3}
from nicegui import ui

with ui.grid(columns=2):
    ui.label('Name:')
    ui.label('Tom')

    ui.label('Age:')
    ui.label('42')

    ui.label('Height:')
    ui.label('1.80m')

ui.run()
```

## 列表

此元素基于 Quasar 的 [QList](https://quasar.dev/vue-components/list-and-list-items#qlist-api) 组件，为 `ui.item` 元素提供容器功能。

```python:line-numbers
from nicegui import ui

with ui.list().props('dense separator'):
    ui.item('3 Apples')
    ui.item('5 Bananas')
    ui.item('8 Strawberries')
    ui.item('13 Walnuts')

ui.run()
```

# 滑块项目 Slide Item <Badge type="tip" text="^2.12.0" />

此元素基于 Quasar 的 [QSlideItem](https://quasar.dev/vue-components/slide-item/) 组件。

若提供了 `text` 参数，将创建一个嵌套的 `ui.item` 元素并显示给定文本。如需自定义文本显示方式，可在滑动项内放置自定义元素。

要为单个滑动动作填充插槽，可使用 left、right、top或bottom方法，或使用带 side 参数（"left"、"right"、"top"或"bottom"）的 action 方法。

滑动动作触发后，可通过 `reset()` 方法将滑动项重置回初始状态。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 要显示的文本 (默认值: `""`) |
| on_slide   | 当触发任何滑动操作时调用的回调函数 |

## 全屏控制元素 <Badge type="tip" text="^2.11.0" />

此元素基于 Quasar 的 [AppFullscreen](https://quasar.dev/quasar-plugins/app-fullscreen) 组件，提供了进入、退出及切换全屏模式的功能。

重要注意事项：

- 出于安全考虑，全屏模式只能通过用户先前的交互操作（如点击按钮）触发。
- 长按退出全屏的功能仅在某些浏览器（如 Google Chrome 或 Microsoft Edge）中生效。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| require_escape_hold | 用户是否需要长按ESC键退出全屏模式 |
| on_value_change | 当全屏状态变化时触发的回调函数 |

```python:line-numbers
from nicegui import ui

fullscreen = ui.fullscreen()

ui.button('Enter Fullscreen', on_click=fullscreen.enter)
ui.button('Exit Fullscreen', on_click=fullscreen.exit)
ui.button('Toggle Fullscreen', on_click=fullscreen.toggle)

ui.run()
```

## 清空容器 Clear Containers

要移除行、列或卡片容器中的所有元素，可以调用 `container.clear()`

或者，也可以通过调用以下任意一种方法移除单个元素：

- `container.remove(element: Element)`
- `container.remove(index: int)`
- `element.delete()`

```python:line-numbers
from nicegui import ui

container = ui.row()

def add_face():
    with container:
        ui.icon('face')
add_face()

ui.button('Add', on_click=add_face)
ui.button('Remove', on_click=lambda: container.remove(0) if list(container) else None)
ui.button('Clear', on_click=container.clear)

ui.run()
```

## 传送门 Teleport

一个允许我们将组件内部的内容传送到页面任意位置的元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| to         | 用于传送内容的目标元素的 NiceGUI 元素或 CSS 选择器 |


```python:line-numbers
from nicegui import ui

markdown = ui.markdown('Enter your **name**!')

def inject_input():
    with ui.teleport(f'#{markdown.html_id} strong'):
        ui.input('name').classes('inline-flex').props('dense outlined')

ui.button('inject input', on_click=inject_input)

ui.run()
```

## 扩展元素 Expansion Element

此元素基于 Quasar 的 [QExpansionItem](https://quasar.dev/vue-components/expansion-item) 组件，提供可展开的容器。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 标题文本         |
| caption    | 可选的副标题文本 |
| icon       | 可选的图标 (默认值: `None`) |
| group      | 可选的组名，用于协调组内展开/折叠状态 (即"手风琴模式") |
| value      | 创建时是否应展开 (默认值: `False`) |
| on_value_change | 当值变化时执行的回调函数 |

```python:line-numbers
from nicegui import ui

with ui.expansion('Expand!', icon='work').classes('w-full'):
    ui.label('inside the expansion')

ui.run()
```

## 滑动区 Scroll Area

此元素基于 Quasar 的 [ScrollArea](https://quasar.dev/vue-components/scroll-area/) 组件，是一种通过封装内容来自定义滚动条的方式。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_scroll  | 当滚动位置变化时调用的函数 |

```python:line-numbers
from nicegui import ui

with ui.row():
    with ui.scroll_area().classes('w-32 h-32 border'):
        ui.label('I scroll. ' * 20)
    with ui.column().classes('p-4 w-32 h-32 border'):
        ui.label('I will not scroll. ' * 10)

ui.run()
```

## 分割线 Separator

此元素基于 Quasar 的 [QSeparator](https://quasar.dev/vue-components/separator) 组件。

它用作卡片、菜单及其他组件容器的分隔符，功能类似于HTML的 `<hr>` 标签。

```python:line-numbers
from nicegui import ui

ui.label('分割线之上')
ui.separator()
ui.label('分割线之下')

ui.run()
```

## 空间 Space

此元素基于 Quasar 的 [QSpace](https://quasar.dev/vue-components/space) 组件。

其目的是简单地填满 flexbox 元素内部所有可用空间。

```python:line-numbers
from nicegui import ui

with ui.row().classes('w-full border'):
    ui.label('Left')
    ui.space()
    ui.label('Right')

ui.run()
```

## 骨架屏 Skeleton

此元素基于 Quasar 的 [QSkeleton](https://quasar.dev/vue-components/skeleton) 组件，用作卡片、菜单及其他组件容器中加载内容的占位符。具体可用类型请参阅 [Quasar文档](https://quasar.dev/vue-components/skeleton/#predefined-types)。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| type | 要显示的骨架屏类型 (默认值: `"rect"`) |
| tag | 该元素使用的HTML标签 (默认值: `"div"`) |
| animation | 骨架屏占位符的动画效果 (默认值: `"wave"`) |
| animation_speed | 动画速度(秒) (默认值: `1.5`) |
| square | 是否移除圆角使边框变为直角 (默认值: `False`) |
| bordered | 是否为组件应用默认边框 (默认值: `False`) |
| size | CSS单位尺寸(会覆盖 `width` 和 `height`) |
| width | CSS单位宽度(如果设置了 `size` 会被覆盖) |
| height | CSS单位高度(如果设置了 `size` 会被覆盖) |

```python:line-numbers
from nicegui import ui

ui.skeleton().classes('w-full')

ui.run()
```

## 空间划分器 Splitter

此元素基于 Quasar 的 [Splitter](https://quasar.dev/vue-components/splitter) 组件，它将屏幕空间划分为可调整大小的区域，为应用程序提供灵活且响应式的布局。

它提供了三个可自定义的插槽：`before`、`after` 和 `separator`，可用于在分割器中嵌入其他元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| horizontal | 是否水平分割而非垂直分割 |
| limits     | 两个数字，表示两个面板的最小和最大分割尺寸 |
| value      | 第一个面板的大小(如果使用reverse则为第二个面板) |
| reverse    | 是否将模型大小应用于第二个面板而非第一个 |
| on_change | 当用户释放分割器时调用的回调函数 |

```python:line-numbers
from nicegui import ui

with ui.splitter() as splitter:
    with splitter.before:
        ui.label('This is some content on the left hand side.').classes('mr-2')
    with splitter.after:
        ui.label('This is some content on the right hand side.').classes('ml-2')

ui.run()
```

## 标签与标签页 Tabs

`ui.tabs`, `ui.tab`, `ui.tab_panels` 和 `ui.tab_panel` 这些元素基于 Quasar 的 [tab](https://quasar.dev/vue-components/tabs) 和 [tab_panels](https://quasar.dev/vue-components/tab-panels) API。

`ui.tabs` 可以为标签页创建一个选择器。这个选择器可以放置在 `ui.header` 中。而 `ui.tab_panels` 则是标签页的核心，它创建了一个容器组，然后你可以用 `ui.tab_panel` 去套用它。

```python:line-numbers
from nicegui import ui

with ui.tabs().classes('w-full') as tabs:
    one = ui.tab('One')
    two = ui.tab('Two')
with ui.tab_panels(tabs, value=two).classes('w-full'):
    with ui.tab_panel(one):
        ui.label('First tab')
    with ui.tab_panel(two):
        ui.label('Second tab')

ui.run()
```

## 步骤器 Stepper

此元素基于 Quasar 的 [QStepper](https://quasar.dev/vue-components/stepper#qstepper-api) 组件。它可以指引用户按步骤完成任务。

为了避免切换步骤时动态元素出现问题，该组件使用了Vue的keep-alive功能。若客户端性能存在顾虑，可禁用此特性。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value | 初始选中的步骤(`ui.step` 或步骤名称，默认值: `None` 表示第一个步骤) |
| on_value_change | 当选中步骤变化时执行的回调函数 |
| keep_alive | 是否对内容使用Vue的keep-alive组件 (默认值: `True`) |

```python:line-numbers
from nicegui import ui

with ui.stepper().props('vertical').classes('w-full') as stepper:
    with ui.step('Preheat'):
        ui.label('Preheat the oven to 350 degrees')
        with ui.stepper_navigation():
            ui.button('Next', on_click=stepper.next)
    with ui.step('Ingredients'):
        ui.label('Mix the ingredients')
        with ui.stepper_navigation():
            ui.button('Next', on_click=stepper.next)
            ui.button('Back', on_click=stepper.previous).props('flat')
    with ui.step('Bake'):
        ui.label('Bake for 20 minutes')
        with ui.stepper_navigation():
            ui.button('Done', on_click=lambda: ui.notify('Yay!', type='positive'))
            ui.button('Back', on_click=stepper.previous).props('flat')

ui.run()
```

## 时间线 Timeline

此元素基于 Quasar 的 [QTimeline](https://quasar.dev/vue-components/timeline#qtimeline-api) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| side | 侧边位置 ("left" 或 "right"; 默认值: `"left"`) |
| layout | 布局样式 ("dense", "comfortable" 或 "loose"; 默认值: `"dense"`) |
| color | 图标颜色 |

```python:line-numbers
from nicegui import ui

with ui.timeline(side='right'):
    ui.timeline_entry('Rodja and Falko start working on NiceGUI.',
                      title='Initial commit',
                      subtitle='May 07, 2021')
    ui.timeline_entry('The first PyPI package is released.',
                      title='Release of 0.1',
                      subtitle='May 14, 2021')
    ui.timeline_entry('Large parts are rewritten to remove JustPy '
                      'and to upgrade to Vue 3 and Quasar 2.',
                      title='Release of 1.0',
                      subtitle='December 15, 2022',
                      icon='rocket')

ui.run()
```

## 幻灯片灯箱 Carousel

此元素基于 Quasar 的 [QCarousel]() 组件。它包含独立的轮播幻灯片。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value | 初始选中的幻灯片(ui.carousel_slide或幻灯片名称) (默认值: `None`表示第一张幻灯片) |
| on_value_change | 当选中幻灯片变化时执行的回调函数 |
| animated | 是否启用幻灯片切换动画 (默认值: `False`) |
| arrows | 是否显示手动导航箭头 (默认值: `False`) |
| navigation | 是否显示导航圆点 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.carousel(animated=True, arrows=True, navigation=True).props('height=180px'):
    with ui.carousel_slide().classes('p-0'):
        ui.image('https://picsum.photos/id/30/270/180').classes('w-[270px]')
    with ui.carousel_slide().classes('p-0'):
        ui.image('https://picsum.photos/id/31/270/180').classes('w-[270px]')
    with ui.carousel_slide().classes('p-0'):
        ui.image('https://picsum.photos/id/32/270/180').classes('w-[270px]')

ui.run()
```

## 分页 Pagination

这是一个基于 Quasar 的 [QTimeline](https://quasar.dev/vue-components/timeline#qtimeline-api) 分页器组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| min        | 最小页码         |
| max        | 最大页码         |
| direction_links | 是否显示首页/末页链接 |
| value      | 初始页码 (若未提供则默认为min) |
| on_change  | 当页码变化时触发的回调函数 |

```python:line-numbers
from nicegui import ui

p = ui.pagination(1, 5, direction_links=True)
ui.label().bind_text_from(p, 'value', lambda v: f'Page {v}')

ui.run()
```

## 菜单 Menu

创建一个基于 Quasar 的 [QMenu]() 组件。这个菜单应放置在需要显示的元素内部。

::: tip 高级提示
使用 `auto-close` 自动关闭 prop 可以在任何点击事件触发（甚至与服务器断开连接时）自动地关闭这个菜单。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 菜单是否打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.row().classes('w-full items-center'):
    result = ui.label().classes('mr-auto')
    with ui.button(icon='menu'):
        with ui.menu() as menu:
            ui.menu_item('Menu item 1', lambda: result.set_text('Selected item 1'))
            ui.menu_item('Menu item 2', lambda: result.set_text('Selected item 2'))
            ui.menu_item('Menu item 3 (keep open)',
                         lambda: result.set_text('Selected item 3'), auto_close=False)
            ui.separator()
            ui.menu_item('Close', menu.close)

ui.run()
```

## 上下文菜单 Context Menu

创建一个基于 Quasar 的 [QMenu](https://quasar.dev/vue-components/menu) 的上下文菜单。这个菜单需要使用 `with` 方法将其放置在元素之中。它将在用户使用右键点击元素时自动打开。

```python:line-numbers
from nicegui import ui

with ui.image('https://picsum.photos/id/377/640/360'):
    with ui.context_menu():
        ui.menu_item('Flip horizontally')
        ui.menu_item('Flip vertically')
        ui.separator()
        ui.menu_item('Reset', auto_close=False)

ui.run()
```

## 气泡提示 Tooltip

此元素基于 Quasar 的 [QTooltip](https://quasar.dev/vue-components/tooltip) 组件。它可以作为一个方法被放置在其他元素上。

除了传递字符串作为第一个参数外，您还可以在工具提示内嵌套其他元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 提示的内容 (默认值: `""`) |

```python:line-numbers
from nicegui import ui

with ui.button(icon='thumb_up'):
    ui.tooltip('I like this').classes('bg-green')

ui.run()
```

## 通知 Notification

在屏幕上显示一个通知。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| message    | 通知内容         |
| position   | 屏幕显示位置 (`top-left`, `top-right`, `bottom-left`, `bottom-right`, `top`, `bottom`, `left`, `right` 或 `center`, 默认值: `"bottom"`) |
| close_button | 可选的通知关闭按钮标签 (默认值: `False`) |
| type       | 可选的通知类型 (`positive`, `negative`, `warning`, `info` 或 `ongoing`) |
| color      | 可选的颜色名称   |
| multi_line | 启用多行通知显示 |

::: tip 提示
您好可以添加额外的参数。敬请参考 [Quasar 的通知 API](https://quasar.dev/quasar-plugins/notify#notify-api)
:::

```python:line-numbers
from nicegui import ui

ui.button('Say hi!', on_click=lambda: ui.notify('Hi!', close_button='OK'))

ui.run()
```
 
## 高级通知 Notification Element

在屏幕上显示一个通知。不同于 `ui.notify`，该元素允许在通知显示后更新通知消息及其他属性。可通过 `dismiss()` 方法移除通知。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| message    | 通知内容         |
| position   | 屏幕显示位置 (`top-left`, `top-right`, `bottom-left`, `bottom-right`, `top`, `bottom`, `left`, `right` 或 `center`, 默认值: `"bottom"`) |
| close_button | 可选的通知关闭按钮标签 (默认值: `False`) |
| type       | 可选的通知类型 (`positive`, `negative`, `warning`, `info` 或 `ongoing`) |
| color      | 可选的颜色名称   |
| multi_line | 启用多行通知显示 |
| icon       | 可选的通知图标名称 (默认值: `None`) |
| spinner    | 在通知中显示加载动画 (默认值: `False`) |
| timeout    | 可选的通知自动关闭超时时间(秒) (默认值: `5.0`) |
| on_dismiss | 可选的通知关闭时触发的回调函数 |
| options    | 包含所有选项的可选字典(会覆盖其他参数) |

::: tip 提示
您好可以添加额外的参数。敬请参考 [Quasar 的通知 API](https://quasar.dev/quasar-plugins/notify#notify-api)
:::

```python:line-numbers
import asyncio
from nicegui import ui

async def compute():
    n = ui.notification(timeout=None)
    for i in range(10):
        n.message = f'Computing {i/10:.0%}'
        n.spinner = True
        await asyncio.sleep(0.2)
    n.message = 'Done!'
    n.spinner = False
    await asyncio.sleep(1)
    n.dismiss()

ui.button('Compute', on_click=compute)

ui.run()
```

## 对话框 Dialog

此元素基于 Quasar 的 [QDialog](https://quasar.dev/vue-components/dialog) 组件。默认情况下，点击或按ESC键可关闭。若需使其保持持久显示，需在对话框元素上设置 `.props(‘persistent’)` 属性。

::: warning 注意
对话框是一个元素。这意味着它在关闭时不会被移除，而只是被隐藏。您应该仅创建一次然后重复使用它，或者在关闭后使用 `.clear()` 方法将其移除。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 对话框是否在创建时被打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.dialog() as dialog, ui.card():
    ui.label('Hello world!')
    ui.button('Close', on_click=dialog.close)

ui.button('Open a dialog', on_click=dialog.open)

ui.run()
```