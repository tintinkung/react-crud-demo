import React from "react"
import { useNavigate } from "react-router-dom"

import "./Card.css"
import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userListsAtom, usersListUrl } from "../states"

const Card = ({ user }) => {
    const navigate = useNavigate();
    const setUserList = useSetRecoilState(userListsAtom);
    const apiUrl = useRecoilValue(usersListUrl);

    const handleDelete= async (id) => {
        try{
            await axios.delete(apiUrl + id);
            setUserList((userList) => userList.filter(user => user.id != id));

        } catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = (id) => {
        navigate(`/update/${id}`)
    }

    return (
        <tr className="user-card" key={user.name}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.phone}</td>
            <td style={{ padding: "unset" }}><button className='delete-button' onClick={() => handleDelete(user.id)}>Delete</button></td>
            <td style={{ padding: "unset" }}><button className='update-button' onClick={() => handleUpdate(user.id)}>Update</button></td>
        </tr>
    )
}

export default Card