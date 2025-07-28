# 配置与部署

## URLs

您可以通过 `app.urls` 访问 NiceGUI 应用可用的所有 URL 列表。由于服务器尚未运行，这些URL在 `app.on_startup` 中不可用。但您可以在页面函数中访问它们，或通过 `app.urls.on_change` 注册回调函数。

在使用本机模式时，默认只允许 localhost 访问，译者注

```python:line-numbers
from nicegui import app, ui

@ui.page('/')
def index():
    for url in app.urls:
        ui.link(url, target=url)

ui.run()
```

## ui.run

调用`ui.run()`时可传入可选参数。其中**大多数参数仅在完全停止并重启应用后生效**，自动重载时不会应用这些参数。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| host | 服务器启动的主机地址 (本机模式默认 `127.0.0.1` ，其他模式默认 `0.0.0.0`) |
| port | 使用的端口号 (普通模式默认 `8080`，本机模式自动选择可用端口) |
| title | 页面标题 (默认值: `'NiceGUI'`，可单独设置页面标题) |
| viewport | 页面 meta viewport 内容 (默认值: `'width=device-width, initial-scale=1'`，可单独设置) |
| favicon | 相对路径 `/` 绝对 URL 的 favicon (默认值: `None`，使用NiceGUI图标) 或emoji (如'🚀'，多数浏览器支持) |
| dark | 是否使用 Quasar 暗黑模式 (默认值: `False`，None表示"自动"模式) |
| language | Quasar 元素语言设置 (默认值: `'en-US'`) |
| binding_refresh_interval | 绑定更新的时间间隔 (默认值: `0.1`秒，数值越大 CPU 占用越低) |
| reconnect_timeout | 服务器等待浏览器重连的最长时间 (默认值: `3.0`秒) |
| message_history_length | 连接中断后重发的最大消息数 (默认值: `1000`，0 表示禁用) <Badge type="tip" text="^2.9.0" /> |
| cache_control_directives | 内部静态文件的缓存控制指令 (默认值: `'public, max-age=31536000, immutable, stale-while-revalidate=31536000'`) |
| fastapi_docs | 启用 FastAPI 自动文档 ( Swagger UI / ReDoc / OpenAPI JSON ) (布尔值或字典配置，默认值: `False`) <Badge type="tip" text="^2.9.0" /> |
| show | 自动在浏览器打开UI (默认值: `True`) |
| on_air | 技术预览：设置为 True 允许临时远程访问 (默认禁用) |
| native | 在本机窗口打开 UI (默认值: `False`，会禁用 show 并自动选择端口，窗口大小默认为 800x600 尺寸，可通过 `window_size` 参数修改) |
| window_size | 指定本机模式的窗口尺寸 (如(1024,768)，默认值: `None`，会激活 native 模式) |
| fullscreen | 全屏窗口模式 (默认值: `False`，会激活 native 模式) |
| frameless | 无边框窗口模式 (默认值: `False`，会激活 native 模式) |
| reload | 文件变更时自动重载 UI (默认值: `True`) |
| uvicorn_logging_level | uvicorn 服务器日志级别 (默认值: `'warning'`) |
| uvicorn_reload_dirs | 监控目录列表 (逗号分隔，默认仅当前工作目录) |
| uvicorn_reload_includes | 触发重载的 glob 文件模式 (逗号分隔，默认值: `'*.py'`) |
| uvicorn_reload_excludes | 忽略重载的 glob 文件模式 (逗号分隔，默认值: `'.*, .py[cod], .sw.*, ~*'`) |
| tailwind | 是否使用 Tailwind (实验性功能，默认值: `True`) |
| prod_js | 是否使用 Vue 和 Quasar 的生产版本依赖 (默认值: `True`) |
| endpoint_documentation | 控制自动生成 OpenAPI 文档的端点范围 (默认值: `'none'`，可选: `'none'`, `'internal'`, `'page'`, `'all'`) |
| storage_secret | 浏览器存储的密钥 (默认值: `None`，需设置值才能启用 `ui.storage.individual` 和 `ui.storage.browser`) |
| show_welcome_message | 是否显示欢迎信息 (默认值: `True`) |
| kwargs | 其他传递给 `uvicorn.run` 的关键字参数 |

```python:line-numbers
from nicegui import ui

ui.label('page with custom title')

ui.run(title='My App')
```

## 本机模式 Native Mode

通过在 `ui.run` 函数中设置 `native=True` ，您可以启用 NiceGUI 的本机模式。要自定义初始窗口大小和显示模式，可分别使用 `window_size` 和 `fullscreen` 参数。此外，您还能通过 `app.native.window_args` 和 `app.native.start_args` 传递额外的关键字参数。这些参数需遵循内部使用的 pywebview 模块为 `webview.create_window` 和 `webview.start` 函数定义的规范。请注意，这些关键字参数将优先于 `ui.run` 中定义的参数生效。

您还可以通过 `app.native.settings` 修改 `webview.settings` 。

在本机模式下，`app.native.main_window` 对象允许您访问底层窗口，它是 [pywebview 中 Window 类的异步版本](https://pywebview.flowrl.com/api/#webview-window)。

您需要使用 `pip install pywebview` 来安装 pywebview 依赖，译者注

```python:line-numbers
from nicegui import app, ui

app.native.window_args['resizable'] = False
app.native.start_args['debug'] = True
app.native.settings['ALLOW_DOWNLOADS'] = True

ui.label('app running in native mode')
ui.button('enlarge', on_click=lambda: app.native.main_window.resize(1000, 700))

ui.run(native=True, window_size=(400, 300), fullscreen=False)
```

请注意，本机应用运行在独立[进程](https://docs.python.org/3/library/multiprocessing.html#multiprocessing.Process)中。因此，在[主守卫](https://docs.python.org/3/library/__main__.html#idiomatic-usage)下运行的代码所做的任何配置更改都会被本机应用忽略。以下示例展示了有效配置与无效配置的区别。

```python:line-numbers
# -*- 正确的示例 -*-
from nicegui import app, ui

app.native.window_args['resizable'] = False  # 正确工作

if __name__ == '__main__':
    ui.run(native=True, reload=False)


# -*- 错误的示例 -*-
from nicegui import app, ui

if __name__ == '__main__':
    app.native.window_args['resizable'] = False  # 将会被忽略

    ui.run(native=True, reload=False)
```

如果 webview 在查找所需库时遇到问题，可能会出现与 `WebView2Loader.dll` 相关的错误。要解决此问题，可以尝试将 DLL 文件向上移动一个目录，例如：

- 从 `.venv/Lib/site-packages/webview/lib/x64/WebView2Loader.dll`
- 移动到 `.venv/Lib/site-packages/webview/lib/WebView2Loader.dll`

## 环境变量读取

您可以通过设置以下环境变量来配置NiceGUI：

- MATPLOTLIB（默认值：`true`）可设为 `false` 以避免可能耗时的 Matplotlib 导入，这将导致 `ui.pyplot` 和 `ui.line_plot` 功能不可用。
- NICEGUI_STORAGE_PATH（默认值：`./.nicegui`）可修改存储文件的存放路径。
- MARKDOWN_CONTENT_CACHE_SIZE（默认值：`1000`）：内存中缓存的 Markdown 内容片段的最大数量。
- RST_CONTENT_CACHE_SIZE（默认值：`1000`）：内存中缓存的 ReStructuredText 内容片段的最大数量。
- NICEGUI_REDIS_URL（默认值：`None`，表示使用本地文件存储）：用于共享持久化存储的 Redis 服务器 URL。
- NICEGUI_REDIS_KEY_PREFIX（默认值："nicegui:"）：Redis 键的前缀。

```python:line-numbers
from nicegui import ui
from nicegui.elements import markdown

ui.label(f'Markdown content cache size is {markdown.prepare_content.cache_info().maxsize}')

ui.run()
```

## 后台任务 Background Tasks

`background_tasks.create()` 允许你在后台运行异步函数并返回一个任务对象。默认情况下，任务会在应用关闭时自动取消。

<Badge type="tip" text="^2.16.0" /> 您可以通过使用 `@background_tasks.await_on_shutdown` 装饰器来防止这种情况。这对于即使在应用关闭时也需要完成的任务非常有用。

```python:line-numbers
import aiofiles
import asyncio
from nicegui import background_tasks, ui

results = {'answer': '?'}

async def compute() -> None:
    await asyncio.sleep(1)
    results['answer'] = 42

@background_tasks.await_on_shutdown
async def backup() -> None:
    await asyncio.sleep(1)
    async with aiofiles.open('backup.json', 'w') as f:
        await f.write(f'{results["answer"]}')
    print('backup.json written', flush=True)

ui.label().bind_text_from(results, 'answer', lambda x: f'answer: {x}')
ui.button('Compute', on_click=lambda: background_tasks.create(compute()))
ui.button('Backup', on_click=lambda: background_tasks.create(backup()))

ui.run()
```

## 自定义 Vue 组件

您可以通过继承 `ui.element` 类并实现对应的 Vue 组件来创建自定义组件。["自定义Vue组件"](https://github.com/zauberzeug/nicegui/tree/main/examples/custom_vue_component)示例展示了如何创建一个能触发事件并接收服务端更新的计数器组件。

["签名板"](https://github.com/zauberzeug/nicegui/blob/main/examples/signature_pad)示例演示了如何使用 `package.json` 文件为自定义组件定义依赖项，这使您能在组件中通过 NPM 使用第三方库。

最后但同样重要的是，["Node模块集成"](https://github.com/zauberzeug/nicegui/blob/main/examples/node_module_integration)示例说明了如何创建 `package.json` 文件和 `webpack.config.js` 文件，将自定义 Vue 组件及其依赖项打包。

## 服务主机 Server Hosting

要在服务器上部署您的 NiceGUI 应用，您需要在云基础设施上运行 `main.py`（或包含 `ui.run(...)` 的文件）。例如，您只需通过 pip 安装 NiceGUI Python 包，并使用 `systemd`, `systemctl`, `supervisor` 或类似服务启动主脚本。大多数情况下，您会在 `ui.run` 命令中将端口设置为 80（或443，如需使用 HTTPS ），以便外部轻松访问。

另一种便捷方式是使用我们[预构建的多架构 Docker 镜像](https://hub.docker.com/r/zauberzeug/nicegui)，其中包含所有必要的依赖项。通过以下命令，您可以在当前目录下启动 `main.py` 脚本，并将其映射到公共端口 `80`：

```bash:line-numbers
docker run -it --restart always \
-p 80:8080 \
-e PUID=$(id -u) \
-e PGID=$(id -g) \
-v $(pwd)/:/app/ \
zauberzeug/nicegui:latest
```

这段示例脚本假设 `main.py` 在 `ui.run` 命令中使用了 `8080` 端口（这是默认设置）。`-d` 参数指示 Docker 在后台运行，而 `--restart always` 确保如果应用崩溃或服务器重启，容器会自动重新启动。当然，这些配置也可以写入 `Docker compose` 文件中：

```yml:line-numbers
app:
    image: zauberzeug/nicegui:latest
    restart: always
    ports:
        - 80:8080
    environment:
        - PUID=1000 # change this to your user id
        - PGID=1000 # change this to your group id
    volumes:
        - ./:/app/
```

Docker 镜像中还包含其他实用功能，例如非 root 用户执行和信号透传。更多详情建议参考我们的 [Docker 示例](https://github.com/zauberzeug/nicegui/tree/main/examples/docker_image)。

要为您的应用[启用 HTTPS 加密](https://fastapi.tiangolo.com/zh/deployment/https/)，您可以通过多种方式提供 SSL 证书。例如，您可以直接将证书传递给 NiceGUI 所基于的 [Uvicorn](https://www.uvicorn.org/)（译者不太建议，除非您的服务器有且只有一个网络服务，否则译者更建议将 SSL 交由 Nginx 一类的程序接管），只需向 `ui.run()` [传递相关选项](https://www.uvicorn.org/#command-line-options)即可。若同时提供了证书文件和密钥文件，应用将自动通过 HTTPS 协议提供服务：

```python:line-numbers
from nicegui import ui

ui.run(
    port=443,
    ssl_certfile="<证书目录>",
    ssl_keyfile="<私钥目录( PEM 格式)>",
)
```

在生产环境中，我们也倾向于使用如 [Traefik](https://doc.traefik.io/traefik/) 或 [NGINX](https://www.nginx.com/) 这样的反向代理来为我们处理这些细节。可以参考我们基于 Traefik 开发的 [docker-compose.yml](https://github.com/zauberzeug/nicegui/blob/main/docker-compose.yml) 示例，或是这个展示如何用 NGINX 管理 SSL 证书并反向代理至 NiceGUI 应用的 [nginx.conf](https://github.com/zauberzeug/nicegui/blob/main/docker-compose.yml) 文件示例。

此外，您也可以查看我们关于[使用自定义 FastAPI 应用](https://github.com/zauberzeug/nicegui/tree/main/examples/fastapi)的演示。这将使您能够按照 [FastAPI 文档](https://fastapi.tiangolo.com/deployment/)中描述的方式进行高度灵活的部署。需要注意的是，启用多工作进程还需执行额外步骤。

## 打包与安装

NiceGUI 应用也能通过基于 PyInstaller 的 nicegui-pack 工具打包成可执行文件。这样你就可以将应用作为单一文件分发，在任何电脑上运行。

只需确保在主脚本中调用 `ui.run` 时设置 `reload=False`以禁用自动重载功能（NiceGUI 默认启用了自动重载。在 FastAPI 文档中提到，这是相当不推荐的，可能遇到一些奇奇怪怪的问题，译者注）。运行下面的 `nicegui-pack` 命令后，将在 dist 文件夹中生成名为 myapp 的可执行文件：

```python:line-numbers
from nicegui import native, ui

ui.label('Hello from PyInstaller')

ui.run(reload=False, port=native.find_open_port())
```

```bash
nicegui-pack --onefile --name "myapp" main.py
```

打包提示：

- 构建PyInstaller应用时，主脚本可通过 `ui.run(reload=False, native=True)` 使用本机窗口（而非浏览器窗口）。`native` 参数可设为 `True` 或 `False`，取决于您需要本机窗口还是用户浏览器打开页面——两者在 PyInstaller 生成的应用中均可使用。
- 为 `nicegui-pack` 指定 `--windowed` 参数可阻止终端控制台显示。但仅当您在 `ui.run` 命令中同时设置 `native=True` 时才应使用此选项。若无终端控制台，用户将无法通过 Ctrl-C 退出应用。当 `native=True` 时，应用会如预期在窗口关闭时自动退出。
- 为 `nicegui-pack` 指定 `--windowed` 参数将在 Mac 上生成 .app 文件，便于分发。双击运行时不会显示控制台输出。您也可通过命令行 `./myapp.app/Contents/MacOS/myapp` 运行以查看控制台输出。
- 为 `nicegui-pack` 指定 `--onefile` 参数将生成单个可执行文件。虽然便于分发，但启动速度较慢。这并非 NiceGUI 的问题，而是 Pyinstaller 将内容压缩为单个文件后，需先解压至临时目录再运行所致。您可通过移除 `nicegui-pack` 命令中的 `--onefile` 参数自行压缩生成的 dist 目录来缓解此问题，用户解压一次即可使用，避免因 `--onefile` 标志导致的反复文件解压。
- 不同选项下的用户体验总结：

| `nicegui-pack` 参数 | `ui.run(...)` 参数 | 说明 |
|------------------|-----------------|------|
| onefile | native=False | 在 dist/ 目录生成单个可执行文件，在浏览器中运行 |
| onefile | native=True | 在 dist/ 目录生成单个可执行文件，在弹出窗口中运行 |
| onefile 和 windowed | native=True | 在 dist/ 目录生成单个可执行文件（Mac 上会生成完整的 dist/myapp.app 包含图标），在弹出窗口中运行，不显示控制台 |
| onefile 和 windowed | native=False | 避免使用（无法退出应用） |
| 不指定任何参数 | - | 创建 dist/myapp 目录，可手动压缩分发；通过 dist/myapp/myapp 运行 |

- 若您在使用 Python 虚拟环境，请确保在虚拟环境中通过 pip 安装 pyinstaller，以便使用正确的 PyInstaller 版本。否则，可能会因误用错误版本的 PyInstaller 而导致生成的应用损坏。正因如此，nicegui-pack 通过 `python -m PyInstaller` 而非直接调用 `pyinstaller` 来执行 PyInstaller。

```bash
python -m venv venv
source venv/bin/activate
pip install nicegui
pip install pyinstaller
```

::: tip 注意
如果遇到错误 `TypeError: a bytes-like object is required, not 'str'`，请尝试在 main.py 文件顶部添加以下代码：

```python
import sys
sys.stdout = open('logs.txt', 'w')
```

[查看更多↗](https://github.com/zauberzeug/nicegui/issues/681)
:::

### macOS打包支持

为防止新进程在无限循环中生成，请在你的主应用文件最顶部添加以下代码片段：

```python
# macOS打包支持
from multiprocessing import freeze_support  # noqa
freeze_support()  # noqa

# 其他所有导入和代码
```

`# noqa` 注释指示 Pylance 或 autopep8 不要对这两行应用任何 PEP 规则，确保它们始终位于其他代码之前。这是防止进程生成的关键。

## NiceGUI On Air

::: tip 提示
中国大陆用这个约等于减速器，除非您对速度没太多要求，不然译者建议您选择中国大陆的独立服务器~
:::

通过使用 `ui.run(on_air=True)`，您可以通过互联网与他人分享本地应用🧞。

访问实时 URL 时，所有库（如 Vue、Quasar 等）均从我们的 CDN 加载。因此，您的本地应用只需传输原始内容和事件。这使得即使应用网络条件较差（例如野外移动机器人），也能实现极速响应。

设置 `on_air=True` 将获得一个有效期 1 小时的随机 URL 。若在 https://on-air.nicegui.io 注册，可设置组织名称和设备名称来获取固定 URL：https://on-air.nicegui.io/<我的组织>/<我的设备名>。设备将通过唯一私密令牌标识，您可用该令牌替代布尔标志：`ui.run(on_air='<您的令牌>')`。赞助我们将解锁多设备管理功能，并为每台设备提供内置密码保护。

当前 On Air 作为技术预览免费开放。我们将逐步提升稳定性，并扩展服务至使用统计、远程终端访问等功能。欢迎通过 GitHub、Reddit 或 Discord 反馈意见。

**数据隐私**：我们极其重视您的隐私。NiceGUI On Air 不会记录或存储任何中继数据内容。