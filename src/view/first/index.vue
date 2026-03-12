<script setup lang="ts">
import { gsap } from "gsap";
import { ref, computed, onMounted, onUnmounted, reactive, nextTick, unref } from 'vue'
import { useLocale } from 'element-plus'
const { t } = useLocale()
import Mock from 'mockjs'
import table_v2_tag from '@/components/table_v2/tag.vue'
import selectionForTable from '@/components/table_v2/components/selection.vue'
import { h } from 'vue'
import ownerVue from './components/owner.vue'
import scheduleHeader from './components/schedule/header.vue'
import scheduleContent from './components/schedule/content.vue'
import { DictItem } from '@/type/utils'
import { selectByDict } from '@/utils/index.js'
import { TaskItem } from '@/type/first'
import TagWithText from './components/tagWithText.vue'
import { More } from '@element-plus/icons-vue'
import { el } from "element-plus/es/locale";




const renderTag = (cellData: string, rowData: TaskItem, typeDom: string, color: string, dict?: Array<DictItem>, className?: string) => {
    return h(table_v2_tag, {
        value: cellData,
        size: 'small',
        row: rowData,
        typeDom: typeDom,
        color: typeDom === 'text' ? '' : color || selectByDict(cellData, 'value', dict)?.[0]?.color,
        class: className
    });
};

const renderOwner = (cellData: string, rowData: TaskItem, color?: string) => {
    return h(ownerVue, {
        value: cellData,
        row: rowData,
        color: color
    });
};

const renderTagWithText = (rowData: TaskItem, dict?: Array<DictItem>, className?: string) => {
    return h(TagWithText, {
        tagText: rowData.status,
        text: rowData.duration,
        row: rowData,
        color: selectByDict(rowData.status, 'value', dict)?.[0]?.color,
        class: className
    });
};

const renderSchedule = (cellData: string, rowData: TaskItem, index: number, color?: string) => {
    return h(scheduleContent, {
        value: cellData,
        row: rowData,
        color: color,
        onChangeDate: (val) => {
            allData.value[index].schedule = val
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
        if (!containsChecked && checked) {
            infoSet.checkList = _data.map(item => { return item.id })

        } else if (containsChecked && checked) {
            infoSet.checkList = _data.map(item => { return item.id })
        }
        else if (containsChecked && !allSelected) {
            infoSet.checkList = _data.map(item => {
                return item.id
            })
        } else if (checked) {
            infoSet.checkList = _data.map(item => { return item.id })
        } else {
            infoSet.checkList = []

        }
    }

    return h(selectionForTable, {
        id: 0,
        list: infoSet.checkList,
        intermediate: containsChecked && !allSelected,
        ariaLabel: t('el.table.selectAllLabel'),
        allLength: allData.value.length,
        onChooseChange: (id) => onChange(id)
    }
    )
}

const infoSet = reactive({
    checkList: []
})

const renderCellCheckout = (cellData, rowData, index) => {
    const onChange = (value: number) => {
        let idIndex = infoSet.checkList.findIndex(item => item === value)
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

const flowDict = [
    { label: "", value: "需求", color: "#dff3f7" },
    { label: "", value: "设计", color: "#ffefd9" },
    { label: "", value: "走查", color: "#fae9f9" }
]

const priorityDict = [
    { label: "", value: "暂定", color: "#f0f1f5" },
    { label: "", value: "待定", color: "#e4effe" },
    { label: "", value: "P0", color: "#fee1e1" },
    { label: "", value: "P1", color: "#ffefd9" },
    { label: "", value: "P2", color: "#e7fae3" },
    { label: "", value: "P3", color: "#dff3f7" },
    { label: "", value: "P4", color: "#fae9f9" }
]
const statusDict = [
    { label: "", value: "进行中", color: "#e4effe" },
    { label: "", value: "策划中", color: "#e4effe" },
    { label: "", value: "待确认", color: "#ffefd9" }
]

const columns = reactive([

    {
        key: 'id',
        title: '',
        dataKey: 'id',
        class: 'tableItems',
        headerClass: '',
        width: 50,
        flexGrow: 0,
        cellRenderer: ({ cellData, rowData, rowIndex }) => renderCellCheckout(cellData, rowData, rowIndex),
        headerCellRenderer: ({ }) => renderHeaderCheckout()
    },
    {
        key: 'version',
        title: '版本规划',
        dataKey: 'version',
        class: 'tableItems',
        headerClass: '',
        flexGrow: 0,
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '#f2f3f5', [], 'tagRadius')
    },
    {
        key: 'flow',
        title: '任务流程',
        dataKey: 'flow',
        class: 'tableItems',
        headerClass: '',
        flexGrow: 0,
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '', flowDict)
    },
    {
        key: 'priority',
        title: '优先级',
        dataKey: 'priority',
        class: 'tableItems',
        headerClass: '',
        flexGrow: 0,
        width: 80,
        cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'tag', '', priorityDict)
    },
    {
        key: 'name',
        title: '任务名称',
        dataKey: 'name',
        class: 'tableItems',
        headerClass: '',
        flexGrow: 1,
        width: 150,
        cellRenderer: ({ cellData, rowData }) => h('span', { class: 'px-4' }, cellData)
    },
    {
        key: 'owner',
        title: '当前负责人',
        dataKey: 'owner',
        class: 'tableItems',
        headerClass: '',
        width: 132,
        cellRenderer: ({ cellData, rowData }) => renderOwner(cellData, rowData, 'avatar')
    },
    {
        key: 'status',
        title: '任务状态',
        dataKey: 'status',
        class: 'tableItems',
        flexGrow: 0,
        width: 150,
        cellRenderer: ({ rowData }) => renderTagWithText(rowData, statusDict)
    },
    {
        key: 'module',
        title: '所属模块',
        dataKey: 'module',
        class: 'tableItems',
        flexGrow: 0,
        width: 150,
        cellRenderer: ({ cellData, rowData }) => renderTag(cellData, rowData, 'text', '')
    },
    {
        key: 'schedule',
        title: '排期',
        dataKey: 'schedule',
        class: 'tableItems',
        flexGrow: 0,
        width: 242,
        headerClass: 'schedule',
        cellRenderer: ({ cellData, rowData, rowIndex }) => renderSchedule(cellData, rowData, rowIndex, 'colText'),
        headerCellRenderer: ({ }) => renderScheduleHeader()
    },
])


// --- Mock 数据生成 ---
const generateMockData = (count) => {
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
const tableContainerRef = ref(null)
const scrollTop = ref(0)


const handleScroll = (e) => {
    const target = e.target as HTMLDivElement
    scrollTop.value = target.scrollTop
}


onMounted(() => {
    nextTick(() => {
        tableContainerRef.value?.addEventListener('scroll', handleScroll)
    })
})

onUnmounted(() => {
    tableContainerRef.value?.removeEventListener('scroll', handleScroll)
})

let resizeTimer: NodeJS.Timeout | null = null
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



const tableX = ref(0)
const tableY = ref(0)
const moveArea = ref()
const moveItem = ref()
const showArea = ref(false)
const moveKey = ref('')
const moveCol = ref(0)
const willAddCol = ref()
const startMoveHeader = (val) => {
    let willMoveDom = val.target
    if (val.target.className !== 'el-table-v2__header-cell' && val.target.className !== 'el-table-v2__header-cell-text') {
        return
    } else if (val.target.className !== 'el-table-v2__header-cell-text') {
        willMoveDom = val.target.firstElementChild
    }
    if (val.target.className === 'el-table-v2__header-cell-text') {
        moveKey.value = val.target.parentElement.getAttribute('data-key')
    } else {
        moveKey.value = val.target.getAttribute('data-key')
    }
    columns.some((item, index) => {
        if (item.key === moveKey.value) {
            moveCol.value = index
            return
        }
    })
    willAddCol.value = JSON.parse(JSON.stringify(columns[moveCol.value]))


    computedCol()
    showArea.value = true
    let x = val.pageX - tableX.value - 240
    let y = val.pageY - tableY.value - 120
    let dom = willMoveDom.cloneNode('deep')

    moveItem.value.innerHTML = ''
    moveItem.value.appendChild(dom)
    gsap.set(moveArea.value, {
        x: x,
        y: y
    })

}
const moveTimer = ref(null);

const computedCol = () => {
    let tableHeader = document.querySelectorAll('el-table-v2__header-cell')
    tableHeader.forEach(item => {
        item.setAttribute('maxRight', String(item.getBoundingClientRect().right))
    })
}

const move = (val) => {
    if (!moveTimer.value) {
        moveTimer.value = setTimeout(() => {
            let left = val.layerX
            let willMoveDom = val.target
            if (val.target.className !== 'el-table-v2__header-cell' && val.target.className !== 'el-table-v2__header-cell BlueRightBorder') {
                willMoveDom = val.target.parentElement
            }
            let key = willMoveDom.getAttribute('data-key')
            columns.some(item => {
                if (item.key === key) {
                    item.class = 'tableItems BlueRightBorder'
                    if (key === 'schedule') {
                        item.headerClass = 'schedule BlueRightBorder'

                    } else {
                        item.headerClass = 'BlueRightBorder'
                    }
                } else {
                    item.class = 'tableItems'
                    if (key === 'schedule') {
                        item.headerClass = 'schedule'
                    } else {
                        item.headerClass = ''
                    }
                }
            })

            let x = val.pageX - tableX.value - 240
            let y = val.pageY - tableY.value - 120
            gsap.set(moveArea.value, {
                x: x,
                y: y
            });
            clearTimeout(moveTimer.value)
            moveTimer.value = null
        }, 5)
    }


};


const moveHeader = (val) => {
    if (showArea.value) {
        move(val)
    }
};


const leaveHeader = () => {
    if (showArea.value) {
        showArea.value = false
    }

}

const endMoveHeader = (val) => {
    let willMoveDom = val.target
    if (val.target.className === 'el-table-v2__header-cell-text') {
        willMoveDom = val.target.parentElement
    }
    let key = willMoveDom.getAttribute('data-key')
    let toMoveIndex = -1
    if (key !== moveKey.value && key) {
        columns.splice(moveCol.value, 1)

        columns.some((item, index) => {
            if (item.key === key) {
                toMoveIndex = index
                return
            }
        })
        if (toMoveIndex !== -1) {
            columns.splice(toMoveIndex + 1, 0, willAddCol.value)
        }
    }
    columns.forEach(item => {
        item.class = 'tableItems'
        item.headerClass = item.key === 'schedule' ? 'schedule' : ''
    })

    localStorage.setItem('columns', JSON.stringify(columns))

    moveCol.value = 0
    moveKey.value = ''
    willAddCol.value = ''
    showArea.value = false
}

onMounted(() => {
    let storageColumns = JSON.parse(localStorage.getItem('columns'))
    if (storageColumns) {
        columns = storageColumns
    }
    moveArea.value = document.querySelector('.moveArea')
    moveItem.value = document.querySelector('.moveItem')
    tableX.value = tableContainerRef.value.offsetLeft
    tableY.value = tableContainerRef.value.offsetTop

    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    moveArea.value = ''
    moveItem.value = ''
    window.removeEventListener('resize', handleResize)
})

</script>

<template>
    <div class="w-full h-full flex tableArea">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <div ref="tableContainerRef" @mousedown="startMoveHeader" @mousemove.stop="moveHeader"
                    @mouseleave="leaveHeader" @mouseup="endMoveHeader">
                    <el-table-v2 :columns="columns" :data="allData" :width="width" :height="height"
                        header-class="tableV2Header" :fixed="false" />
                </div>
            </template>
        </el-auto-resizer>
        <div class="moveArea" v-show="showArea">
            <div class="moveItem"></div>
            <div class="moveMoreIcon">
                <el-icon>
                    <More />
                </el-icon>
            </div>
        </div>
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
    position: relative;
    user-select: none;

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

    :deep(.el-table-v2__header-cell.BlueRightBorder) {
        border-right: 1px solid blue;
    }

    :deep(.el-table-v2__header-cell .el-table-v2__header-cell.BlueRightBorder) {
        border-right: 1px solid blue;
    }

    :deep(.el-table-v2__row-cell.BlueRightBorder) {
        border-right: 1px solid blue;
    }

    .moveArea {
        position: absolute;
        background-color: #fff;
        padding: 0.5rem;
        box-shadow: 0 0 10px 5px #f2f3f5;
        display: flex;
        align-items: center;
        justify-content: center;

        .moveItem {
            padding: 0 1rem;
        }

        .moveMoreIcon {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            border: 1px solid #f2f3f5;
        }
    }
}
</style>
