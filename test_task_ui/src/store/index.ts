import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/users/userSlice'
import groupReducer from './reducers/groups/groupSlice'

const rootReducer = combineReducers({
    users: userReducer,
    groups: groupReducer,
})

export const setupStore = () => {
    return configureStore({
        devTools: process.env['REACT_APP_DEBUG'] === 'true',
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']