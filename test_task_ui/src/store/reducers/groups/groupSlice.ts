import {IGroup} from '../../../models/IGroup'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GroupState {
    groups: IGroup[]
    isLoading: boolean
    error: string
    allGroups: IGroup[]
}

const initialState: GroupState = {
    groups: [],
    isLoading: false,
    error: '',
    allGroups: [],
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        getGroups: (state) => {
            state.isLoading = true
        },
        getGroupsSuccess: (state, action: PayloadAction<IGroup[]>) => {
            state.groups = action.payload
            state.isLoading = false
            state.error = ''
        },
        getGroupsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        getAllGroups: (state) => {
            state.isLoading = true
        },
        getAllGroupsSuccess: (state, action: PayloadAction<IGroup[]>) => {
            state.allGroups = action.payload
            state.isLoading = false
            state.error = ''
        },
        getAllGroupsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        deleteGroup: (state) => {
            state.isLoading = true
        },
        deleteGroupSuccess: (state) => {
            state.isLoading = false
            state.error = ''
        },
        deleteGroupFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
        clearError(state) {
            state.error = ''
        }
    },
})

export default groupSlice.reducer