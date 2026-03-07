# 终端模拟器 `Xterm` <Badge type="tip" text="^3.1.0" />

此元素是对 [xterm.js](https://github.com/xtermjs/xterm.js) 的封装，用于模拟终端。

注意：此元素仅提供前端组件，不包含底层 shell。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 用于配置终端的选项字典，详见 [xterm.js 文档](https://xtermjs.org/docs/api/terminal/classes/terminal/#constructor) |

```python:line-numbers
from nicegui import ui

terminal = ui.xterm({'cols': 30, 'rows': 9})
ui.timer(0, lambda: terminal.write('Hello NiceGUI!'), once=True)

ui.run()
```

### 使用 ANSI 转义码

Xterm 可以解析 ANSI 转义码来设置终端中文本的样式。使用 `writeln` 方法代替 `write` 可以在文本后自动添加换行符和回车符。

```python:line-numbers
from nicegui import ui

terminal = ui.xterm({'cols': 30, 'rows': 9})
ui.button('添加普通文本', on_click=lambda: terminal.writeln('这是普通文本。'))
ui.button('添加蓝色文本', on_click=lambda: terminal.writeln('\x1b[34m这是蓝色文本！\x1b[0m'))
ui.button('添加粗体文本', on_click=lambda: terminal.writeln('\x1b[1m这是粗体文本！\x1b[0m'))

ui.run()
```

### 订阅事件

Xterm 在您在终端中输入或粘贴文本时会触发 "data" 事件。通常，您会将这些数据传递给 pty 或类似的后端进行处理（参见 [Xterm 示例](https://github.com/zauberzeug/nicegui/blob/main/examples/xterm/main.py)）。但您也可以将此事件连接到终端的 `write` 方法，以便在终端中查看数据。请注意，此演示替换了一些字符，这些字符通常由 pty 处理（换行和退格）。

您还可以处理 "bell" 事件，例如在终端的响铃被触发时播放声音（如按下 `Ctrl-G`）。此演示改为显示通知。

```python:line-numbers
from nicegui import ui

terminal = ui.xterm({'cols': 30, 'rows': 9})
terminal.on_data(lambda e: terminal.write(e.data.replace('\r', '\n\r').replace('\x7f', '\x1b[0D\x1b[0K')))
terminal.on_bell(lambda: ui.notify('🔔'))

ui.run()
```

### 自动调整终端大小

您可以使用 `fit` 方法调整终端大小，使其行数和列数与容器的尺寸匹配。请注意，您可能还需要调整后备 pty 的大小以匹配终端的新尺寸，这可以通过订阅终端的 `resize` 事件来实现。另外请注意，原生 `pty` 模块不支持调整大小。

```python:line-numbers
from nicegui import ui

with ui.card().classes('size-60 resize overflow-auto'):
    terminal = ui.xterm().classes('size-full')
    ui.element('q-resize-observer').on('resize', terminal.fit)

label = ui.label()
terminal.on('resize', lambda e: label.set_text(f'大小: {e.args["cols"]}x{e.args["rows"]}'))

ui.run()
```

### 显示子进程输出

您可以将子进程的输出连接到终端。请注意，`subprocess.PIPE` 会将输出缓冲在内存中的 `StreamReader` 对象中。如果您希望子进程表现得像在终端中运行一样，可能需要使用 pty。`convertEol` 参数会自动将换行符（`\n`）转换为回车符 + 换行符（`\r\n`），确保在显示子进程输出时正确换行。

```python:line-numbers
import asyncio
from nicegui import ui

async def run_subprocess():
    button.disable()
    process = await asyncio.create_subprocess_exec(
        'python3', '-u', '-c',
        (
            'import time\n'
            'for i in range(5):\n'
            '    print(f"步骤 {i+1}/5: 处理中...")\n'
            '    time.sleep(0.5)\n'
            'print("\\x1b[32m✓ 所有步骤已完成！\\x1b[0m")'
        ),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    async def write_to_terminal(stream: asyncio.StreamReader) -> None:
        while chunk := await stream.read(128):
            terminal.write(chunk)

    await asyncio.gather(
        write_to_terminal(process.stdout),
        write_to_terminal(process.stderr),
        process.wait(),
    )
    button.enable()

terminal = ui.xterm({'cols': 30, 'rows': 9, 'convertEol': True})
button = ui.button('运行子进程', on_click=run_subprocess)

ui.run()
```
