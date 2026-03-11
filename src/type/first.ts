// 任务数据接口
export interface TaskItem {
  id: number
  version: string
  flow: string
  priority: string | null
  name: string
  owner: string
  status: string
  duration: string
  module: string
  schedule: string
  totalSchedule: string
  avatar: string
}

// Tag 类型映射
export type PriorityType = 'danger' | 'warning' | 'info' | ''
export type StatusType = 'success' | 'warning' | ''