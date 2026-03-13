<template>
    <div class="flex items-center justify-center">
        <div class="tag-with-text flex items-center justify-center">
            <div class="tag" :style="{ backgroundColor: color }" type="info">
                <span>{{ tagText }}</span>
            </div>
            <span class="info">{{ text }}</span>
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed } from 'vue'
// 定义组件的 props
interface Props {
    tagText: string | number;
    text?: string;
    row: object,
    color?: string;
}

const props = withDefaults(defineProps<Props>(), {
    tagText: '',
    text: '',
    row: () => {
        return {}
    },
    color: '',
});


</script>
<style scoped>
.tag-with-text .info {
    font-size: 1rem;
    padding-left: 0.4rem;
    color: #999999;
}
</style>