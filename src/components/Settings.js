import React, { useState } from 'react'
import { Typography } from 'antd';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUser, LogoutCall } from '../REDUX/userSlice';
import Loader from '../../src/components/Loader'


//css
import '../../src/form.css'

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography2 from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';



const { Title } = Typography
const Settings = () => {
    const user = useSelector((state) => state.user.userInfo)
    const { pending, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()

   const [ online, setOnline ] = useState(false)
    const formik = useFormik({
        initialValues: {
            Bank: user.info.Bank, Account: user.info.Account, Phone: user.info.Phone, Address: user.info.Address, Pin: user.info.Pin, Rate: user.info.Rate, Terms: user.info.Terms,
        },
        validationSchema: Yup.object({
            Bank: Yup.string().min(3, 'invalid bank account'),
            Account: Yup.string().max(10, 'invalid bank account'),
            Phone: Yup.string().max(13, 'invalid phone number'),
            Address: Yup.string(),
            Rate: Yup.string().min(3, 'invalid').required('required'),
            Pin: Yup.string().max(4, 'pin is longer than four digit'),
            Terms: Yup.string().min(5, 'invalid'),
        }),
        onSubmit: async (values) => {
           dispatch(UpdateUser(values))
        }
    })
    
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(LogoutCall())
    }

    const onlineHandler = () => {
        setOnline(true)
    }
    if(pending === true) return <Loader/>



    return (
        <>
        {!user.info.Pin ? <Alert severity='error'> Update your account status to be able to use the service</Alert> : null}
        <div style={{marginTop: '20px'}}><Title level={4}>Hello, {user.info.firstName} :)</Title></div>

        <Masonry columns={2} spacing={4}>
            <Card sx={{ minWidth: 375}}>
                <CardContent sx={{ flexGrow: 2}}>
                    <Grid container justifyContent="center" alignItems='center' direction="row" >
                    <Grid item xs={3}>
                        <Avatar  sx={{ width: 50, height: 50 }} src="/broken-image.jpg" ></Avatar>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography2 variant="subtitle2" component="div" gutterBottom > First Name: <strong>{user.info.firstName}</strong> </Typography2>
                        <Typography2 variant="subtitle2" component="div" gutterBottom > Last Name: <strong>{user.info.lastName}</strong> </Typography2>                        
                    </Grid>
                    <Grid item xs={4}>
                        <Typography2 variant="caption text" component="div" gutterBottom sx={{marginBottom: '10px'}} >{user.info.Pin ? <Typography2 variant='subtitle2'> <Switch size='large' onClick={onlineHandler}/><strong>online</strong></Typography2> : null}</Typography2>
                        <Typography2 variant="caption text" component="div" gutterBottom > <Chip variant="outlined" color='success' size="small" label={user.info.is_verified && user.info.Pin ? <Typography2 variant='subtitle2'>verified</Typography2> : <Typography2>not verified</Typography2>} /></Typography2>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ minWidth: 375}}>
                <CardContent sx={{ flexGrow: 1}}>

                    <Typography2 variant='h6' component='div' sx={{marginBottom: '10px'}}> <strong>Personal Information</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Bank Name: <strong>{user.info.Bank}</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Account Number: <strong>{user.info.Account}</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Phone Number: <strong>{user.info.Phone}</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Address: <strong>{user.info.Address}</strong></Typography2>

                    <Typography2 variant='h6' component='div' sx={{marginBottom: '10px', marginTop: '20px'}}> <strong>Exchange Rate </strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Transaction Rate: <strong>{user.info.Rate}/$</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Transaction Pin: <strong>{user.info.Pin}</strong></Typography2>

                    <Typography2 variant='h6' component='div' sx={{marginTop: '20px'}}><strong>Terms</strong></Typography2>
                    <Typography2 variant="caption text" component="div" gutterBottom > Terms: {user.info.Terms}</Typography2>

                </CardContent>
            </Card>

            <Card sx={{minWidth: 375}}>
                <CardContent sx={{ flexGrow: 1}}>
                    <Typography2 variant='h6' component='div' sx={{ marginTop: '10px'}}> <strong>Edit Personal Information</strong></Typography2>

                    <form onSubmit={formik.handleSubmit} className='form-style'>

                    <label htmlFor='Bank'>Bank Name</label>
                    <input type='text' name='Bank' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Bank} />
                    {formik.touched.Bank && formik.errors.Bank ? (<div className='required'>{formik.errors.Bank}</div>) : null}

                    <label htmlFor='Account Number'>Bank Account</label>
                    <input type='number' name='Account' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Account} />
                    {formik.touched.Account && formik.errors.Account ? (<div className='required'>{formik.errors.Account}</div>) : null}

                    <label htmlFor='Phone Number'>Phone Number</label>
                    <input type='number' name='Phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Phone} />
                    {formik.touched.Phone && formik.errors.Phone ? (<div className='required'>{formik.errors.Phone}</div>) : null}

                    <label htmlFor='Address'>Address</label>
                    <input type='text' name='Address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Address} />
                    {formik.touched.Address && formik.errors.Address ? (<div className='required'>{formik.errors.Address}</div>) : null}


                    <Typography2 variant='h6' component='div' sx={{ marginTop: '30px'}}> <strong>Edit Rate and Transaction Pin</strong></Typography2>

                    <label htmlFor='Rate'>Rate</label>
                    <input type='number' name='Rate' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Rate} />
                    {formik.touched.Rate && formik.errors.Rate ? (<div className='required'>{formik.errors.Rate}</div>) : null}

                    <label htmlFor='Pin'>Pin</label>
                    <input type='number' name='Pin' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Pin} />
                    {formik.touched.Pin && formik.errors.Pin ? (<div className='required'>{formik.errors.Pin}</div>) : null}


                    <Typography2 variant='h6' component='div' sx={{ marginTop: '30px'}}> <strong>Edit Terms</strong></Typography2>

                    <label htmlFor='Terms'>Terms</label>
                    <input type='text' name='Terms' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Terms}/>
                    {formik.touched.Terms && formik.errors.Terms ? (<div className='required'>{formik.errors.Terms}</div>) : null}


                    <Typography2 variant='h6' component='div' sx={{ marginTop: '30px'}}> <strong>{user.info.email}</strong></Typography2>

                    <div className='form-delete'>
                    <button type='submit'><strong>Update</strong></button>
                    </div>
                    </form>

                </CardContent>
            </Card>

            <Card sx={{minWidth: 375}}>
                <CardContent>
                    <Typography2 component='div' variant='h6' gutterBottom sx={{marginTop: '20px'}}><strong>Admin Support</strong></Typography2>
                    <Typography2>dispute and admin support will appear here</Typography2>
                </CardContent>
            </Card>
            <div className='form-delete'>
                <button type='submit' onClick={logoutHandler}><strong>Logout</strong></button>
               
            </div>

        </Masonry>
        </>
    )
}

export default Settings