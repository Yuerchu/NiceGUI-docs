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