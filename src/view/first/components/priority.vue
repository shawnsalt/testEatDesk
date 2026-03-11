<template>
    <div class="flex justify-center items-center">
        <div class="tag" :style="{ backgroundColor: bgType }" type="info">
            <span :class="colorType">{{ value }}</span>
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed } from 'vue'
// 定义组件的 props
interface Props {
    value: string | number; // 状态值（如 'success'/'warning'）
    color?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: '',
});

const tagStyleObj = {
    'P0': { bg: '#fee1e1', text: 'text-red-600' },
    'P1': { bg: '#ffefd9', text: 'text-red-600' },
    'P2': { bg: '#e7fae3', text: 'text-orange-600' },
    'P3': { bg: '#dff3f7', text: 'text-orange-600' },
    'P4': { bg: '#fae9f9', text: 'text-gray-600' },
    '暂定': { bg: '', text: 'text-gray-600' },
    '待定': { bg: '#e4effe', text: 'text-gray-600' },

}
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