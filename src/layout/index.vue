<script setup lang="ts"></script>

<template>
  <div class="common-layout w-full h-full flex">
    <el-container>
      <el-aside class="aside" width="240px"></el-aside>
      <el-container class="right-aside">
        <el-header height="130px"></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout .aside {
  border-right: 1px solid #f2f3f5;
  background-color: #f7f9fc;
}

.common-layout .el-container {
  height: 100%;
}


.common-layout .el-main {
  height: calc(100% - 130px);
}


.common-layout .right-aside {
  background-color: #FFF;
}
</style>
