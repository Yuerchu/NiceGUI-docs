# 视听元素

## 图片 Image

显示一张图片。此元素基于 Quasar 的 [QImg](https://quasar.dev/vue-components/img) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| source     | 图片源，可以是 URL, 本地文件路径，base64 编码的图片或者 PIL 图片 |

```python
from nicegui import ui

ui.image('https://picsum.photos/id/377/640/360')

ui.run()
```

[查看更多]()

## 字幕和叠加 Captions and Overlays

通过 `with ui.image(...):` 语句可以在图片中增加多种内容。

您可以使用 [Quasar classes](https://quasar.dev/vue-components/img) 进行字幕的定位和样式设计。若需叠加 SVG，请确保 viewBox 与图像尺寸完全一致，并设置 100% 的宽度/高度以匹配实际渲染大小。

```python
from nicegui import ui

with ui.image('https://picsum.photos/id/29/640/360'):
    ui.label('Nice!').classes('absolute-bottom text-subtitle2 text-center')

with ui.image('https://cdn.stocksnap.io/img-thumbs/960w/airplane-sky_DYPWDEEILG.jpg'):
    ui.html('''
        <svg viewBox="0 0 960 638" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="445" cy="300" r="100" fill="none" stroke="red" stroke-width="10" />
        </svg>
    ''').classes('w-full bg-transparent')

ui.run()
```

## 互动图片 Interactive Image

创建一个带有 SVG 叠加层的图片，可通过鼠标事件进行响应。它也是实现无闪烁图像更新的最佳选择。如果源 URL 的改变比图片加载得更快，一些图片可能会直接跳过加载。通过不断更新图像源，将自动适应可用带宽。参见[OpenCV Webcam](https://github.com/zauberzeug/nicegui/tree/main/examples/opencv_webcam/main.py)示例。

鼠标事件处理器被调用时，会传入包含以下参数的鼠标事件对象：

- `type`（ JavaScript 事件的名称）
- `image_x` 和 `image_y`（图像坐标，单位为像素）
- `button` 和 `buttons`（来自 JavaScript 事件的鼠标按钮编号）
- `alt`、`ctrl`、`meta` 和 `shift`（来自 JavaScript 事件的修饰键）

你也可以传递一个宽度和高度的元组来代替图像源。这将创建一个具有给定大小的空图像。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| source     | 图片源，可以是 URL, 本地文件路径，base64 编码的图片或者 PIL 图片 |
| content    | 需要叠加的SVG内容；视口尺寸与图像相同 |
| size       | 图像的像素尺寸 (宽度, 高度)；仅在未设置source时使用 |
| on_mouse   | 鼠标事件回调函数 (包含以像素为单位的图像坐标image_x和image_y) |
| events     | 需要订阅的JavaScript事件列表 (默认值: `['click']`) |
| cross      | 是否显示十字准线或颜色字符串 (默认值: `False`) |

```python
from nicegui import events, ui

def mouse_handler(e: events.MouseEventArguments):
    color = 'SkyBlue' if e.type == 'mousedown' else 'SteelBlue'
    ii.content += f'<circle cx="{e.image_x}" cy="{e.image_y}" r="15" fill="none" stroke="{color}" stroke-width="4" />'
    ui.notify(f'{e.type} at ({e.image_x:.1f}, {e.image_y:.1f})')

src = 'https://picsum.photos/id/565/640/360'
ii = ui.interactive_image(src, on_mouse=mouse_handler, events=['mousedown', 'mouseup'], cross=True)

ui.run()
```

## 音频 Audio

显示一个音频播放器。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| src        | 音频源的URL或本地文件路径 |
| controls   | 是否显示音频控制组件（如播放/暂停/音量等）(默认值: `True`) |
| autoplay   | 是否自动开始播放音频 (默认值: `False`) |
| muted      | 音频是否初始静音 (默认值: `False`) |
| loop       | 音频是否循环播放 (默认值: `False`) |

你可以看看 [audio - MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio#事件) 中的事件，并可使用 `.on()` 方法进行订阅。

```python
from nicegui import ui

a = ui.audio('https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3')
a.on('ended', lambda _: ui.notify('Audio playback completed'))

ui.button(on_click=lambda: a.props('muted'), icon='volume_off').props('outline')
ui.button(on_click=lambda: a.props(remove='muted'), icon='volume_up').props('outline')

ui.run()
```

## 视频 Video

显示一个视频。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| src        | 视频源的URL或本地文件路径 |
| controls   | 是否显示视频控制组件（如播放/暂停/音量等）(默认值: `True`) |
| autoplay   | 是否自动开始播放视频 (默认值: `False`) |
| muted      | 视频是否初始静音 (默认值: `False`) |
| loop       | 视频是否循环播放 (默认值: `False`) |

你可以看看 [video - MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#事件) 中的事件，并可使用 `.on()` 方法进行订阅。

## 图标 Icon

此元素基于 Quasar 的 [QIcon](https://quasar.dev/vue-components/icon) 组件。

您可以查阅 [Material Symbols & Icons - Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons)(中国大陆可能无法直接访问，建议挂代理) 来查看支持的图标。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| name       | 图标名称（使用蛇形命名法，如 `add_circle`） |
| size       | 图标尺寸（CSS单位，包含单位名称或标准尺寸名称 `xs/sm/md/lg/xl`，例如：`16px`, `2rem`） |
| color      | 图标颜色（可以是 Quasar、Tailwind 或 CSS 颜色值，或设为 None，默认值: `None`） |

```python
from nicegui import ui

ui.icon('thumb_up', color='primary').classes('text-5xl')

ui.run()
```

## 头像 Avatar

此元素基于 Quasar 的 [QAvatar](https://quasar.dev/vue-components/avatar) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| icon       | 图标名称或以"img:"为前缀的图片路径（如："map", "img:path/to/image.png"） |
| color      | 背景颜色（可以是Quasar、Tailwind或CSS颜色值，或设为None，默认值: `"primary"`） |
| text_color | 文字颜色（使用Quasar调色板中的颜色名称，如："primary", "teal-10"） |
| size       | 组件尺寸（CSS单位，包含单位名称或标准尺寸名称`xs|sm|md|lg|xl`，如："16px", "2rem"） |
| font_size  | 内容（图标/文字）尺寸（CSS单位，需包含单位名称，如："18px", "2rem"） |
| square     | 移除圆角使边框变为直角（默认值: `False`） |
| rounded    | 为组件添加小标准圆角（默认值: `False`） |

```python
from nicegui import ui

ui.avatar('favorite_border', text_color='grey-11', square=True)
ui.avatar('img:https://nicegui.io/logo_square.png', color='blue-2')

ui.run()
```

## SVG

您可通过 `ui.html()` 来添加 SVG 图片。

```python
from nicegui import ui

content = '''
    <svg viewBox="0 0 200 200" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="78" fill="#ffde34" stroke="black" stroke-width="3" />
    <circle cx="80" cy="85" r="8" />
    <circle cx="120" cy="85" r="8" />
    <path d="m60,120 C75,150 125,150 140,120" style="fill:none; stroke:black; stroke-width:8; stroke-linecap:round" />
    </svg>'''
ui.html(content)

ui.run()
```