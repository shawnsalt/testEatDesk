export function selectByDict(value,mode,list) {
    return list.filter(item => {
        if(item[mode] === value){
            return item
        }
    })
}