import {AppDispatch} from '../../index'
import axios from 'axios'
import {groupSlice} from './groupSlice'
import {IGroup} from '../../../models/IGroup'

export const getGroups = (name: string = '', description: string = '') => async (dispatch: AppDispatch) => {
    try {
        dispatch(groupSlice.actions.getGroups())
        const response = await axios.get<IGroup[]>('http://localhost:8000/groups/', {
            params: {
                name,
                description,
            },
        })
        dispatch(groupSlice.actions.getGroupsSuccess(response.data))
    } catch (e: any) {
        dispatch(groupSlice.actions.getGroupsFailure(e.response.data.message))
    }
}

export const getAllGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(groupSlice.actions.getAllGroups())
        const response = await axios.get<IGroup[]>('http://localhost:8000/groups/get-all-groups/')
        dispatch(groupSlice.actions.getAllGroupsSuccess(response.data))
    } catch (e: any) {
        dispatch(groupSlice.actions.getAllGroupsFailure(e.response.data.message))
    }
}

export const deleteGroup = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(groupSlice.actions.deleteGroup())
        await axios.delete(`http://localhost:8000/groups/${id}/`)
        dispatch(groupSlice.actions.deleteGroupSuccess())
        dispatch(getGroups())
    } catch (e: any) {
        dispatch(groupSlice.actions.deleteGroupFailure(e.response.data.message))
    }
}
