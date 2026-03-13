import { type DictItem } from '@/type/utils'
export function selectByDict(
  value: string | number,
  mode: keyof DictItem,
  dictList: Array<DictItem>,
): Array<DictItem> {
  return dictList.filter((dict: DictItem) => {
    return dict[mode] === value
  })
}

export function formatDate(date: string | Date, fmt = 'yyyy-MM-dd'): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'H+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
  } as {
    [key: string]: any
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      )
    }
  }
  return fmt
}
