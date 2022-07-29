import React, { useState, useEffect } from 'react'
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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

//css
import '../form.css'

const Trade = () => {
    const [ balance, setBalance ] = useState('')
    const [ tx, setTx ] = useState('')
    const [ totalReceive, setTotalReceive ] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userPin = user.info.pin
    const add = user.info.wallet_publicAddress

    const walletBalance = async() => {
        try {
            const response = await axios.get(`https://blockchain.info/balance?active=${user.info.wallet_publicAddress}`)
            setBalance(response.data[add].final_balance)
            setTx(response.data[add].n_tx)
            setTotalReceive(response.data[add].total_received)
        } catch (err) {
            toast.error(err.response.data)
        } 
    }

    // const walletTransaction = async() => {
    //     try {
    //         const response = await axios.get(`https://blockchain.info/rawaddr/164YfkMnksHBJtRQ3XdVQkikMxxykRQvTy`)
    //         console.log(response.data)
    //     } catch (err) {
    //         toast.error(err.response.data)
    //     }
    // }

    useEffect(() => {
        walletBalance()
        // walletTransaction()
    })

    const checkPin = () => {
        if(user.info.pin === null) {
            toast.info('set your pin before you can proceed')
        navigate('/settings')
        }else{
            toast.success('done')
        }
    }
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 500,

        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    
    
    const logout = () => {
        dispatch(LogoutCall())
        toast.info('session expire, login again')
        navigate("/")        
    }

    const token = user.generateToken

     //jwt if jwt token as expire
     const decodeToken = decode(token)
     if(decodeToken.exp*1000 < new Date().getTime())
     logout()


     
    return (
        <>
        <div >
         <Typography variant="h6" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}> Hi, {user.info.username} </Typography>
         <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 375, minHeight: '200px' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >Total Value(BTC):</Typography>
                    <Typography variant="subtitle2" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}>{user.info.wallet_publicAddress} </Typography>

                    <Typography variant="subtitle2" component="div" gutterBottom sx={{textDecoration: "underline"}} >{balance} btc</Typography>

                    {/* BUTTON FOR RECIEVE AND WITHDRAW */}
                    <Stack spacing={4} direction="row" sx={{marginTop: "50px"}}>
                        <CopyToClipboard text={user.info.wallet_publicAddress} 
                            onCopy={() => toast.success('wallet address copied')}>
                            <Button variant="contained">Receive</Button>
                        </CopyToClipboard>
                        <Button variant="contained" color="error" onClick={handleOpen}>Withdraw</Button>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Send BTC
                            </Typography>

                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Send BTC to crypto address
                            </Typography>

                            <Typography variant='subtitle2' sx={{marginTop: '20px'}} >Address</Typography>
                            <input type='text' name='address' placeholder='Long press to paste'></input>

                            <Typography variant='subtitle2' sx={{marginTop: '20px'}}>Network</Typography>
                            <input type='text' name='network' placeholder='Bitcoin'></input>

                            <Typography variant='subtitle2' sx={{marginTop: '20px'}}>Amount</Typography>
                            <input type='number' name='amount' placeholder='Bitcoin' style={{boxSizing: 'border-box', width: "100%", padding: "7px", border: '1px solid #BEBEBE'}}></input>

                            <div >
                                <Button variant="contained" color="error" sx={{marginTop: '20px'}} onClick={checkPin} disabled>Withdraw</Button>
                            </div>
                        </div>
                        </Box>
                        </Modal>
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 375, minHeight: "200px"}}>
                <CardContent>

                    {/* GET RECENT TRANSACTION HISTORY */}
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >RECENT TRANSACTION:</Typography>
                    <Typography variant="subtitle2" component="div">This address has transacted {tx} times on Bitcoin blockchain. It has received a total of {totalReceive} BTC. The current value  of this address is {balance} BTC</Typography>

                    
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
