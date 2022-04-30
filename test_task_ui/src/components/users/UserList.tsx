import React from 'react'
import {useAppSelector} from '../../hooks/redux'
import {Stack, Typography} from '@mui/material'
import UserItem from './UserItem'
import Box from '@mui/material/Box'

const UserList = () => {
    const {users, isLoading, error} = useAppSelector(state => state.users)

    if (isLoading) {
        return <Typography variant="h5">Loading...</Typography>
    }

    if (error) {
        return <Typography variant="h5">Error: {error}</Typography>
    }

    return (
        <Box sx={{width: '100%'}}>
            <Stack spacing={2}>
                {users && users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </Stack>
        </Box>
    )
}

export default UserList