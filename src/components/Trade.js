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
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles';





//css
import '../form.css'

const Trade = () => {
    
    const [ traderList, setTraderList ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isLoading2, setIsLoading2 ] = useState(false)
    const [cP, setCP ] = useState([])
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


    const userPin = user.info.Pin
    const add = user.info.wallet_publicAddress

    const formik = useFormik({
        initialValues: {
            wallet: "", Network: "BTC", amount: ""
        },
        validationSchema: Yup.object({
            wallet: Yup.string().required('required')
        }),
        onSubmit: async (values) => {
            // const userId = localStorage.getItem('info')
            const generate = localStorage.getItem('userToken')
            setIsLoading2(true)
           await axios.post(`https://kudiii.herokuapp.com/auth/user/send/${user.info._id}`, values, {
            headers: {
                "token": `Bearer ${generate}`,
                "Content-Type": "application/json; charset=utf-8",
            }
           })
           .then((res) => toast.info(res.data))
           setIsLoading2(false)
            handleClose()
        }
    })


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

    //active traders
    const activeHandler = async () => {
        const userId = localStorage.getItem('info')
        const generate = localStorage.getItem('userToken')
        setIsLoading(true)
        const response = await axios.get(`https://kudiii.herokuapp.com/auth/user/active/${userId}`, {
            headers: {
                "token": `Bearer ${generate}`,
                "Content-Type": "application/json; charset=utf-8",
            }
        
        })
        setIsLoading(false)
        setTraderList(response.data)
    }

    const priceHandler = async() => {
        const response = await axios.get('https://blockchain.info/ticker')
        setCP(response.data.USD.last)
    }
    const walletTransaction = async() => {
            const response = await axios.get(`https://sochain.com/api/v2/get_tx_spent/BTC/${add}`)
            setTxId(response.data.data.txs)
        }

    useEffect(() => {
        walletBalance()
        walletTransaction()
        priceHandler()
        activeHandler()
    }, [])

    const checkPin = () => {
        if(user.info.Pin === null) {
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
        height: 550,

        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    
    
    const logout = () => {
        dispatch(LogoutCall())
        toast.info('session expire, login again')
        navigate("/")        
    }

    const generate = localStorage.getItem("userToken")
    const token = generate

     //jwt if jwt token as expire
     const decodeToken = decode(token)
     if(decodeToken.exp*1000 < new Date().getTime())
     logout()

     //table style

     const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          fontWeight: "bold"
        },
      }))

     const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
      }));

      const displayAmount = (formik.values.amount * cP).toFixed(2)
      const gasFee = (((((formik.values.amount * 100000000) + 4460) / 100000000) * cP) - displayAmount).toFixed(2)
      const walletB = Number((balance / 100000000) * cP).toFixed(2)

    return (
        <>
        <div >
        {!user.info.Pin ? <Alert severity='error'> Update your account status to be able to use the service</Alert> : null}
         <Typography variant="h6" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}> Hi, {user.info.firstName} </Typography>
         <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 375 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >Total Value(BTC):</Typography>
                    <Typography variant="subtitle2" component="div" gutterBottom sx={{color: "#072A6C", marginBottom: "40px", marginTop: '20px'}}>{user.info.wallet_publicAddress} </Typography>

                    <Typography variant="subtitle2" component="div" gutterBottom sx={{textDecoration: "underline"}} ><strong>${ walletB }</strong></Typography>

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
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginLeft: '20px'}}><strong>SEND BTC</strong></Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: '20px' }}><strong>Send BTC to crypto Address</strong></Typography>

                            <form onSubmit={formik.handleSubmit} className='form-style'>

                                <label htmlFor='Address'>Address</label>
                                <input type='text' name='wallet' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.wallet} />
                                {formik.touched.wallet && formik.errors.wallet ? (<div className='required'>{formik.errors.wallet}</div>) : null}

                                <label htmlFor='Network'>Network</label>
                                <input type='text' name='Network' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Network} />
                                {formik.touched.Network && formik.errors.Network ? (<div className='required'>{formik.errors.Network}</div>) : null}

                                <label htmlFor='Amount'>Amount</label>
                                <input type='number' name='amount' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.amount} />
                                {formik.touched.amount && formik.errors.amount ? (<div className='required'>{formik.errors.amount}</div>) : null}

                                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                                <Typography component='div' variant='subtitle2' ><strong>${displayAmount}</strong></Typography>
                                <Typography component='div' variant='subtitle2' ><strong>~gas ${gasFee}</strong> </Typography>
                                </div>
                                
                                <div className='form-delete'>
                                {user.info.Pin ? <button type='submit' disabled={isLoading}> {isLoading2 ? <CircularProgress color="inherit"/> : <strong>WITHDRAW</strong>} </button> :<div><Button disabled variant='contained' color='error'>WITHDRAW </Button><p>finish setting up your account</p></div>}
                                
                                </div>
                            </form>
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
                    <Typography variant="subtitle2" component="div">This address has transacted {tx} time(s) on Bitcoin blockchain. It has received a total of {totalReceive / 100000000} BTC (<strong>${ Number((totalReceive / 100000000) * cP).toFixed(2)}</strong>). The current value  of this address is {balance / 100000000} BTC (<strong>${ Number((balance / 100000000) * cP).toFixed(2)}</strong>).</Typography>
                    {txId.length < 1 ? 
                     <Typography variant="h6" component="div" gutterBottom sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>NO TRANSACTION ON THIS ADDRESS</Typography> :
                        <TableContainer component={Paper} sx={{marginTop: '20px'}}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Txh Hash</TableCell>
                                    <TableCell>Block</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell align="left">Age</TableCell>
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
                                    <TableCell>${(row.value * cP).toFixed(2)}</TableCell>
                                    <TableCell align="left">{ moment(row.time * 1000).format("DD MMM hh:mm a")}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    
                </CardContent>
            </Card>


            {/* Trade with active traders section */}
            <Card sx={{ minWidth: 375, minHeight: 300 }}>
            <CardContent>
            <Typography variant="h5" component="div" gutterBottom sx={{color: "#072A6C", marginTop: '10px'}} >Kudi p2p TRADING</Typography>
            <Typography variant='subtitle2' component='div' gutterBottom><strong>All transactions are monitored and protected by the admin</strong></Typography>
            { isLoading ? <div style={{display: 'flex', justifyContent: 'center'}}> <CircularProgress /> </div>:

            <Paper sx={{ width: '100%', overflow: 'hidden' }} >
            <TableContainer sx={{ maxHeight: 220 }}>
                <Table>
                <TableHead>
                </TableHead>
                    <TableBody>
                    {traderList.map((list) => (
                        <StyledTableRow key={list.name}>
                            <StyledTableCell>{list.name} <br/><p style={{fontSize: "12px", marginTop: "10px"}}>{list.message}</p></StyledTableCell>
                            <StyledTableCell align='right'>{list.exchangeRate}/$</StyledTableCell>
                            <StyledTableCell align='right'><Button variant='contained' disabled><strong>Trade</strong></Button> </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            }
            </CardContent>
            </Card>

            {/* Trade history section */}
            
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
