<template>
    <div class="flex justify-center items-center">
        <div class="avatar">
            <el-avatar :src="row.avatar" :size="25" style="background: linear-gradient(304deg, #9d2cec, #e1b7ff)">
                {{ String(value).slice(0, 1).toUpperCase() }}
            </el-avatar>
            <span class="name no-wrap">{{ value }}</span>
        </div>
    </div>

</template>
<script setup lang="ts">
import { TaskItem } from '@/type/first'
// 定义组件的 props
interface Props {
    value: string | number; // 状态值（如 'success'/'warning'）
    row: TaskItem,
    color?: string;
    map?: Record<string, { label: string; type: string }>;
    typeDom?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'small',
    color: '',
    typeDom: 'text'
});
</script>
<style scoped>
.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f2f3f5;
    border-radius: 50px;

    .name {
        padding: 0 0.5rem;
        max-width: 5rem;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
}
</style>