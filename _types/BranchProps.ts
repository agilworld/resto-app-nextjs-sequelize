
export type PropsData = {
    branch:any,
    origin?:any,
    baseApiUrl?:any,
    error?:any
}

export type PropsIndexData = {
    list:any
}

export type BranchPostData = {
    name?:string,
    open?:string,
    close?:string,
    lat?:string,
    lng?:string
}

export type BranchItemData = {
    id:number,
    name:string,
    open:string,
    close:string,
    lat?:number,
    lng?:number,
    createdAt:string,
    updatedAt?:string
}

export type BranchMealData = {
    name?:string,
    branch_id?:string
}

export type BranchMealItem = {
    id:number,
    name:string,
    branch:BranchItemData,
    createdAt:string,
    updatedAt?:string
}


