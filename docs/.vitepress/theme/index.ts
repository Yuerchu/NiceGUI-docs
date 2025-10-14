// .vitepress/theme/index.ts
import "@fontsource/maple-mono";
import './style/custom.css'

import Teek, { teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick, provide } from 'vue';
import { useRoute } from 'vitepress';

export default {
    extends: Teek, 
    setup() {
      provide(teekConfigContext, {});
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