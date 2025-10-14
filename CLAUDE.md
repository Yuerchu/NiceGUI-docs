# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **NiceGUI 中文网** (nicegui.cn), an unofficial Chinese documentation website for NiceGUI - a Python web UI framework. The project translates official NiceGUI documentation from English to Simplified Chinese using VitePress as the static site generator.

## Development Commands

### Local Development
```bash
yarn install          # Install dependencies
yarn docs:dev         # Start dev server (localhost)
yarn docs:build       # Build static site
yarn docs:preview     # Preview production build
```

### Node Version
This project uses Node.js 22 (specified in .github/workflows/deploy.yml:42).

## Architecture

### Site Structure
```
docs/
├── .vitepress/
│   ├── config.mts              # VitePress + Teek theme configuration
│   ├── theme/
│   │   ├── index.ts            # Theme setup with medium-zoom
│   │   └── style/              # Custom CSS styles
│   └── dist/                   # Build output (after yarn docs:build)
├── documentation/
│   ├── index.md                # Main documentation page
│   ├── quick_start.md          # Getting started guide
│   ├── section_*.md            # Section overview pages
│   └── elements/               # Individual element documentation
│       ├── button.md
│       ├── label.md
│       └── ... (UI element docs)
├── wiki/                       # Wiki pages
├── static/                     # Static assets (favicon, images)
└── index.md                    # Homepage
```

### Technology Stack
- **VitePress 1.6.3**: Static site generator
- **vitepress-theme-teek 1.5.0**: Custom VitePress theme
- **medium-zoom**: Image zoom functionality
- **Vuetify 3.9.7**: UI components (dependency)
- **@mdi/font**: Material Design Icons
- **Yarn**: Package manager

### Configuration Files

**docs/.vitepress/config.mts**: Main configuration file containing:
- Site metadata (title, description, sitemap)
- Navigation structure (nav, sidebar)
- Search configuration (local search with Chinese translations)
- Theme customization (Teek theme settings)
- Footer information (updated dates at line 300 - must be manually updated)
- Edit links pointing to GitHub repository

**docs/.vitepress/theme/index.ts**: Theme customization:
- Extends vitepress-theme-teek
- Integrates medium-zoom for image zooming
- Loads custom fonts (@fontsource/maple-mono)

### Deployment

**Automatic deployment via GitHub Actions** (.github/workflows/deploy.yml):
1. Triggers on push to `main` branch
2. Builds site with `yarn docs:build`
3. Copies `docs/static/*` to `docs/.vitepress/dist/`
4. Deploys to GitHub Pages

The workflow includes a critical step (lines 50-57) that copies static files after build.

### Content Organization

Documentation is organized hierarchically:
- **Section pages** (`section_*.md`): Overview pages for major topics
- **Element pages** (`elements/*.md`): Detailed documentation for individual UI components
- Sidebar navigation in config.mts (lines 77-291) maps the complete structure

### Important Notes

1. **Footer Date Updates**: When committing documentation changes, manually update the footer date in `docs/.vitepress/config.mts:300`

2. **Chinese Localization**: The site uses `lang: 'zh-CN'` and includes Chinese translations for all VitePress UI elements (search, navigation, 404 pages, etc.)

3. **Static Files**: The `docs/static/` directory contains favicons and must be copied to the build output directory during deployment

4. **Edit Links**: Configured to point to GitHub repository with pattern handling for different file paths (lines 304-313)

5. **Image Zoom**: All images in `.main` content area automatically have zoom functionality via medium-zoom

6. **Dead Links**: The config ignores dead links to `/documentation/elements` (lines 349-351)

## Translation Project Status

According to README.md:
- ✅ Basic documentation (11 pages) translated to Chinese
- 🔄 Current focus: Review and fix issues in basic documentation
- 🔜 Next: Translate all component documentation
- 🔜 Future: Review all translated content

The documentation explicitly notes it only supports NiceGUI 2.x versions, as 3.0 has been released but not yet translated (docs/documentation/index.md:10-14).
