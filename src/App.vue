<script setup lang="ts">
import { ref } from "vue";
import { Layout, LayoutSider, LayoutHeader, LayoutContent, ConfigProvider } from "ant-design-vue";
import BotConfig from './components/BotConfig.vue'
import BotLogs from "./components/BotLogs.vue";
const activeTab = ref('config')
const logPath = ref('')
const changeTab = (val: string) => {
  activeTab.value = val
}
const updateLogPath = (val: string) => {
  console.log('log path', val)
  logPath.value = val;
}
</script>

<template>
  <ConfigProvider :theme="{hashed: false}">
  <Layout class="tw-h-full tw-bg-white">
    <Layout style="background: transparent">
      <LayoutSider class="tw-border-r tw-border-app-grey-2 tw-relative side-menu">
        <LayoutHeader class="!tw-bg-transparent !tw-px-2 tw-py-3  tw-flex tw-justify-between ">
          <div class="tw-flex tw-items-center tw-px-3 tw-w-full tw-justify-center">
            <img src="/logo.png" alt="logo" class="tw-w-[50px]">
            <span class="tw-font-bold tw-text-sm">智能微秘书</span>
          </div>
        </LayoutHeader>
        <div class="tw-py-4 tw-px-5 tw-z-2">
          <ul class="tw-space-y-2">
            <li class="tw-w-200px tw-cursor-pointer tw-text-center tw-py-2" :class="activeTab === 'config'?'tw-text-app-blue-3 tw-border-app-blue-3':'tw-text-app-black-1'" @click="changeTab('config')">配置</li>
            <li class="tw-w-200px tw-cursor-pointer tw-text-center tw-py-2" :class="activeTab === 'log'?'tw-text-app-blue-3 tw-border-app-blue-3':'tw-text-app-black-1'" @click="changeTab('log')">日志</li>
          </ul>
        </div>
        <div class="tw-absolute tw-bottom-2 tw-right-2 tw-text-app-grey-1 tw-text-xs">
          <div class="tw-text-right"><a href="https://wechat.aibotk.com" target="_blank">官网</a></div>
          <div>版本：V4.6.2</div>
        </div>
      </LayoutSider>
      <LayoutContent class="tw-p-2" style="background: transparent">
        <BotConfig v-show="activeTab === 'config'" @updateLog="updateLogPath"/>
        <BotLogs v-show="activeTab === 'log'" :log-path="logPath"/>
      </LayoutContent>
    </Layout>
  </Layout>
  </ConfigProvider>
</template>

<style scoped>
.side-menu {
  background-image: url("/bg.png");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 50%;
  background-color: white;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
