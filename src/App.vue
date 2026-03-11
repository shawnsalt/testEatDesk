<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}
</style>
