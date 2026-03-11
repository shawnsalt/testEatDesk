<template>
    <div class="w-full flex flex-col justify-center items-center">
        <div class="w-full flex items-center justify-center topTitle">排期</div>
        <div class="w-full flex">
            <div class="flex-1 pl-4 leftTitle">
                排期
            </div>
            <div class="flex-1 pl-4 s">
                总排期
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { computed } from 'vue'
// 定义组件的 props
interface Props {
    value: string | number; // 状态值（如 'success'/'warning'）
    row: object,
    color?: string;
    map?: Record<string, { label: string; type: string }>;
    typeDom?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'small',
    row: () => {
        return {}
    },
    color: '',
    typeDom: 'text'
});

const tagStyleObj = {
    '需求': { bg: '#dff3f7', text: '#dff37f' },
    '设计': { bg: '#ffefd9', text: 'text-yellow-600' },
    '走查': { bg: 'bg-purple-100', text: 'text-purple-600' },
    'P0': { bg: 'bg-red-100', text: 'text-red-600' },
    'P1': { bg: 'bg-red-100', text: 'text-red-600' },
    'P2': { bg: 'bg-orange-100', text: 'text-orange-600' },
    'P3': { bg: 'bg-orange-100', text: 'text-orange-600' },
    'P4': { bg: 'bg-gray-100', text: 'text-gray-600' },
    '暂定': { bg: 'bg-gray-100', text: 'text-gray-600' },
    '待定': { bg: 'bg-gray-100', text: 'text-gray-600' },
    '进行中': { bg: 'bg-green-100', text: 'text-green-600' },
    '策划中': { bg: 'bg-gray-100', text: 'text-gray-600' },
    '待确认': { bg: '#ffefd9', text: 'text-yellow-600' }
}
const label = computed(() => props.map[props.value]?.label || props.map.default.label);
const bgType = computed(() => {
    console.log(props.value)
    console.log(tagStyleObj[props.value])
    return tagStyleObj[props.value]?.bg
})
const colorType = computed(() => {

    return tagStyleObj[props.value]?.text
})

</script>
<style scoped>
.topTitle {
    border-bottom: 1px solid #f2f3f5;
}

.leftTitle {
    border-right: 1px solid #f2f3f5;
}
</style>