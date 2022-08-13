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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'

//css
import '../form.css'

const Trade = () => {
    const [ balance, setBalance ] = useState('')
    const [ tx, setTx ] = useState('')
    const [ txId, setTxId ] = useState([])
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

    const walletTransaction = async() => {
            const response = await axios.get(`https://sochain.com/api/v2/get_tx_spent/BTC/${add}`)
            setTxId(response.data.data.txs)
        }

    useEffect(() => {
        walletBalance()
        walletTransaction()
    }, [])

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
         <Typography variant="h6" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}> Hi, {user.info.firstName} </Typography>
         <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 375 }}>
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
            <Card sx={{ minWidth: 375, minHeight: 300}}>
                <CardContent>

                    {/* GET RECENT TRANSACTION HISTORY */}
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >RECENT TRANSACTION:</Typography>
                    <Typography variant="subtitle2" component="div">This address has transacted {tx} times on Bitcoin blockchain. It has received a total of {totalReceive} BTC. The current value  of this address is {balance} BTC</Typography>
                    {txId.length < 1 ? 
                     <Typography variant="h6" component="div" gutterBottom sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>NO TRANSACTION ON THIS ADDRESS</Typography> :
                        <TableContainer component={Paper} sx={{marginTop: '20px'}}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Txh Hash</TableCell>
                                    <TableCell>Block</TableCell>
                                    <TableCell>Value</TableCell>
                                    {/* <TableCell align="right">Age</TableCell> */}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {txId.slice(-4).map((row) => (
                                    <TableRow
                                    key={row.txid}
                                    >
                                    <TableCell component="th" scope="row">
                                    <a href={`https://www.blockchain.com/btc/tx/${row.txid}`} target="_blank" rel="noreferrer">
                                        {row.txid.slice(0,30)}
                                    </a>
                                    </TableCell>
                                    <TableCell>{row.confirmations}</TableCell>
                                    <TableCell>${Math.floor((row.value * 0.0002331) * 100000000)}</TableCell>
                                    {/* <TableCell align="right">{moment(row.time).fromNow()}</TableCell> */}
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 375, minHeight: 300 }}>
            <CardContent>
            <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >ACTIVE TRADERS</Typography>
            <Typography variant="subtitle2" component="div" gutterBottom>
                 Active Traders will appear here with a button to intiate trade
            </Typography>
            <Typography variant="caption text" component="div" gutterBottom>
                coming soon...
            </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 375, minHeight: 300 }}>
            <CardContent>
            <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >RECENT TRADE'S</Typography>
            <Typography variant="subtitle2" component="div" gutterBottom>
                 Recent trades with online active traders will appear here
            </Typography>
            <Typography variant="caption text" component="div" gutterBottom>
                coming soon...
            </Typography>
            </CardContent>
            </Card>
        </Masonry>
        </div>
        </>
    )
}

export default Trade
