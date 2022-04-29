import React from 'react'
import {Paper, styled, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {useAppDispatch} from '../../hooks/redux'
import {IGroup} from '../../models/IGroup'
import {deleteGroup} from '../../store/reducers/groups/ActionCreators'
import {Link} from 'react-router-dom'

interface IProps {
    group: IGroup
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const spanStyle = {
    fontWeight: 'bold',
    fontSize: '1.2em',
}

const GroupItem = ({group}: IProps) => {
    const dispatch = useAppDispatch()
    const clickHandler = (id: number) => {
        dispatch(deleteGroup(id))
    }
    return (
        <Item>
            <span style={spanStyle}><b>{group.id}.</b> {group.name}</span>
            <br/>
            <Typography textAlign='center'>
                {group.description}
            </Typography>
            <br/>
            <Link to={`edit/${group.id}`}>
                <Button color="primary" variant="outlined">
                    Edit
                </Button>
            </Link>
            &nbsp;
            <Button onClick={() => clickHandler(group.id)} color="secondary" variant="contained">
                Delete
            </Button>
        </Item>

    )
}

export default GroupItem