# 文本 `Label`

显示一些文本。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 文本的内容       |

```python
from nicegui import ui

ui.label('你好世界')
```

## 根据内容改变外观

你可以重写 `_handle_text_change` 方法，根据标签内容更新其其他属性。
此技术同样适用于绑定，如下例所示。

```python
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
- **html_id**: `str`
    - 在 HTML DOM 中的元素 ID。
    - > 在 v2.16.0 中被添加
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
| toggle        | 	以空格分隔的待切换类名(在 v2.7.0 中新增) |
| replace       | 以空格分隔的用于替换现有类的类名 |

## 遗产