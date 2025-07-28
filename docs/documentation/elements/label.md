# 文本 `Label`

显示一些文本。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本的内容       |

```python:line-numbers
from nicegui import ui

ui.label('你好世界')
```

## 根据内容改变外观

你可以重写 `_handle_text_change` 方法，根据标签内容更新其其他属性。
此技术同样适用于绑定，如下例所示。

```python{4-9}:line-numbers
from nicegui import ui

class status_label(ui.label):
    def _handle_text_change(self, text: str) -> None:
        super()._handle_text_change(text)
        if text == 'ok':
            self.classes(replace='text-positive')
        else:
            self.classes(replace='text-negative')

model = {'status': 'error'}
status_label().bind_text_from(model, 'status')
ui.switch(on_change=lambda e: model.update(status='ok' if e.value else 'error'))

ui.run()
```

# 特性

## 属性

- **classes**: `Classes[Self]`
    - 元素的 Classes 。
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

### `bind_text(target_object: Any, target_name: str = 'text', forward: Callable[..., Any] = [...], backward: Callable[..., Any] = [...]) -> Self`

将此元素的文本绑定到目标对象的 `target_name` 属性。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| forward       | 在绑定之前需要执行的方法 |
| backward      | 在绑定之后需要执行的方法 |

### `bind_text_from(target_object: Any, target_name: str = 'text', backward: Callable[..., Any] = [...]) -> Self`

将此元素的文本与目标对象的 `target_name` 属性绑定。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| backward      | 在绑定之后需要执行的方法 |

### `bind_text_to(target_object: Any, target_name: str = 'text', forward: Callable[..., Any] = [...]) -> Self`

将此元素的文本绑定到目标对象的 `target_name` 属性。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| forward       | 在绑定之前需要执行的方法 |

### `bind_visibility(target_object: Any, target_name: str = 'visible', forward: Callable[..., Any] = [...], backward: Callable[..., Any] = [...], value: Any = None) -> Self`

将此元素的可见性绑定到目标对象的 `target_name` 属性。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| forward       | 在绑定之前需要执行的方法 |
| backward      | 在绑定之后需要执行的方法 |
| value         | 如果此项不缺省，该元素当且仅当等于该值时显示 |

### `bind_visibility_from(target_object: Any, target_name: str = 'visible', backward: Callable[..., Any] = [...], value: Any = None) -> Self`

将此元素的可见性与目标对象的 `target_name` 属性绑定。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| backward      | 在绑定之后需要执行的方法 |
| value         | 如果此项不缺省，该元素当且仅当等于该值时显示 |

### `bind_visibility_to(target_object: Any, target_name: str = 'visible', forward: Callable[..., Any] = [...]) -> Self`

将此元素的可见性绑定到目标对象的 `target_name` 属性。

绑定是双向的，也就是说既会从此元素到目标对象，也会从目标对象到此元素。更新会立即执行，并在值变化时随时进行。初始同步时，反向绑定具有优先权。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| target_object | 需要绑定的目标     |
| target_name   | 绑定目标上的参数名 |
| forward       | 在绑定之前需要执行的方法 |

### `clear() -> None`

清除所有子元素。

### `default_classes(add: Optional[str] = None, remove: Optional[str] = None, toggle: Optional[str] = None, replace: Optional[str] = None) -> type[Self]`

应用、移除、切换或替换默认的 HTML 类。

这允许使用 [Tailwind](https://v3.tailwindcss.com/) 或 [Quasar](https://quasar.dev/) 类来修改元素的外观或布局。

如果不需要预定义的类，移除或替换类会很有帮助。该类的所有元素将共享这些 HTML 类。这些类必须在元素实例化之前定义。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| add           | 以空格分隔的待添加类名 |
| remove        | 以空格分隔的待移除类名 |
| toggle        | 以空格分隔的待切换类名(在 v2.7.0 中新增) |
| replace       | 以空格分隔的用于替换现有类的类名 |

### `default_props(add: Optional[str] = None, remove: Optional[str] = None) -> type[Self]`

应用、移除、切换或替换默认的 Quasar Props。

这允许使用 [Quasar](https://quasar.dev/) 属性来修改元素的外观或布局。由于属性会作为 HTML 属性直接应用，因此它们可以与任何 HTML 元素一起使用。该类的所有元素都将共享这些属性。这些属性必须在元素实例化之前定义。

`bool` 属性如果没有指定值则默认为 True。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| add           | 以空格分隔或 `键=值` 对列表的待添加属性 |
| remove        | 以空格分隔的待移除属性 |

### `default_style(add: Optional[str] = None, remove: Optional[str] = None, replace: Optional[str] = None) -> type[Self]`

应用、移除或替换默认的 CSS 定义。

若不需要预定义样式，移除或替换样式会很有帮助。该类的所有元素将共享这些CSS定义。这些定义必须在元素实例化之前完成。

| 参数 Param    | 说明 Description   |
| ------------- | ----------------   |
| add           | 要添加到元素的样式列表 |
| remove        | 要从元素中移除的样式列表 |
| replace       | 用于替代现有样式的样式列表 |

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