<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted, onUnmounted, reactive, nextTick, unref } from 'vue'
import { useLocale, Column } from 'element-plus'
const { t } = useLocale()
import Mock from 'mockjs'
import table_v2_tag from '@/components/table_v2/tag.vue'
import selectionForTable from '@/components/table_v2/components/selection.vue'
import { h } from 'vue'
import ownerVue from './components/owner.vue'
import scheduleHeader from './components/schedule/header.vue'
import scheduleContent from './components/schedule/content.vue'
import { DictItem } from '@/type/utils'
import { selectByDict } from '@/utils/index'
import { TaskItem } from '@/type/first'
import TagWithText from './components/tagWithText.vue'
import { More, RefreshLeft } from '@element-plus/icons-vue'



const renderTag = (cellData: string, rowData: TaskItem, typeDom: string, color: string, dict?: Array<DictItem>, className?: string) => {
    return h(table_v2_tag, {
        value: cellData,
        row: rowData,
        typeDom: typeDom,
        color: typeDom === 'text' ? '' : color || selectByDict(cellData, 'label', dict)?.[0]?.color,
        class: className
    });
};

const renderOwner = (cellData: string, rowData: TaskItem, background?: string) => {
    return h(ownerVue, {
        value: cellData,
        row: rowData,
        background: background
    });
};

const renderTagWithText = (rowData: TaskItem, dict?: Array<DictItem>) => {
    return h(TagWithText, {
        tagText: rowData.status,
        text: rowData.duration,
        row: rowData,
        color: selectByDict(rowData.status, 'label', dict)?.[0]?.color,
    });
};

const renderSchedule = (cellData: string, rowData: TaskItem, index: number, color?: string) => {
    return h(scheduleContent, {
        value: cellData,
        row: rowData,
        color: color,
        onChangeDate: (date: string) => {
            allData.value[index].schedule = date
        }
    });
};

const renderScheduleHeader = () => {
    return h(scheduleHeader, {});
};

const renderHeaderCheckout = () => {
    const _data = unref(allData)
    const allSelected = _data.length === infoSet.checkList.length
    const containsChecked = infoSet.checkList.length < _data.length && infoSet.checkList.length > 0
    const onChange = (checked: boolean) => {
        if (checked) {
            infoSet.checkList = _data.map((item): number => { return item.id })
        } else {
            infoSet.checkList = []
        }
    }

    return h(selectionForTable, {
        id: 0,
        list: infoSet.checkList,
        intermediate: containsChecked && !allSelected,
        index: 0,
        ariaLabel: t('el.table.selectAllLabel'),
        allLength: allData.value.length,
        onChooseChange: (id) => onChange(id)
    }
    )
}

const renderCellCheckout = (cellData: number, index: number) => {
    const onChange = (value: number) => {
        let idIndex = infoSet.checkList.findIndex((item: number) => item === value)
        if (idIndex !== -1) {
            infoSet.checkList.splice(idIndex, 1)
        } else {
            infoSet.checkList.push(value)
        }
    }
    return h(selectionForTable, {
        list: infoSet.checkList,
        id: cellData,
        ariaLabel: t('el.table.selectrowDataLabel'),
        index: index + 1,
        onChooseChange: (id) => onChange(id)
    }
    )
}

let initColumnsSort = []
type infoSetType = {
    checkList: Array<number>
    columns: Array<Column>
}

const infoSet = reactive<infoSetType>({
    checkList: [],
    columns: [

        {
            key: 'id',
            title: '',
            dataKey: 'id',
            class: 'table-items',
            headerClass: '',
            width: 50,
            minWidth: 50,
            flexGrow: 0,
            cellRenderer: ({ cellData, rowIndex }) => renderCellCheckout(cellData, rowIndex),
            headerCellRenderer: ({ }) => renderHeaderCheckout()
        },
        {
            key: 'version',
            title: '版本规划',
            dataKey: 'version',
            class: 'table-items',
            headerClass: '',
            flexGrow: 0,
            width: 90,
            minWidth: 90,
            cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '#f2f3f5', [], 'tag-radius')
        },
        {
            key: 'flow',
            title: '任务流程',
            dataKey: 'flow',
            class: 'table-items',
            headerClass: '',
            flexGrow: 0,
            width: 80,
            minWidth: 80,
            cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '', flowDict)
        },
        {
            key: 'priority',
            title: '优先级',
            dataKey: 'priority',
            class: 'table-items',
            headerClass: '',
            flexGrow: 0,
            width: 80,
            minWidth: 80,
            cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '', priorityDict)
        },
        {
            key: 'name',
            title: '任务名称',
            dataKey: 'name',
            class: 'table-items',
            headerClass: '',
            flexGrow: 1,
            width: 150,
            minWidth: 150,
            cellRenderer: ({ cellData }) => h('span', { class: 'px-4' }, cellData)
        },
        {
            key: 'owner',
            title: '当前负责人',
            dataKey: 'owner',
            class: 'table-items',
            headerClass: '',
            width: 130,
            minWidth: 130,
            cellRenderer: ({ cellData, rowData }) => renderOwner(cellData, rowData, 'linear-gradient(304deg, #9d2cec, #e1b7ff)')
        },
        {
            key: 'status',
            title: '任务状态',
            dataKey: 'status',
            class: 'table-items',
            flexGrow: 0,
            width: 150,
            minWidth: 150,
            cellRenderer: ({ rowData }) => renderTagWithText(rowData, statusDict)
        },
        {
            key: 'module',
            title: '所属模块',
            dataKey: 'module',
            class: 'table-items',
            flexGrow: 0,
            width: 150,
            minWidth: 150,
            cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'text', '')
        },
        {
            key: 'schedule',
            title: '排期',
            dataKey: 'schedule',
            class: 'table-items',
            flexGrow: 0,
            width: 245,
            minWidth: 245,
            headerClass: 'schedule',
            cellRenderer: ({ cellData, rowData, rowIndex }) => renderSchedule(cellData, rowData, rowIndex, '#ff0000'),
            headerCellRenderer: ({ }) => renderScheduleHeader()
        },
    ]
})

const isInfoSetType = (value: unknown): value is infoSetType => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'checkList' in value &&
        'columns' in value
    )
}

const flowDict: Array<DictItem> = [
    { label: "需求", value: "", color: "#dff3f7" },
    { label: "设计", value: "", color: "#ffefd9" },
    { label: "走查", value: "", color: "#fae9f9" }
]

const priorityDict: Array<DictItem> = [
    { label: "暂定", value: "", color: "#f0f1f5" },
    { label: "待定", value: "", color: "#e4effe" },
    { label: "P0", value: "", color: "#fee1e1" },
    { label: "P1", value: "", color: "#ffefd9" },
    { label: "P2", value: "", color: "#e7fae3" },
    { label: "P3", value: "", color: "#dff3f7" },
    { label: "P4", value: "", color: "#fae9f9" }
]
const statusDict: Array<DictItem> = [
    { label: "进行中", value: "", color: "#e4effe" },
    { label: "策划中", value: "", color: "#e4effe" },
    { label: "待确认", value: "", color: "#ffefd9" }
]


// --- Mock 数据生成 ---
const generateMockData = (count: number): Array<TaskItem> => {
    const flows = ['需求', '设计', '走查']
    const priorities = ['P0', 'P1', 'P2', 'P3', 'P4', '待定', '暂定',]
    const statuses = ['进行中', '策划中', '待确认']
    const modules = ['未命名模块']
    const owners = ['罗密欧与朱丽叶', '麦老头']
    const versions = ['V1.1.1', 'V1.0.0', '未规划']
    const avatar = [`https://picsum.photos/seed/22/24/24`]

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
                'schedule': '',
                'checked': false,
                'totalSchedule': function () {
                    const start = `2026-0${Math.floor(Math.random() * 9 + 1)}-04`
                    const date = new Date(start);
                    date.setMonth(date.getMonth() + 2);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const end = `${year}-${month}-${day}`;

                    return [start, end]
                },
                'avatar': function (owner: { context: { currentContext: { owner: string } } }) {
                    if (owner.context.currentContext.owner === '麦老头') {
                        return null
                    } else {
                        return avatar[0]
                    }
                }
            }
        ]
    }).list as Array<TaskItem>
}

// --- 响应式数据 ---
const allData = ref(generateMockData(1000)) // 生成1000条测试数据
const tableContainerRef = ref<HTMLDivElement>(null)


const handleScroll = (el: Event) => {
    const target = el.target
}


let resizeTimer: ReturnType<typeof setTimeout> | null = null
const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(async () => {
        nextTick(() => {
            if (tableContainerRef.value) {
                tableContainerRef.value.dispatchEvent(new Event('resize'))
            }
        })
    }, 50)
}

const clearStorage = () => {
    localStorage.removeItem('columnsKeys')

    let newColumns = []
    initColumnsSort.forEach(key => {
        newColumns.push(infoSet.columns.filter((column: Column) => {
            return key === column.key
        })[0])
    })
    infoSet.columns = newColumns

}



let tableX = 0
let tableY = 0
let moveArea: HTMLElement | null
let moveItem: HTMLElement | null
let moveCol = 0
let moveKey = ''
let willAddCol = ''
const showArea = ref(false)

const getCellHeader = (target: EventTarget) => {
    if (!(target instanceof Element)) return null
    return target.closest('.el-table-v2__header-cell') as HTMLElement | null
}

const startMoveHeader = (event: PointerEvent) => {
    let willMoveDom = event.target
    let cell = getCellHeader(willMoveDom)

    if (!cell) {
        return
    }
    moveKey = cell.getAttribute('data-key')
    infoSet.columns.some((column: Column, index: number) => {
        if (column.key === moveKey) {
            moveCol = index
            return true
        }
    })
    willAddCol = infoSet.columns[moveCol]

    showArea.value = true
    let x = event.pageX - tableX - 240
    let y = event.pageY - tableY - 120
    let dom = cell.cloneNode(true)

    moveItem.innerHTML = ''
    moveItem.appendChild(dom)
    gsap.set(moveArea, {
        x: x,
        y: y
    })

}

const move = (event: MouseEvent) => {
    let willMoveDom = event.target
    let cell = getCellHeader(willMoveDom)
    if (!cell) {
        return
    }
    let key = cell.getAttribute('data-key')
    if (!isInfoSetType(infoSet)) {
        return
    }
    infoSet.columns.forEach((column: Column) => {
        if (column.key === key) {
            column.class = 'table-items blue-right-border'
            if (key === 'schedule') {
                column.headerClass = 'schedule blue-right-border'

            } else {
                column.headerClass = 'blue-right-border'
            }
        } else {
            column.class = 'table-items'
            if (column.key === 'schedule') {
                column.headerClass = 'schedule'
            } else {
                column.headerClass = ''
            }
        }
    })

    let x = event.pageX - tableX - 240
    let y = event.pageY - tableY - 120
    gsap.set(moveArea, {
        x: x,
        y: y
    });

};


const moveHeader = (event: any) => {
    if (showArea.value) {
        move(event)
    }
};


const leaveHeader = () => {
    // if (showArea.value) {
    //     showArea.value = false
    // }

}

const endMoveHeader = (event: PointerEvent) => {
    let willMoveDom = event.target
    let cell = getCellHeader(willMoveDom)
    if (!cell) {
        return
    }
    let key = cell.getAttribute('data-key')
    let toMoveIndex = -1
    if (key !== moveKey && key) {
        infoSet.columns.splice(moveCol, 1)

        infoSet.columns.some((column: Column, index: number) => {
            if (column.key === key) {
                toMoveIndex = index
                return
            }
        })
        if (toMoveIndex !== -1) {
            infoSet.columns.splice(toMoveIndex + 1, 0, willAddCol)
        }
    }
    infoSet.columns.forEach((column: Column) => {
        column.class = 'table-items'
        column.headerClass = column.key === 'schedule' ? 'schedule' : ''
    })

    let keys = infoSet.columns.map((column: Column) => {
        return column.key
    })
    localStorage.setItem('columnsKeys', JSON.stringify(keys))

    moveCol = 0
    moveKey = ''
    willAddCol = ''
    showArea.value = false
}

onMounted(() => {
    initColumnsSort = infoSet.columns.map((column: Column) => {
        return column.key
    })

    let storageColumns = JSON.parse(localStorage.getItem('columnsKeys'))
    if (storageColumns) {
        let newColumns = []
        storageColumns.forEach(key => {
            newColumns.push(infoSet.columns.filter((column: Column) => {
                return key === column.key
            })[0])
        })
        console.log(newColumns)
        infoSet.columns = newColumns

    }
    moveArea = document.querySelector('.move-area')
    moveItem = document.querySelector('.move-item')
    tableX = tableContainerRef.value.offsetLeft
    tableY = tableContainerRef.value.offsetTop

    window.addEventListener('resize', handleResize)
    nextTick(() => {
        tableContainerRef.value?.addEventListener('scroll', handleScroll)
    })
})

onUnmounted(() => {
    moveArea = null
    moveItem = null
    window.removeEventListener('resize', handleResize)
    tableContainerRef.value?.removeEventListener('scroll', handleScroll)
})

</script>

<template>
    <div class="w-full h-full flex table-area">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-scrollbar style="width: fit-content">
                    <div style="width: fit-content;" ref="tableContainerRef" @mousedown="startMoveHeader"
                        @mousemove.stop="moveHeader" @mouseleave="leaveHeader" @mouseup="endMoveHeader">
                        <el-table-v2 :columns="infoSet.columns" :data="allData" :width="width < 1125 ? 1125 + 6 : width"
                            :height="height" header-class="table-v2-header" :fixed="false">
                            <template #footer>
                                <div class="h-full flex items-center table-foot">
                                    <div class="h-full flex items-center justify-center foot-left">
                                        <span>
                                            共&nbsp;&nbsp;{{ allData.length }}&nbsp;&nbsp;条
                                        </span>
                                    </div>
                                    <div class="h-full flex items-center justify-center foot-right"
                                        @click="clearStorage">
                                        <div class="foot-right-icon">
                                            <el-icon>
                                                <RefreshLeft />
                                            </el-icon>
                                        </div>
                                        <span>
                                            恢复
                                        </span>

                                    </div>
                                </div>
                            </template>
                        </el-table-v2>
                    </div>
                </el-scrollbar>
            </template>
        </el-auto-resizer>
        <div class="move-area" v-show="showArea">
            <div class="move-item"></div>
        </div>
    </div>
</template>

<style scoped>
.table-area {
    position: relative;
    user-select: none;
}


.table-area :deep(.el-table-v2__header-cell) {
    font-weight: normal;
    color: #bbbbbb;
    border-top: 1px solid #f2f3f5;
    border-left: 1px solid #f2f3f5;
}

.table-area :deep(.el-table-v2__header-cell):last-child {
    border-right: 1px solid #f2f3f5;
}

.table-area :deep(.el-table-v2__header-cell.schedule) {
    padding: 0;
}

.table-area :deep(.el-table-v2__row-cell.table-items) {
    border-left: 1px solid #f2f3f5;

}

.table-area :deep(.el-table-v2__row-cell.table-items):last-child {
    border-right: 1px solid #f2f3f5;
}

.table-area :deep(.el-table-v2__header-cell.blue-right-border) {
    border-right: 1px solid blue;
}

.table-area :deep(.el-table-v2__header-cell .el-table-v2__header-cell.blue-right-border) {
    border-right: 1px solid blue;
}

.table-area :deep(.el-table-v2__row-cell.blue-right-border) {
    border-right: 1px solid blue;
}

.table-area :deep(.el-table-v2__footer) {
    width: calc(100% - 6px);
    height: 50px !important;
    background-color: #fff;
    border: 1px solid #f2f3f5;
}

.table-area .table-foot {
    width: calc(100% - 16px);
    padding: 0 8px;
    justify-content: space-between;
}

.table-area .table-foot .foot-left {
    color: #666;
}

.table-area .table-foot .foot-right {
    color: #808080;
    flex-direction: row;
}

.table-area .table-foot .foot-right .foot-right-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table-area .table-foot .foot-right:hover {
    color: #409EFF;
}

.table-area .move-area {
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px 5px #f2f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table-area .move-area .move-item {
    height: 50px;
}

.table-area .move-area .move-item :deep(.el-table-v2__header-cell) {
    border: none;
}
</style>