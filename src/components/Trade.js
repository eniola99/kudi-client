import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector, useDispatch,} from "react-redux";
import { LogoutCall } from '../REDUX/userSlice'
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const Trade = () => {
    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     const userID = localStorage.getItem("user")
    //     setUser(userID)
    // })

    const logout = () => {
        dispatch(LogoutCall())
        navigate("/home")        
    }

    const token = user.generateToken

     //jwt if jwt token as expire
     const decodeToken = decode(token)
     if(decodeToken.exp*1000 < new Date().getTime())
     logout()

    return (
        <>
        
        <Avatar sx={{marginBottom : "50px"}}/>
         <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    this will holds the wallet balance <br/> copy wallet address <br/> and send bitcoin with the order popping out
                   
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                    this is hold all the transaction history
                    
                </CardContent>
            </Card>
        </Masonry>
        </>
    )
}

export default Trade
