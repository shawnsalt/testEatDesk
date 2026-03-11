<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive, nextTick, unref } from 'vue'
import { useLocale } from 'element-plus'
const { t } = useLocale()
import Mock from 'mockjs'
import table_v2 from '@/components/table_v2/index.vue'
import selectionForTable from '@/components/table_v2/components/selection.vue'
import { h } from 'vue'
import Flow from './components/flow.vue'
import Priority from './components/priority.vue'
import Owner from './components/owner.vue'
import scheduleHeader from './components/schedule/header.vue'
import scheduleContent from './components/schedule/content.vue'
import versionTag from './components/version.vue'

// 固定列的总宽度
const fixedColumnsWidth = 50 + 80 + 80 + 80 + 132 + 150 + 150 + 242

const flag = ref(false)
// 计算自适应列的宽度
const adaptiveDescWidth = computed(() => {
    const containerWidth = tableContainer.value?.clientWidth || 800
    return containerWidth - fixedColumnsWidth
})


const renderStatusTag = (cellData: string, rowData: object, typeDom: string, color?: string) => {
    return h(table_v2, {
        value: cellData,
        size: 'small',
        row: rowData,
        typeDom: typeDom,
        color: color
    });
};

const renderVersionTag = (cellData: string, rowData: object, color?: string) => {
    return h(versionTag, {
        value: cellData,
        rowData: rowData,
        color: color
    });
};

const renderFlowTag = (cellData: string, rowData: object, color?: string) => {
    return h(Flow, {
        value: cellData,
        rowData: rowData,
        color: color
    });
};

const renderPriorityTag = (cellData: string, rowData: object, color?: string) => {
    return h(Priority, {
        value: cellData,
        rowData: rowData,
        color: color
    });
};

const renderowDatanerTag = (cellData: string, rowData: object, color?: string) => {
    return h(Owner, {
        value: cellData,
        row: rowData,
        color: color
    });
};

const renderScheduleTag = (cellData: string, rowData: object, color?: string) => {
    return h(scheduleContent, {
        value: cellData,
        row: rowData,
        color: color
    });
};

const renderScheduleHeader = (cellData: string, rowData: object, color?: string) => {
    return h(scheduleHeader, {
        value: cellData,
        row: rowData,
        color: color
    });
};

const renderHeaderCheckout = () => {
    const _data = unref(allData)
    const onChange = (value) =>
    (allData.value = _data.map((rowData) => {
        rowData.checked = value
        return rowData
    }))
    const allSelected = _data.every((rowData) => rowData.checked)
    const containsChecked = _data.some((rowData) => rowData.checked)
    return h(selectionForTable, {
        value: allSelected,
        intermediate: containsChecked && !allSelected,
        ariaLabel: t('el.table.selectAllLabel'),
        onChange: () => onChange
    }
    )
}

const renderCellCheckout = (rowData, index) => {
    const onChange = (value) => (rowData.checked = value)
    return h(selectionForTable, {
        value: rowData.checked,
        ariaLabel: t('el.table.selectrowDataLabel'),
        index: index + 1,
        onChange: () => onChange
    }
    )
}



const columns = reactive([

    {
        key: 'id',
        title: '',
        dataKey: 'id',
        class: 'tableItems',
        width: 50,
        cellRenderer: ({ cellData, rowData, rowIndex }) => renderCellCheckout(cellData, rowIndex),
        headerCellRenderer: ({ }) => renderHeaderCheckout()
    },
    {
        key: 'version',
        title: '版本规划',
        dataKey: 'version',
        class: 'tableItems',
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderVersionTag(cellData, rowData, '#f2f3f5')
    },
    {
        key: 'flow',
        title: '任务流程',
        dataKey: 'flow',
        class: 'tableItems',
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderFlowTag(cellData, rowData)
    },
    {
        key: 'priority',
        title: '优先级',
        dataKey: 'priority',
        class: 'tableItems',
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderPriorityTag(cellData, rowData, 'tag')
    },
    {
        key: 'name',
        title: '任务名称',
        dataKey: 'name',
        class: 'tableItems',
        width: adaptiveDescWidth,
        cellRenderer: ({ cellData, rowData }) => h('span', { class: 'px-4' }, cellData)
    },
    {
        key: 'owner',
        title: '当前负责人',
        dataKey: 'owner',
        class: 'tableItems',
        width: 132,
        cellRenderer: ({ cellData, rowData }) => renderowDatanerTag(cellData, rowData, 'avatar')
    },
    {
        key: 'status',
        title: '任务状态',
        dataKey: 'status',
        class: 'tableItems',
        width: 150,
        cellRenderer: ({ cellData, rowData }) => renderStatusTag(cellData, rowData, 'tagWithText')
    },
    {
        key: 'module',
        title: '所属模块',
        dataKey: 'module',
        class: 'tableItems',
        width: 150,
        cellRenderer: ({ cellData, rowData }) => renderStatusTag(cellData, rowData, 'text')
    },
    {
        key: 'schedule',
        title: '排期',
        dataKey: 'schedule',
        class: 'tableItems',
        width: 242,
        headerClass: 'schedule',
        cellRenderer: ({ cellData, rowData }) => renderScheduleTag(cellData, rowData, 'colText'),
        headerCellRenderer: ({ cellData, rowData }) => renderScheduleHeader(cellData, rowData, 'colText')
    },
])


// --- Mock 数据生成 ---
const generateMockData = (count) => {
    const flows = ['需求', '设计', '走查']
    const priorities = ['P0', 'P1', 'P2', 'P3', 'P4', null]
    const statuses = ['进行中', '策划中', '待确认']
    const modules = ['未命名模块']
    const owners = ['罗密欧与朱丽叶', '麦老头', '欧阳娜娜']
    const versions = ['V1.1.1', 'V1.0.0', '未规划']

    return Mock.mock({
        [`list|${count}`]: [
            {
                'id|+1': 1,
                'version|1': versions,
                'flow|1': flows,
                'priority|1': priorities,
                'name': '软件启动后@pick(["崩溃","闪退","异常","无响应"])Bug',
                'owner|1': owners,
                'status|1': statuses,
                'duration': '@pick(["7个月", "6个月", "5个月"])',
                'module|1': modules,
                'schedule': '待填',
                'totalSchedule': '05/16 ~ 05/16',
                'avatar': `https://picsum.photos/seed/${Mock.Random.integer(1, 100)}/24/24`
            }
        ]
    }).list
}

// --- 响应式数据 ---
const allData = ref(generateMockData(1000)) // 生成1000条测试数据
const tableContainer = ref(null)
const scrollTop = ref(0)


const handleScroll = (e) => {
    const target = e.target as HTMLDivElement
    scrollTop.value = target.scrollTop
}


onMounted(() => {
    nextTick(() => {
        tableContainer.value?.addEventListener('scroll', handleScroll)
    })
})

onUnmounted(() => {
    tableContainer.value?.removeEventListener('scroll', handleScroll)
})

const handleResize = () => {
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

</script>

<template>
    <div class="w-full h-full flex tableArea">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <div ref="tableContainer">
                    <el-table-v2 :columns="columns" :data="allData" :width="width" :height="height" fixed />
                </div>
            </template>
        </el-auto-resizer>
    </div>
</template>

<style scoped>
.task-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 16px;
}

.tableArea {
    :deep(.el-table-v2__header-cell) {
        font-weight: normal;
        color: #bbbbbb;
        border-top: 1px solid #f2f3f5;
        border-left: 1px solid #f2f3f5;

        &:last-child {
            border-right: 1px solid #f2f3f5;
        }
    }

    :deep(.el-table-v2__header-cell.schedule) {
        padding: 0;
    }

    :deep(.el-table-v2__row-cell.tableItems) {
        border-left: 1px solid #f2f3f5;

        &:last-child {
            border-right: 1px solid #f2f3f5;
        }
    }
}
</style>
