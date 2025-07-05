import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "NiceGUI 中文网",
  description: "一个非官方的 NiceGUI 中文文档站",
  head: [
    [
      'link', { rel: 'icon', href: '/static/favicon/favicon.ico' }
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // Logo
    logo: '/static/favicon/android-chrome-384x384.png',
    
    // 启用搜索
    search: {provider: 'local'},
    
    // 顶部栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/documentation' },
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
              }
            ]
          },
          {
            text: '控制元素',
            link: '/documentation/section_controls',
            items: []
          }
        ]
      }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zauberzeug/nicegui/' }
    ],

    // 页脚
    footer: {
      copyright: 'Copyright © 2018-present <a href="https://www.yxqi.cn">于小丘Yuerchu</a> and <a href="https://www.zauberzeug.com/">Zauberzeug</a>。',
      message: '<a href="https://beian.miit.gov.cn/">粤ICP备2024285776号-2</a> · <a href="http://www.beian.gov.cn/">粤公网安备 44020302000232 号</a>',
    },

    // 编辑链接
    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/Yuerchu/NiceGUI_docs/edit/main/${filePath}`
        } else {
          return `https://github.com/Yuerchu/NiceGUI_docs/edit/main/docs/${filePath}`
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

    // 移动端 - 外观
    darkModeSwitchLabel: '外观',

    // 移动端 - 返回顶部
    returnToTopLabel: '返回顶部',

    // 移动端 - menu
    sidebarMenuLabel: '菜单',

  },
})
