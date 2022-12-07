import Login from "./Users/Login";

import Profile from "./Users/Profile";
import { useGlobalState } from "../context/GlobalState";
import { useState } from "react";

export default function HandleUser(props){
    if(props.page === 'Profile'){
        return <Profile />
    } else if(props.page === 'Login'){
        return <Login />
    } else if(props.page === 'Register'){
        return <Register />
    } else 
        return
}