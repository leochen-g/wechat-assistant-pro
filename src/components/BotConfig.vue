<script setup lang="ts">
import {reactive, ref, computed, defineEmits, onMounted } from 'vue'
import {ipcRenderer} from 'electron'
import {Button, Form, FormItem, Input, RadioGroup, Radio, Select, SelectOption, Switch, Tooltip, } from "ant-design-vue";
import {PuppetTypeEnum} from "../const";
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const living = ref(false);
const emit = defineEmits(['updateLog'])

const isWindows = () => {
  return /windows|win32/i.test(navigator.userAgent);
};

const puppetList = computed(() => {
  return [
    {label: '免费web协议', value: PuppetTypeEnum.wechat4u, disabled: false},
    {
      label: `免费windows协议${!isWindows() ? '(仅限windows系统使用)' : ''}`,
      value: PuppetTypeEnum.windows,
      disabled: !isWindows()
    },
    {label: '免费公众号协议', value: PuppetTypeEnum.office, disabled: false},
    {label: '免费WhatsApp协议', value: PuppetTypeEnum.whatsapp, disabled: false},
    {label: '付费ipad协议', value: PuppetTypeEnum.ipad, disabled: false},
    {label: '付费企微协议', value: PuppetTypeEnum.worker, disabled: false},
  ]
})

let formState = ref({
  puppetType: 'wechaty-puppet-wechat4u',
  // 微秘书配置
  apiKey: '',
  apiSecret: '',
  // ipad token
  padToken: '',
  // 企微 token
  workerToken: '',
  // windows 相关配置
  hookPort: '8089',
  serverPort: '8055',
  // 公众号相关配置
  appId: '', // 公众号appid
  appSecret: '', // 公众号appSecret
  appToken: '', // 公众号加密token
  personalMode: false, // 如果你是个人订阅号或者未认证 请开启此项
  appPort: 8077, // 有自己域名或者服务器 可以启用这个 服务启动的端口 自己映射好配到公众号后台机就行
})
onMounted(() => {
  if (localStorage.getItem('chatConfig')) {
    formState.value = JSON.parse(localStorage.getItem('chatConfig') as string)
  }
})

const onFinish = async (values: any) => {
  const logPath = await ipcRenderer.invoke('startBot', JSON.stringify(formState.value))
  emit('updateLog', logPath)
  localStorage.setItem('chatConfig', JSON.stringify(formState.value))
  living.value = true;
};


const stopBot = () => {
  ipcRenderer.send('stopBot')
}


</script>

<template>
  <div class="tw-pt-[50px]">
    <Form
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :disabled="living"
        @finish="onFinish"
    >
      <FormItem label="可选协议">
        <Select v-model:value="formState.puppetType">
          <select-option v-for="item in puppetList" :value="item.value" :disabled="item.disabled">{{
              item.label
            }}
          </select-option>
        </Select>
      </FormItem>
      <FormItem
          label="apiKey"
          name="apiKey"
          :rules="[{ required: true, message: '请输入微秘书平台apikey' }]"
      >
        <Input v-model:value="formState.apiKey" placeholder="微秘书平台apikey">
          <template #suffix>
            <tooltip title="登录智能微秘书官网获取">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </template>
        </Input>
      </FormItem>

      <FormItem
          label="apiSecret"
          name="apiSecret"
          :rules="[{ required: true, message: '请输入微秘书平台apiSecret' }]"
      >
        <Input v-model:value="formState.apiSecret" placeholder="微秘书平台apiSecret">
          <template #suffix>
            <tooltip title="登录智能微秘书官网获取">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </template>
        </Input>
      </FormItem>
      <!--   ipad 协议 -->
      <FormItem
          v-if="formState.puppetType === PuppetTypeEnum.ipad "
          label="token"
          name="token"
          :rules="[{ required: true, message: '请输入购买的token' }]"
      >
        <Input v-model:value="formState.padToken" placeholder="请输入购买的padLocal token">
          <template #suffix>
            <tooltip>
              <template #title>
                <a class="tw-text-app-blue-3" target="_blank" href="http://pad-local.com/#/login?aff=aibotk">点击申请</a>
              </template>
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </template>
        </Input>
      </FormItem>
      <!--  企微协议    -->
      <FormItem
          v-if="formState.puppetType === PuppetTypeEnum.worker "
          label="token"
          name="token"
          :rules="[{ required: true, message: '请输入购买的token' }]"
      >
        <Input v-model:value="formState.workerToken" placeholder="请输入购买的企微token"/>
      </FormItem>
      <!--  windows 协议    -->
      <template v-if="formState.puppetType === PuppetTypeEnum.windows">
        <FormItem
            label="hook端口(默认)"
            name="hookPort"
            :rules="[{ required: true, message: '使用默认端口即可' }]"
        >
          <Input v-model:value="formState.hookPort"/>
        </FormItem>
        <FormItem
            label="server端口"
            name="serverPort(默认)"
            :rules="[{ required: true, message: '使用默认端口即可' }]"
        >
          <Input v-model:value="formState.serverPort"/>
        </FormItem>
      </template>
      <!--  公众号协议   -->
      <template v-if="formState.puppetType === PuppetTypeEnum.office">
        <FormItem
            label="个人或未认证"
            name="personalMode"
        >
          <radio-group v-model:value="formState.personalMode" name="personalMode">
            <radio :value="true">是</radio>
            <radio :value="false">否</radio>
          </radio-group>
        </FormItem>
        <FormItem
            label="公众号appId"
            name="appId"
            :rules="[{ required: true, message: 'appId 必填' }]"
        >
          <Input v-model:value="formState.appId">
            <template #suffix>
              <tooltip title="公众号后台开发与设置自行查找">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </tooltip>
            </template>
          </Input>
        </FormItem>
        <FormItem
            label="公众号appSecret"
            name="appSecret"
            :rules="[{ required: true, message: 'appSecret 必填' }]"
        >
          <Input v-model:value="formState.appSecret">
            <tooltip title="公众号后台-开发与设置-基础信息">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </Input>
        </FormItem>
        <FormItem
            label="加密Token"
            name="appToken"
            :rules="[{ required: true, message: '加密Token 必填' }]"
        >
          <Input v-model:value="formState.appToken">
            <tooltip title="公众号后台开发与设置自行查找">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </Input>
        </FormItem>
        <FormItem
            label="对外端口号"
            name="appPort"
            :rules="[{ required: true, message: '使用默认端口即可' }]"
        >
          <Input v-model:value="formState.appPort">
            <tooltip title="保持默认即可，除非端口冲突，或者你理解这个东西是什么，否则保持默认即可">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </tooltip>
          </Input>
        </FormItem>
      </template>
      <FormItem :wrapper-col="{ offset: 8, span: 16 }">
        <Button v-if="!living" html-type="submit">启动</Button>
      </FormItem>
    </Form>
    <div class="tw-text-center">
      <Button v-if="living" @click="stopBot">停止</Button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
