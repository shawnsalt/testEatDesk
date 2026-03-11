<template>
    <div class="flex justify-center" :class="[typeDom === 'text' ? 'items-start' : 'items-center']">
        <el-tag :color="bgType" type="info" v-if="typeDom === 'tag'">
            <span :class="colorType"></span>{{ value }}
        </el-tag>
        <div class="avatar" v-else-if="typeDom === 'avatar'">
            <el-avatar :src="row"></el-avatar>
            {{ value }}
        </div>
        <div class="avatar" v-else-if="typeDom === 'tagWithText'">
            <el-tag :color="color" type="info">
                <span :class="colorType">{{ value }}</span>
            </el-tag>
            {{ value }}
        </div>
        <div class="px-4" v-else>
            {{ value }}
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
<style scoped></style>