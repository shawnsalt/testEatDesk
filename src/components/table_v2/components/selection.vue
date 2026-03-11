<script setup lang="ts">
import { computed, ref } from 'vue'
// 定义组件的 props
interface Props {
    value: boolean
    intermediate?: boolean
    ariaLabel?: string
    index?: number
    onChange: (value) => void
}

const props = withDefaults(defineProps<Props>(), {
    value: false,
    intermediate: false,
    ariaLabel: '',
    index: 0,
});

// 定义组件事件
const emit = defineEmits<{
    click: [value: boolean];
}>();

const handleClick = () => {
    emit('click', props.value);
};

const id = ref(props.value)

</script>
<template>
    <div class="w-full textIndex">
        <span v-if="props.index !== 0">
            {{ props.index }}
        </span>
        <el-checkbox v-else :indeterminate="props.intermediate" :value="props.value" />
    </div>

</template>

<style scoped>
.textIndex {
    text-align: center;
}
</style>