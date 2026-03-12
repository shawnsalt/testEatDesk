<template>
    <div class="w-full flex flex-col justify-center items-center el-table-v2__header-cell-text">
        <div class="w-full h-full flex items-center justify-center topTitle">排期</div>
        <div class="w-full h-full flex">
            <div class="flex-1 h-full pl-4 leftTitle">
                排期
            </div>
            <div class="flex-1 h-full  pl-4 s">
                总排期
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
// 定义组件的 props
interface Props {
}

const props = withDefaults(defineProps<Props>(), {
});


</script>
<style scoped>
.topTitle {
    border-bottom: 1px solid #f2f3f5;
}

.leftTitle {
    border-right: 1px solid #f2f3f5;
}
</style>