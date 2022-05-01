import {AppDispatch} from '../../index'
import axios from 'axios'
import {IUser} from '../../../models/IUser'
import {userSlice} from './userSlice'

export const getUsers = (group: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.getUser())
        const response = await axios.get<IUser[]>('http://localhost:8000/users/', {
            params: {
                group,
            },
        })
        dispatch(userSlice.actions.getUserSuccess(response.data))
    } catch (e: any) {
        console.log(e)
        dispatch(userSlice.actions.getUserFailure(e.response.data.group))
    }
}

export const deleteUser = (id: number, group_id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.deleteUser())
        await axios.delete(`http://localhost:8000/users/${id}/`)
        dispatch(userSlice.actions.deleteUserSuccess())
        dispatch(getUsers(group_id))
    } catch (e: any) {
        dispatch(userSlice.actions.deleteUserFailure(e.response.data.message))
    }
}