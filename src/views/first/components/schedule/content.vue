<template>
    <div class="content w-full h-full flex justify-center items-start">
        <div class="px-4 h-full flex items-center left-text">
            <el-date-picker class="no-border no-prefix" style="width: 100%;" v-model="date" type="date" placeholder="待填"
                :clearable=false stlye="--el-input-border:transparent" prefix-icon="false" value-format="YYYY-MM-DD"
                size="large" :teleported="false" @change="chooseDate" />
        </div>
        <div class="px-4 h-full flex items-center right-text" :style="{ color: hasColor ? color : '' }">
            {{ formatterStart + ' ~ ' + formatterEnd }}
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import { TaskItem } from '@/type/first';
import { formatDate } from '@/utils/index'
// 定义组件的 props
interface Props {
    value: string | number;
    row: TaskItem,
    color: string,
}
const emit = defineEmits(['changeDate'])

const props = withDefaults(defineProps<Props>(), {
    value: '',
    row: () => {
        return {} as TaskItem
    },
    color: ''
});
const formatterStart = computed(() => {
    return formatDate(props.row.totalSchedule[0], 'MM/dd')
})

const formatterEnd = computed(() => {
    return formatDate(props.row.totalSchedule[1], 'MM/dd')
})

const hasColor = computed(() => {
    let nowMonth = new Date().getMonth() + 1
    let month = new Date(props.row.totalSchedule[1]).getMonth() + 1
    if (nowMonth >= month) {
        return 'hasColor'
    } else {
        return ''
    }

})


const date: Ref<string | number> = ref()

watch(() => props.value, (val) => {
    date.value = val
});

const chooseDate = (val: string) => {
    emit('changeDate', val)
}

</script>
<style scoped>
.content .left-text {
    flex: 1;
    border-right: 1px solid #f2f3f5;
}


.content .right-text {
    flex: 1;
}
</style>