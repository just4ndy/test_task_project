import React, {ChangeEvent, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {IUser} from '../../models/IUser'
import axios from 'axios'
import Box from '@mui/material/Box'
import {FormControl, InputLabel, Select, SelectChangeEvent, Stack, TextField} from '@mui/material'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import {getAllGroups} from '../../store/reducers/groups/ActionCreators'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'

const UserEdit = () => {
    const navigate = useNavigate()
    const {user_id} = useParams()

    const dispatch = useAppDispatch()
    const {allGroups} = useAppSelector(state => state.groups)

    const [group, setGroup] = useState<number>(3)

    const [user, setUser] = useState<IUser>({
        id: 5,
        username: 'Andrew',
        created_at: '',
        group: {
            id: 3,
            name: 'Software Developer',
            description: 'Software Developer'
        },
    })

    useEffect(() => {
        if (allGroups.length === 0) {
            dispatch(getAllGroups())
        }
        axios.get(`http://localhost:8000/users/${user_id}/`)
            .then(res => {
                setUser(res.data)
            })
    }, [allGroups.length, dispatch, user_id])

    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.name === 'group') {
            setGroup(Number(event.target.value))
        } else {
            setUser({...user, username: event.target.value})
        }
    }

    const handleClick = () => {
        try {
            axios.put(`http://localhost:8000/users/${user.id}/`, {
                id: user.id,
                username: user.username,
                group: group
            })
            return navigate('/users')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id="user_edit" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box marginTop={4} sx={{width: '25%'}}>
                <Stack spacing={2}>
                    <TextField required name="username" value={user.username} onChange={e => handleChange(e)}
                               id="standard-basic"
                               label="Name"
                               variant="standard"/>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-standard-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={String(group)}
                            name='group'
                            onChange={e => handleChange(e)}
                            label="Group"
                        >
                            {allGroups.map(group => (
                                <MenuItem key={group.id} value={group.id}>
                                    {group.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button onClick={handleClick} variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </Stack>
            </Box>
        </div>
    )
}

export default UserEdit