<template>
    <div class="flex justify-center" :class="[typeDom === 'text' ? 'items-start' : 'items-center']">
        <div class="tag" :style="{ backgroundColor: bgType }" type="info" v-if="typeDom === 'tag'">
            <span :class="colorType">{{ value }}</span>
        </div>
        <div class="avatar" v-else-if="typeDom === 'avatar'">
            <el-avatar :src="row"></el-avatar>
            {{ value }}
        </div>
        <div class="tagWithText flex items-center justify-center" v-else-if="typeDom === 'tagWithText'">
            <div class="tag" :style="{ backgroundColor: bgType }" type="info">
                <span :class="colorType">{{ value }}</span>
            </div>
            <span class="info">{{ value }}</span>
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
    '需求': { bg: '#dff3f7', text: 'text-yellow-600' },
    '设计': { bg: '#ffefd9', text: 'text-yellow-600' },
    '走查': { bg: '#fae9f9', text: 'text-purple-600' },
    'P0': { bg: '#fee1e1', text: 'text-red-600' },
    'P1': { bg: '#ffefd9', text: 'text-red-600' },
    'P2': { bg: '#e7fae3', text: 'text-orange-600' },
    'P3': { bg: '#dff3f7', text: 'text-orange-600' },
    'P4': { bg: '#fae9f9', text: 'text-gray-600' },
    '暂定': { bg: '', text: 'text-gray-600' },
    '待定': { bg: '#e4effe', text: 'text-gray-600' },
    '进行中': { bg: '#e4effe', text: 'text-green-600' },
    '策划中': { bg: '#e4effe', text: 'text-gray-600' },
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
.tagWithText {
    .info {
        font-size: 0.8rem;
        padding-left: 0.4rem;
        color: #999999;
    }
}
</style>