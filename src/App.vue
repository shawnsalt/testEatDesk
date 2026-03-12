<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.noPrefix {
  .el-input__prefix {
    display: none !important;
  }
}

.noBorder {
  .el-input__wrapper {
    box-shadow: none !important;
    --el-input-bg-color: transparent;
    padding: 0 !important;

  }
}
</style>
