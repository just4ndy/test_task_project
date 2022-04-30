import {IGroup} from './IGroup'

export interface IUser {
    id: Readonly<number>
    username: string
    group: IGroup
    created_at: Readonly<string>
}