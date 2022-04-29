import React, {ChangeEvent, useEffect, useState} from 'react'
import {IGroup} from '../../models/IGroup'
import axios from 'axios'
import {Stack, TextField} from '@mui/material'
import Button from '@mui/material/Button'
import {useNavigate, useParams} from 'react-router-dom'
import Box from '@mui/material/Box'
import {useAppDispatch} from '../../hooks/redux'


const GroupEdit = () => {
    const navigate = useNavigate()
    const {group_id} = useParams()

    const [group, setGroup] = useState<IGroup>({
        id: 0,
        name: '',
        description: '',
    })
    const {name, description} = group
    useEffect(() => {
        axios.get(`http://localhost:8000/groups/${group_id}/`)
            .then(res => {
                setGroup(res.data)
            })
    }, [group_id])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGroup({
            ...group,
            [event.target.name]: event.target.value,
        })
    }

    const handleClick = () => {
        try {
            axios.put(`http://localhost:8000/groups/${group.id}/`, {
                name,
                description,
            })
            return navigate('/groups')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id="group_edit" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box marginTop={4} sx={{width: '25%'}}>
                <Stack spacing={2}>
                    <TextField required name="name" value={name} onChange={e => handleChange(e)} id="standard-basic"
                               label="Name"
                               variant="standard"/>
                    <TextField required name="description" value={description} onChange={e => handleChange(e)}
                               id="standard-basic"
                               label="Description"
                               variant="standard"/>
                    <Button onClick={handleClick} variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </Stack>
            </Box>
        </div>
    )
}

export default GroupEdit