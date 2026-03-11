<template>
    <div class="flex justify-center items-center">
        <div class="tag tagRadius" :style="{ backgroundColor: color }" type="info">
            <span>{{ value }}</span>
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

</script>
<style scoped>
.tagRadius {
    border-radius: 50px;
}
</style>