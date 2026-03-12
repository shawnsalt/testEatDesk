<template>
    <div class="flex justify-center" :class="[typeDom === 'text' ? 'items-start' : 'items-center']">
        <div class="tag" :style="{ backgroundColor: color }" type="info" v-if="typeDom === 'tag'">
            <span>{{ value }}</span>
        </div>
        <div class="tagWithText flex items-center justify-center" v-else-if="typeDom === 'tagWithText'">
            <div class="tag" :style="{ backgroundColor: color }" type="info">
                <span>{{ value }}</span>
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


</script>
<style scoped>
.tagRadius {
    .tag {
        border-radius: 50px;
    }
}

.tagWithText {
    .info {
        font-size: 0.8rem;
        padding-left: 0.4rem;
        color: #999999;
    }
}
</style>