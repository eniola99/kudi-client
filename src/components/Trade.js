import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector, useDispatch,} from "react-redux";
import { LogoutCall } from '../REDUX/userSlice'
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {toast} from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard';

// import fetch from 'node-fetch'

const Trade = () => {
    const [ balance, setBalance ] = useState('')
    
    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const walletBalance = async() => {
        try {
            const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${user.info.wallet_publicAddress}/balance`)
            // return response.data.balance
            setBalance(response.data.balance/100000000)
            // console.log(response.data)
        } catch (err) {
            toast.error(err.response.data)
        } 
    }

    const walletTransaction = async() => {
        try {
            const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/164YfkMnksHBJtRQ3XdVQkikMxxykRQvTy/full?before=300000`)
            console.log(response.data.txs)
        } catch (err) {
            toast.error(err.response.data)
        }
    }

    useEffect(() => {
        walletBalance()
        walletTransaction()
    })
    
    
    const logout = () => {
        dispatch(LogoutCall())
        navigate("/")        
    }

    const token = user.generateToken

     //jwt if jwt token as expire
     const decodeToken = decode(token)
     if(decodeToken.exp*1000 < new Date().getTime())
     logout()

    return (
        <>
        <div style={{height: "100vh"}}>
         <Typography variant="h6" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}> Hi, {user.info.username} </Typography>
         <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 375, minHeight: '200px' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >Total Value(BTC):</Typography>
                    <Typography variant="subtitle2" component="div" gutterBottom sx={{textDecoration: "underline"}} >{balance} btc</Typography>


                    {/* BUTTON FOR RECIEVE AND WITHDRAW */}
                    <Stack spacing={4} direction="row" sx={{marginTop: "50px"}}>
                        <CopyToClipboard text={user.info.wallet_publicAddress} 
                            onCopy={() => toast.success('wallet address copied')}>
                            <Button variant="contained">Receive</Button>
                        </CopyToClipboard>
                        <Button variant="contained" color="error">Withdraw</Button>
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 375, minHeight: "200px"}}>
                <CardContent>
                    {/* GET RECENT TRANSACTION HISTORY */}
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >RECENT TRANSACTION:</Typography>


                    
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                    this is hold all the transaction history
                    
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                    this is hold all the transaction history
                    
                </CardContent>
            </Card>
        </Masonry>
        </div>
        </>
    )
}

export default Trade
