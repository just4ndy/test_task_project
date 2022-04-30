import * as React from 'react'
import {ChangeEvent, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {FormControl, InputLabel, Select, SelectChangeEvent, TextField} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import {IUser} from '../../models/IUser'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {getAllGroups} from '../../store/reducers/groups/ActionCreators'
import {getUsers} from '../../store/reducers/users/ActionCreators'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const AddUser = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {allGroups} = useAppSelector(state => state.groups)

    const [user, setUser] = useState<IUser>({
        id: 1,
        username: '',
        group: {
            id: 1,
            name: '',
            description: ''
        },
        created_at: ''
    })
    const [group, setGroup] = useState<number>(1)
    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.name === 'group') {
            setGroup(Number(event.target.value))
        } else {
            setUser({...user, username: event.target.value})
        }
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClick = () => {
        try {
            axios.post('http://localhost:8000/users/', {
                username: user.username,
                group: group
            })
            dispatch(getUsers(group))
            handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add user</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                            name="group"
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
                    <Button type="submit" onClick={handleClick}>Add</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AddUser