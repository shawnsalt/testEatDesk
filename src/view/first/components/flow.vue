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
    '需求': { bg: '#dff3f7', text: 'text-yellow-600' },
    '设计': { bg: '#ffefd9', text: 'text-yellow-600' },
    '走查': { bg: '#fae9f9', text: 'text-purple-600' },
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