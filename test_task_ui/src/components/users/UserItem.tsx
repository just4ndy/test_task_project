import React from 'react'
import {IUser} from '../../models/IUser'
import {Paper, styled} from '@mui/material'
import Button from '@mui/material/Button'
import {useAppDispatch} from '../../hooks/redux'
import {deleteUser} from '../../store/reducers/users/ActionCreators'
import {Link} from 'react-router-dom'

interface IProps {
    user: IUser
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

const UserItem = ({user}: IProps) => {
    const dispatch = useAppDispatch()
    const clickHandler = (id: number) => {
        dispatch(deleteUser(id))
    }
    return (
        <Item>
            <span style={spanStyle}><b>{user.id}.</b> {user.username}, {user.group.name}</span>
            <br/>
            {new Date(user.created_at).toLocaleString()}
            <br/>
            <br/>
            <Link to={`edit/${user.id}`}>
                <Button color="primary" variant="outlined">
                    Edit
                </Button>
            </Link>
            &nbsp;
            <Button onClick={() => clickHandler(user.id)} color="secondary" variant="contained">
                Delete
            </Button>
        </Item>

    )
}

export default UserItem