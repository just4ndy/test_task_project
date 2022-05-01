import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {Alert, AlertTitle, Stack, Typography} from '@mui/material'
import Box from '@mui/material/Box'
import GroupItem from './GroupItem'
import {groupSlice} from '../../store/reducers/groups/groupSlice'

const GroupList = () => {
    const dispatch = useAppDispatch()
    const {groups, isLoading, error} = useAppSelector(state => state.groups)

    const closeHandler = () => {
        dispatch(groupSlice.actions.clearError())
    }

    return (
        <>
            {error && <Alert severity="error" onClose={() => closeHandler()}><AlertTitle>Error</AlertTitle>{error}
            </Alert>}
            {isLoading && <Typography variant="h5">Loading...</Typography>}
            <Box marginTop={2} sx={{width: '100%'}}>
                <Stack spacing={2}>
                    {groups && groups.map(group => (
                        <GroupItem key={group.id} group={group}/>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default GroupList