import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './container/Layout'
import Users from './pages/users/Users'
import Groups from './pages/groups/Groups'
import GroupEdit from './pages/groups/GroupEdit'
import UserEdit from './pages/users/UserEdit'


const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='users/' element={<Users/>}/>
                <Route path='users/edit/:user_id' element={<UserEdit/>}/>
                <Route path='groups/' element={<Groups/>}/>
                <Route path='groups/edit/:group_id' element={<GroupEdit/>}/>
            </Routes>
        </Layout>
    )
}

export default App