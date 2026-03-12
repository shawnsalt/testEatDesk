<script setup lang="ts">
import { computed, ref, watch } from 'vue'
// 定义组件的 props
interface Props {
    list: Array<number>,
    id: number,
    intermediate?: boolean
    ariaLabel?: string
    index?: number
    allLength?: number
}

const props = withDefaults(defineProps<Props>(), {
    intermediate: false,
    ariaLabel: '',
    index: 0,
    id: 0,
    allLength: 0,
});

// 定义组件事件
const emit = defineEmits(['chooseChange'])

const flag = ref(false)


const changeCheckBox = (val) => {
    if (props.id === 0) {
        emit('chooseChange', val)
    } else {
        emit('chooseChange', props.id)

    }

}
const checked = ref(false)

watch(() => props.list, (newVal) => {
    if (props.id !== 0) {
        checked.value = newVal.findIndex(item => item === props.id) !== -1
    } else {
        checked.value = newVal.length >= props.allLength
    }
});

</script>
<template>
    <div class="w-full flex items-center justify-center textIndex" @mouseenter="flag = true" @mouseleave="flag = false">
        <span v-if="!flag && props.index !== 0 && !checked">
            {{ props.index }}
        </span>
        <el-checkbox class="textCheck" v-else :indeterminate="props.intermediate" v-model="checked"
            @change="changeCheckBox" />
    </div>

</template>

<style scoped>
.textIndex {
    text-align: center;

    .el-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;


    }


}

:deep(.textCheck) {
    .el-checkbox.el-checkbox--small .el-checkbox__label {
        display: none;
        width: 0;
    }
}
</style>