import React, {ChangeEvent, useEffect, useState} from 'react'

import {FormControl, TextField} from '@mui/material'
import GroupList from '../../components/groups/GroupList'
import Button from '@mui/material/Button'
import {useAppDispatch} from '../../hooks/redux'
import {getGroups} from '../../store/reducers/groups/ActionCreators'
import AddGroup from '../../components/groups/AddGroup'

const Groups = () => {

    const dispatch = useAppDispatch()

    const [filters, setFilters] = useState({
        name: '',
        description: '',
    })

    const {name, description} = filters

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        })
    }

    const handleClick = () => {
        dispatch(getGroups(name, description))
    }

    useEffect(() => {
        dispatch(getGroups(name, description))
    }, [])

    return (
        <div id="groups">
            <AddGroup/>
            <div id="filters">
                <FormControl fullWidth margin="normal">
                    <TextField required name='name' value={name} onChange={e => handleChange(e)} id="standard-basic" label="Name"
                               variant="standard"/>
                    <TextField required name='description' value={description} onChange={e => handleChange(e)} id="standard-basic"
                               label="Description"
                               variant="standard"/>
                </FormControl>
                <Button disabled={!name && !description} onClick={handleClick} variant="contained" color="info">
                    Filter
                </Button>
            </div>
            <GroupList/>
        </div>
    )
}

export default Groups