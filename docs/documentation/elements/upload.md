# 文件上传 File Upload

此元素基于 Quasar 的 [QUploader](https://quasar.dev/vue-components/uploader) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| multiple | 是否允许一次性上传多个文件 (默认值: `False`) |
| max_file_size | 单个文件的最大大小 (单位: 字节) (默认值: `0`) |
| max_total_size | 所有文件总大小的上限 (单位: 字节) (默认值: `0`) |
| max_files | 最大文件数量限制 (默认值: `0`) |
| on_upload | 每个文件上传完成后执行的回调函数 |
| on_multi_upload | 多个文件全部上传完成后执行的回调函数 |
| on_rejected | 每个被拒绝的文件执行的回调函数 |
| label | 上传组件的标签文字 (默认值: `''`) |
| auto_upload | 选择文件后自动上传 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

ui.upload(on_upload=lambda e: ui.notify(f'已上传 {e.name}')).classes('max-w-full')

ui.run()
```

## 上传限制

在此演示中，上传限制为最大文件大小 1 MB。当文件被拒绝时，会显示通知。

```python:line-numbers
from nicegui import ui

ui.upload(on_upload=lambda e: ui.notify(f'已上传 {e.name}'),
          on_rejected=lambda: ui.notify('文件被拒绝！'),
          max_file_size=1_000_000).classes('max-w-full')

ui.run()
```

## 显示文件内容

在此演示中，上传的 Markdown 文件会在对话框中显示。

```python:line-numbers
from nicegui import ui, events

with ui.dialog().props('full-width') as dialog:
    with ui.card():
        markdown = ui.markdown()

async def handle_upload(e: events.UploadEventArguments):
    markdown.content = await e.file.text()
    dialog.open()

ui.upload(on_upload=handle_upload, max_file_size=1_000_000) \
    .props('accept=.md').classes('max-w-full')

ui.run()
```

## 上传大文件

大文件上传可能会遇到问题，因为底层 Starlette 库中设置了默认的文件大小参数。为了确保顺利上传较大的文件，建议将 Starlette 的 `MultiPartParser` 类中的 `spool_max_size` 参数从默认的 `1024 * 1024`（1 MB）增加到与预期文件大小一致的更高限制。

此演示将 Starlette Multiparser 保留在 RAM 中的 `max_file_size` 增加到 5 MB。此更改允许系统通过将文件保留在 RAM 中来更有效地处理较大的文件，从而避免将数据写入磁盘上的临时文件并防止上传"卡顿"。

但是，在允许用户上传大文件并将其保留在 RAM 中时，请注意对服务器的潜在影响。

```python:line-numbers
from nicegui import ui
from starlette.formparsers import MultiPartParser

MultiPartParser.spool_max_size = 1024 * 1024 * 5  # 5 MB

ui.upload(on_upload=lambda e: ui.notify(f'已上传 {e.name}')).classes('max-w-full')

ui.run()
```
