import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Trade = () => {
    const [ user, setUser ] = useState([])

    // useEffect(() => {
    //     const userID = localStorage.getItem("user")
    //     setUser(userID)
    // })

    const getUserId = localStorage.getItem('user')
    useEffect(() => {
        setUser(getUserId)
    })

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
