<template>
    <div class="content w-full h-full flex justify-center"
        :class="[typeDom === 'text' ? 'items-start' : 'items-center']">
        <div class="px-4 h-full flex items-center leftText">
            <el-date-picker class="noBorder noPrefix" style="width: 100%;" v-model="date" type="date" placeholder="待填"
                :clearable=false stlye="--el-input-border:transparent" prefix-icon="false" value-format="YYYY-MM-DD"
                :teleported="false" @change="chooseDate" />
        </div>
        <div class="px-4 h-full flex items-center rightText" :class="[isRed]">
            {{ formatterStart + ' ~ ' + formatterEnd }}
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { TaskItem } from '@/type/first';
import { formatDate } from '@/utils/index'
// 定义组件的 props
interface Props {
    value: string | number; // 状态值（如 'success'/'warning'）
    row: TaskItem,
    color?: string;
    map?: Record<string, { label: string; type: string }>;
    typeDom?: string;
}
const emit = defineEmits(['changeDate'])

const props = withDefaults(defineProps<Props>(), {
    size: 'small',
    color: '',
    typeDom: 'text'
});
const formatterStart = computed(() => {
    return formatDate(props.row.totalSchedule[0], 'MM/dd')
})

const formatterEnd = computed(() => {
    return formatDate(props.row.totalSchedule[1], 'MM/dd')
})

const isRed = computed(() => {
    let nowMonth = new Date().getMonth() + 1
    let month = new Date(props.row.totalSchedule[1]).getMonth() + 1
    if (nowMonth >= month) {
        return 'red'
    } else {
        return ''
    }

})


const date = ref()

watch(() => props.value, (val) => {
    date.value = val
});

const chooseDate = (val: string) => {
    emit('changeDate', val)
}

</script>
<style scoped>
.content {
    .leftText {
        flex: 1;
        border-right: 1px solid #f2f3f5;
    }

    .rightText {
        flex: 1;
    }

    .red {
        color: red;
    }
}
</style>