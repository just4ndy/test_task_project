import React, {useEffect, useState} from 'react'
import UserList from '../../components/users/UserList'
import {FormControl, InputLabel, Select, SelectChangeEvent} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import MenuItem from '@mui/material/MenuItem'
import {getAllGroups} from '../../store/reducers/groups/ActionCreators'
import {getUsers} from '../../store/reducers/users/ActionCreators'
import AddUser from '../../components/users/AddUser'

const Users = () => {
    const dispatch = useAppDispatch()
    const {allGroups} = useAppSelector(state => state.groups)

    const [group, setGroup] = useState<number>(allGroups[0].id)

    const handleChange = (event: SelectChangeEvent) => {
        setGroup(Number(event.target.value))
    }

    useEffect(() => {
        if (allGroups.length === 0) dispatch(getAllGroups())
        dispatch(getUsers(group))
    }, [group])

    return (
        <div id="users">
            <AddUser/>
            <div id="filters">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-standard-label">Group</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={String(group)}
                        onChange={handleChange}
                        label="Group"
                    >
                        {allGroups.map(group => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <UserList/>
        </div>
    )
}

export default Users