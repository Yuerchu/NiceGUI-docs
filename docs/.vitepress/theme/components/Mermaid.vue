<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const svg = ref('')

// 动态 import 让 mermaid 单独成包，只有含图表的页面在挂载后才会下载
async function render() {
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({ startOnLoad: false, theme: isDark.value ? 'dark' : 'default' })
  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  svg.value = (await mermaid.render(id, decodeURIComponent(props.code))).svg
}

onMounted(render)
watch(isDark, render)
</script>

<template>
  <div class="mermaid" v-html="svg"></div>
</template>

<style scoped>
.mermaid {
  display: flex;
  justify-content: center;
  margin: 16px 0;
  overflow-x: auto;
}
</style>
