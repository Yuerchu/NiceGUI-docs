# 超链接 `Link`

创建超链接。

要跳转到页面内的特定位置，您可以使用 `ui.link_target("name")` 方法放置锚点，然后使用 `ui.link(target="#name")` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示的文本       |
| target     | page 函数，同一页面上的 NiceGUI 元素或字符串，该字符串是一个绝对 URL 或相对于根 URL 的相对路径 |
| new_tab    | 在新标签页中打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

ui.link('Github 上的 NiceGUI', 'https://github.com/zauberzeug/nicegui')

ui.run()
```

## 跳转到其他元素

需要让其他元素呈现在屏幕上，你可以使用 `ui.link_target('target_name')` 来放置锚点或者直接跳转到元素。

```python:line-numbers
from nicegui import ui

navigation = ui.row()
ui.link_target('target_A')
ui.label(
    '我是元素A'
)
label_B = ui.label(
    '我是元素B'
)
with navigation:
    ui.link('点我跳转到元素A', '#target_A')
    ui.link('点我跳转到元素B', label_B)

ui.run()
```

## 导航到其他页面

你可以传入页面名或者函数名来执行页面跳转。

```python:line-numbers
from nicegui import ui

@ui.page('/some_other_page')
def my_page():
    ui.label('This is another page')

ui.label('Go to other page')
ui.link('... with path', '/some_other_page')
ui.link('... with function reference', my_page)

ui.run()
```

## 从图片或其他元素引用链接

```python:line-numbers
from nicegui import ui

with ui.link(target='https://github.com/Yuerchu/NiceGUI-Docs'):
    ui.image('https://picsum.photos/id/41/640/360').classes('w-64')

ui.run()
```

# 特性

## 属性

- **classes**: `Classes[Self]`
    - 元素的 Classes 。
- **client**: `Client`
    - The client this element belongs to.
- **html_id**: `str` <Badge type="tip" text="^2.16.0" />
    - 在 HTML DOM 中的元素 ID。
- **is_deleted**: `bool`
    - 元素是否被删除。
- **is_ignoring_events**: `bool`
    - 返回元素当前是否忽略事件。
- **props**: `Props[self]`
    - 元素的 Props 。
- **style**: `Style[self]`
    - 元素的 Style 。
- **text**: `BindableProperty`
- **visiable**: `BindableProperty`

## 方法

### `add_dynamic_resource(name: str, function: Callable) -> None`

向元素添加一个动态资源，该资源返回函数执行的结果。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| name       | 资源名           |
| function   | 返回资源响应的函数 |

### `add_resource(path: Union[str, Path]) -> None`

向元素中添加一个资源。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| path       | 资源路径(例如CSS和Javascript文件的路径) |

### `add_slot(name: str, template: Optional[str] = None) -> Slot`

向元素中添加一个插槽。

NiceGUI使用了来自Vue的 **插槽** 的概念：元素可以有多个插槽，而每个插槽中又可以有若干个子元素。大多数元素只有一个插槽，比如说基于QCard的 `ui.card` 等等只有一个默认的插槽。但也不乏有一些复杂的元素，例如基于QTable的 `ui.table` 就有多个插槽，比如 `header` 和 `body` 等等。如果您使用 `ui.row()` 或 `ui.column()` 等语句来嵌套元素，那么该元素将会被加入默认的插槽；但如果您使用 `table.add_slot()` ，则可以添加到不同的插槽中。

插槽堆栈帮助NiceGUI追踪当前用于新元素的插槽。父字段持有对其元素的引用。每当通过 `with` 表达式进入一个元素时，其默认插槽也会自动进入。

| 参数 Param  | 说明 Description |
| ----------- | ---------------- |
| name        | 插槽名           |
| template    | 插槽的 Vue 模板  |
| 返回 return | 此插槽           |

### `ancestors(include_self: bool = False) -> Iterator[Element]`

遍历该元素的父元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| include_self | 是否在迭代中保留本身 |

<!--@include: ./ext/bind.md-->

### `clear() -> None`

清除所有子元素。

<!--@include: ./ext/default.md-->

### `delete() -> None`

删除此元素及其所有子元素。

### `descendants(include_self: bool = False) -> Iterator[Element]`

遍历该元素的子元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| include_self | 是否在迭代中保留本身 |

### `get_computed_prop(prop_name: str, timeout: float = 1) -> AwaitableResponse`

返回一个计算属性。

该函数应该被等待(await)，以便正确返回计算属性。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| prop_name  | 计算属性的名称   |
| timeout    | 等待响应的最长时间 (默认值: 1秒) |

### `mark(*markers: str) -> Self`

替换元素的标记。

标记用于通过 [ElementFilter](https://nicegui.cn/documentation/element_filter) 识别元素进行查询。

该功能在测试中被大量使用，但也可用于减少全局变量的数量或传递依赖项。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| markers    | 字符串列表或使用空格分隔的单个字符串；替换现有标记 |

### `move(target_container: Optional[Element] = None, target_index: int = -1, target_slot: Optional[str] = None) -> None`

将元素移动到另一个容器。

| 参数 Param       | 说明 Description   |
| ---------------- | ----------------   |
| target_container | 要移动元素到的容器 (默认值: 父容器) |
| target_index     | 目标槽中的索引 (默认值: 追加到末尾) |
| target_slot      | 目标容器中的槽位 (默认值: 默认槽位) |

### `on(type: str, handler: Optional[events.Handler[events.GenericEventArguments]] = None, args: Union[None, Sequence[str], Sequence[Optional[Sequence[str]]]] = None, throttle: float = 0.0, leading_events: bool = True, trailing_events: bool = True, js_handler: Optional[str] = None) -> Self`

订阅事件。

| 参数 Param       | 说明 Description   |
| ---------------- | ----------------   |
| type             | 事件名称(例如 "click"、"mousedown" 或 "update:model-value") |
| handler          | 事件发生时触发的回调函数 |
| args             | 包含在传递给事件处理器的事件消息中的参数(默认值: None 表示全部) |
| throttle         | 事件发生之间的最小时间间隔(单位：秒，默认值: 0.0) |
| leading_events   | 是否在第一个事件发生时立即触发事件处理器(默认值: True) |
| trailing_events     | 是否在最后一次事件发生后触发事件处理器(默认值: True) |
| js_handler      | 事件发生时执行的 JavaScript 代码，例如 `(evt) => alert(evt)` (默认值: None) |

### `remove(element: Union[Element, int]) -> None`

移除子元素。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| element    | 可以是元素实例或其ID |

### `run_method(name: str, *args: Any, timeout: float = 1) -> AwaitableResponse`

在客户端运行一个方法。

如果该函数被等待，则返回方法调用的结果。

否则，该方法将被执行，且不等待响应。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| name       | 方法名称         |
| args       | 传递给方法的参数 |
| timeout    | 等待响应的最长时间 (默认值: 1秒) |

### `set_text(text: str) -> None`

设置元素的文本。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 新的文本         |

### `set_visibility(visible: bool) -> None`

设置元素的可见性。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| visible    | 此元素是否可见   |

### `tooltip(text: str) -> Self`

向元素中添加提示。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 提示的文本       |

### `update() -> None`

在客户端更新此元素。

## 遗产

- TextElement
- Element
- Visibility