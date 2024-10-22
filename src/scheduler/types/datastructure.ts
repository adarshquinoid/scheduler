import { modes } from "../helpers/constants"

export type Group={
    name:string
    parent:null|number|string
    id:number|string
    expand:boolean
    hasChild?:boolean
    type:string
    
}
export type calandar=any

export type ModeValue = typeof modes[keyof typeof modes];