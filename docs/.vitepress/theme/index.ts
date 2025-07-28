// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { Underline, BoxCube, Card, Links, Pill } from '@theojs/lumen'
import '@theojs/lumen/style'
import "@fontsource/maple-mono";
import './style/custom.css'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
    extends: DefaultTheme, 
    enhanceApp: ({ app }) => {
      app.component('Home', Underline)
      app.component('Pill', Pill) 
      app.component('Links', Links) 
      app.component('Card', Card) 
      app.component('BoxCube', BoxCube)
    },
    setup() {
      const route = useRoute();
      const initZoom = () => {
        // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
        mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
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