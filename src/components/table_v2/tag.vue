<template>
    <div class="flex justify-center" :class="[typeDom === 'text' ? 'items-start' : 'items-center']">
        <div class="tag" :style="{ backgroundColor: color }" type="info" v-if="typeDom === 'tag'">
            <span>{{ value }}</span>
        </div>
        <div class="px-4" v-else>
            {{ value }}
        </div>
    </div>

</template>
<script setup lang="ts">
import { TaskItem } from '@/type/first';
// 定义组件的 props
interface Props {
    value: string | number; // 状态值（如 'success'/'warning'）
    row: TaskItem,
    color?: string;
    typeDom?: string;
}

const props = withDefaults(defineProps<Props>(), {
    value: '',
    row: () => {
        return {} as TaskItem
    },
    color: '',
    typeDom: 'text'
});


</script>
<style scoped>
.tag-radius {
    .tag {
        border-radius: 50px;
    }
}
</style>