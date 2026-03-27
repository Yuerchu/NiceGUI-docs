// .vitepress/theme/index.ts
import "@fontsource/maple-mono";
import './style/custom.css'
import './style/var.css'

import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import CopyOrDownloadAsMarkdownButtons from "vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue";

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
      app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons);
    },
    setup() {
      const route = useRoute();
      const initZoom = () => {
        mediumZoom(".main img", { background: "var(--vp-c-bg)" });
      };
      onMounted(() => {
        initZoom();
      });
      watch(
        () => route.path,
        () => nextTick(() => initZoom())
      );
    },
}
