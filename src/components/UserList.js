import React from "react"
import { useRecoilValue } from "recoil"
import { userListsAtom } from "../states"
import AsyncWrapper from "./AsyncWrapper"

import Card from "./Card"
import "./UserList.css"

const UserList = () => {
  const userList = useRecoilValue(userListsAtom)

  return (
    <>
      <table className="list-item-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone</th>
            <th style={{ opacity: 0 }}>Delete</th>
            <th style={{ opacity: 0 }}>Update</th>
          </tr>
        </thead>
        <tbody>
            {userList?.map((user) => {
              console.log("indexing: ", user)
              return (
                <AsyncWrapper key={user.id}>
                  <Card key={user.id} pokemon={user} />
                </AsyncWrapper>
              )
            })}
        </tbody>
        
      </table>
    </>
  )
}

export default UserList