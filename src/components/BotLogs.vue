<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import fs from 'fs'
import {ipcRenderer} from "electron";
import {Button} from "ant-design-vue";

const props = defineProps<{ logPath: string }>()
let interval = ref(null)
let logs = ref('');

function readLastLines(filePath, numLines) {
  return new Promise((resolve, reject) => {
    let lines = [];

    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    let remaining = '';

    stream.on('data', (chunk) => {
      remaining += chunk;
      const linesArray = remaining.split('\n');
      remaining = linesArray.pop();

      lines = linesArray.slice(-numLines);
    });

    stream.on('end', () => {
      if (remaining) {
        lines.unshift(remaining);
      }
      resolve(lines.join('\n'));
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}
const getLog = () => {
  if (!interval.value && props.logPath) {
    interval = setInterval(() => {
      readLastLines(props.logPath, 50)
          .then((lastLines) => {
            logs.value = lastLines
          })
          .catch((error) => {
            console.error('Error reading log file:', error);
          });
    }, 2000)
  }
}
watchEffect(()=> {
  if(props.logPath) {
    getLog()
  }
})
getLog()


const openLog = async () => {
  await ipcRenderer.invoke('openLog', props.logPath)
};

</script>

<template>
  <div class="tw-text-gray-500">
    <div>日志路径：{{logPath}}(只显示最新的日志，历史日志请直接查看日志文件)</div>
    <div><Button class="tw-text-app-blue-3">打开日志</Button></div>
    <div v-if="logPath" class="tw-max-h-[460px] tw-rounded tw-mt-4 tw-overflow-y-auto tw-break-words tw-whitespace-pre-wrap tw-y tw-bg-[rgba(3,32,41,1)]">
      {{logs}}
    </div>
    <div v-else>程序未启动</div>
  </div>
</template>


<style scoped>

</style>
