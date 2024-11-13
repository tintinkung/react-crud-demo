import React from "react"
import AsyncWrapper from "../components/AsyncWrapper.js"
import { Link } from "react-router-dom";
import UserList from "../components/UserList"

import "./Users.css"

const Users = () => {
  return (
    <div className="app-content">
      <button className="add-button">
        <Link to="/add" >
        Add new user
        </Link>
      </button>
      <AsyncWrapper>
        <UserList />
      </AsyncWrapper>
    </div>
  )
}

export default Users