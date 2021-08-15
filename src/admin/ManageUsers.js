import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import { changeRoleAPI, getAllUsers } from './helper/AdminApiCall'
import "./helper/styles/manageUsersStyle.css"

function ManageUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAllUsers(isAuthenticated().user._id, isAuthenticated().token).then((res) => {
            setUsers(res);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        })
    }, [])
    const changeRoleHandler = (userId, role) => {
        changeRoleAPI(userId, isAuthenticated().token, isAuthenticated().user._id, role)
            .then((res) => {
                console.log(res)
            })
    }
    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    else {
        return (
            <div className="manage-users-body">
                <div className="manage-users-table-head">
                    <div className="item">Name</div>
                    <div className="item">Email</div>
                    <div className="item">Role</div>
                    <div className="item">Id</div>
                    <div className="item">Action</div>
                </div>
                {
                    users.map((user) => {
                        return (
                            <div className="manage-users-table-raw">
                                <div className="item">{user.name}</div>
                                <div className="item">{user.email}</div>
                                <div className="item">{user.role == 0 ? "user" : "Admin"}</div>
                                <div className="item">{user._id}</div>
                                <div className="item" onClick={() => { changeRoleHandler(user._id, 1 - user.role) }}><span>{user.role == 0 ? "Make Admin" : "Dissmiss"}</span></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default ManageUsers
