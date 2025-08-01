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