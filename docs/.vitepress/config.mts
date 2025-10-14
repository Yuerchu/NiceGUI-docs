import { defineConfig } from 'vitepress'
import { createRewrites, defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
  teekHome: false,
  windowTransition: true,
  author: {
    name: "Yuerchu",
    link: "https://github.com/Yuerchu"
  },
  footerInfo: {
    copyright: {
      show: true,
      createYear: 2018,
      suffix: "于小丘 Yuerchu"
    }
  },
  vitePlugins: {
    sidebar: false,
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: "NiceGUI 中文网",
  description: "一个非官方的 NiceGUI 中文文档站",
  sitemap: {
    hostname: 'https://nicegui.cn',
  },
  head: [
    [
      'link', { rel: 'icon', href: '/static/favicon/favicon.ico' } // 站点图标
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // Logo
    logo: '/static/favicon/android-chrome-384x384.png',
    
    // 启用搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索',
            footer: {
              selectText: '选择',
              navigateText: '导航',
              closeText: '关闭',
            },
          },
        }
      }
    },
    
    // 顶部栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'NiceGUI 文档', link: '/documentation' },
      { text: 'NiceGUI Wiki', link: '/wiki' },
      { text: '官方网站(English)', link: 'https://nicegui.io/' },
      { text: '中文文档 GitHub', link: 'https://github.com/Yuerchu/NiceGUI-docs'}
    ],

    // 侧边栏
    sidebar: [
      {
        text: '文档',
        link: '/documentation',
      },
      {
        text: '快速开始',
        link: '/documentation/quick_start',
      },
      {
        text: '组件',
        items: [
          { text: '文本元素',
            link: '/documentation/section_text_elements',
            items: [
              {
                text: '文本 Label',
                link: '/documentation/elements/label',
              },
              {
                text: '超链接 Link',
                link: '/documentation/elements/link',
              },
              {
                text: '聊天消息 Chat Message',
                link: '/documentation/elements/chat_message',
              },
              {
                text: '通用元素 Generic Element',
                link: '/documentation/elements/element',
              },
              {
                text: 'Markdown',
                link: '/documentation/elements/markdown',
              },
              {
                text: 'reSTructured 文本',
                link: '/documentation/elements/restructured_text',
              },
              {
                text: '美人鱼图 Mermaid',
                link: '/documentation/elements/mermaid',
              },
              {
                text: 'HTML',
                link: '/documentation/elements/html',
              },
              {
                text: '其他 HTML 元素',
                link: '/documentation/section_text_elements.html#other_html_elements',
              }
            ]
          },
          {
            text: '控制元素',
            link: '/documentation/section_controls',
            items: [
              {
                text: '按钮 Button',
                link: '/documentation/elements/button',
              },
              {
                text: '按钮组 Button Group',
                link: '/documentation/elements/button_group',
              },
              {
                text: '下拉按钮 Dropdown Button',
                link: '/documentation/elements/button_dropdown',
              },
              {
                text: '浮动按钮 FAB',
                link: '/documentation/elements/fab',
              },
              {
                text: '标签 Badge',
                link: '/documentation/elements/badge',
              },
              {
                text: '小标签 Chip',
                link: '/documentation/elements/chip',
              },
              {
                text: '切换器 Toggle',
                link: '/documentation/elements/toggle',
              },
              {
                text: '单项选择器 Radio Selection',
                link: '/documentation/elements/radio',
              },
              {
                text: '下拉选择器 Dropdown Selection',
                link: '/documentation/elements/select',
              },
              {
                text: '芯片输入器 Input Chips',
                link: '/documentation/elements/input_chips',
              },
              {
                text: '复选框 Checkbox',
                link: '/documentation/elements/checkbox',
              },
              {
                text: '开关 Switch',
                link: '/documentation/elements/switch',
              },
              {
                text: '滑块 Slider',
                link: '/documentation/elements/slider',
              },
              {
                text: '范围选择器 Range',
                link: '/documentation/elements/range',
              },
              {
                text: '评分 Rating',
                link: '/documentation/elements/rating',
              },
              {
                text: '虚拟摇杆 Joystick',
                link: '/documentation/elements/joystick',
              },
              {
                text: '文本输入框 Text Input',
                link: '/documentation/elements/input',
              },
              {
                text: '多行文本输入框 Textarea',
                link: '/documentation/elements/textarea',
              },
              {
                text: '代码编辑器 CodeMirror',
                link: '/documentation/elements/codemirror',
              },
              {
                text: '数字输入器 Number Input',
                link: '/documentation/elements/number',
              },
              {
                text: '旋钮 Knob',
                link: '/documentation/elements/knob',
              },
              {
                text: '颜色输入器 Color Input',
                link: '/documentation/elements/color_input',
              },
              {
                text: '颜色选择器 Color Picker',
                link: '/documentation/elements/color_picker',
              },
              {
                text: '日期选择器 Date Input',
                link: '/documentation/elements/date',
              },
              {
                text: '时间选择器 Time Input',
                link: '/documentation/elements/time',
              },
              {
                text: '文件上传器 File Upload',
                link: '/documentation/elements/upload',
              },
            ]
          },
          {
            text: '视听元素',
            link: '/documentation/section_audiovisual_elements',
            items: []
          },
          {
            text: '数据元素',
            link: '/documentation/section_data_elements',
            items: []
          },
          {
            text: '绑定属性',
            link: '/documentation/section_binding_properties',
            items: []
          },
          {
            text: '页面布局',
            link: '/documentation/section_page_layout',
            items: []
          },
          {
            text: '造型与外观',
            link: '/documentation/section_styling_appearance',
            items: []
          },
          {
            text: '动作与事件',
            link: '/documentation/section_action_events',
            items: []
          },
          {
            text: '页面与路由',
            link: '/documentation/section_pages_routing',
            items: []
          },
          {
            text: '配置与部署',
            link: '/documentation/section_configuration_deployment',
            items: []
          },
          {
            text: '测试',
            link: '/documentation/section_testing',
            items: []
          }
        ]
      },
      {
        text: '印记',
        link: '/imprint_privacy',
      },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zauberzeug/nicegui/' }
    ],

    // 页脚
    footer: {
      message: '更新日期: 2025 年 10 月 15 日', // 每次提交都记得在这里改一下时间和日期
    },

    // 编辑链接
    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/Yuerchu/NiceGUI-docs/edit/main/${filePath}`
        } else {
          return `https://github.com/Yuerchu/NiceGUI-docs/edit/main/docs/${filePath}`
        }
      },
      text: '在 GitHub 上编辑此页面',
    },

    // 翻译
    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 外观
    darkModeSwitchLabel: '外观',

    // 当前页面
    outline: {
      label: '当前页面',
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // menu
    sidebarMenuLabel: '菜单',

    // 搜索

    // 404
    notFound: {
      title: '页面未找到',
      quote: 'HTTP 404 - Page Not Found',
      linkText: '返回首页'
    }

  },
  
  rewrites: createRewrites(),

  ignoreDeadLinks: [
    '/documentation/elements'
  ]
})