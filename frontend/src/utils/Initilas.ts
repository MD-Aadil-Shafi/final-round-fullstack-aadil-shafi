export const getInitials =(val?:string):string =>{
    if(!val) return ''
    return val?.[0]?.toUpperCase()
}