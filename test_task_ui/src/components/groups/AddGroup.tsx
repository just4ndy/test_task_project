import * as React from 'react'
import {ChangeEvent, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {TextField} from '@mui/material'
import axios from 'axios'
import {IGroup} from '../../models/IGroup'
import {useAppDispatch} from '../../hooks/redux'
import {getGroups} from '../../store/reducers/groups/ActionCreators'

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

const AddGroup = () => {
    const dispatch = useAppDispatch()
    const [group, setGroup] = useState<IGroup>({
        id: 0,
        name: '',
        description: '',
    })
    const {name, description} = group

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGroup({
            ...group,
            [event.target.name]: event.target.value,
        })
    }

    const handleClick = () => {
        try {
            axios.post(`http://localhost:8000/groups/`, {
                name,
                description,
            })
            handleClose()
            dispatch(getGroups())
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField required name="name" value={name} onChange={e => handleChange(e)} id="standard-basic"
                               label="Name"
                               variant="standard"/>
                    <TextField required name="description" value={description} onChange={e => handleChange(e)}
                               id="standard-basic"
                               label="Description"
                               variant="standard"/>
                    <Button type="submit" onClick={handleClick}>Add</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AddGroup