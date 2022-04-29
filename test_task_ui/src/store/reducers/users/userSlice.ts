import {IUser} from '../../../models/IUser'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    users: IUser[]
    isLoading: boolean
    error: string
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUser: (state) => {
            state.isLoading = true
        },
        getUserSuccess: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
            state.isLoading = false
            state.error = ''
        },
        getUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        deleteUser: (state) => {
            state.isLoading = true
        },
        deleteUserSuccess: (state) => {
            state.isLoading = false
            state.error = ''
        },
        deleteUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
    }
})

export default userSlice.reducer