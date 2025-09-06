# 虚拟摇杆 Joystick

使用 [nipple.js](https://yoannmoi.net/nipplejs/) 创建一个虚拟摇杆。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_start   | 当用户开始使用摇杆执行的回调函数 |
| on_move    | 当用户开始移动摇杆执行的回调函数 |
| on_end     | 当用户结束使用摇杆执行的回调函数 |
| throttle   | 移动事件的节流间隔 (单位: 秒，默认值: `0.05`，不宜设置得过低，会显著降低服务端的性能，译者注) |
| options    | 应传递给 [`nipple.js`](https://github.com/yoannmoinet/nipplejs#options) 库的参数，例如 `color` |

::: details 可传入 `nipple.js` 的参数
```typescript
var options = {
    zone: Element,                  // active zone
    color: String,
    size: Integer,
    threshold: Float,               // before triggering a directional event
    fadeTime: Integer,              // transition time
    multitouch: Boolean,
    maxNumberOfNipples: Number,     // when multitouch, what is too many?
    dataOnly: Boolean,              // no dom element whatsoever
    position: Object,               // preset position for 'static' mode
    mode: String,                   // 'dynamic', 'static' or 'semi'
    restJoystick: Boolean|Object,   // Re-center joystick on rest state
    restOpacity: Number,            // opacity when not 'dynamic' and rested
    lockX: Boolean,                 // only move on the X axis
    lockY: Boolean,                 // only move on the Y axis
    catchDistance: Number,          // distance to recycle previous joystick in
                                    // 'semi' mode
    shape: String,                  // 'circle' or 'square'
    dynamicPage: Boolean,           // Enable if the page has dynamically visible elements
    follow: Boolean,                // Makes the joystick follow the thumbstick
};
```
:::

```python:line-numbers
from nicegui import ui

ui.joystick(
    color='blue', size=50,
    on_move=lambda e: coordinates.set_text(f'{e.x:.3f}, {e.y:.3f}'),
    on_end=lambda _: coordinates.set_text('0, 0'),
).classes('bg-slate-300')
coordinates = ui.label('0, 0')

ui.run()
```