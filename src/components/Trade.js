import React, { useContext } from 'react'
import { Typography, Row, Col, Card} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader';
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext/AuthContext';
import { logoutCall } from '../context/authContext/apiCall';
import '../form.css'

const Trade = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const { dispatch } = useContext(AuthContext)

    if(isFetching) return <Loader />

    const clickHandler = (e) => {
        e.preventDefault()
        logoutCall(dispatch)
    }


    return (
        <>
        <div><Typography.Title level={5}>Dashboard under construction</Typography.Title></div>
        <Row>
            <Col span={12} >
                <Card className='crypto-card' value={data?.data?.coins?.iconUrl} hoverable>
                <p>Trade bitcoin</p>
                <Link to='/trade'>check rates</Link>
                </Card>

                <Card className='crypto-card' hoverable>
                <p>Trade USDT</p>
                <Link to='/trade'>check rates</Link>
                </Card>

                <Card className='crypto-card' hoverable>
                <p>Trade ETH</p>
                <Link to='/trade'>check rates</Link>            
                </Card>
            </Col>
        </Row>
        <div className='form-style'>
            <button type='submit'  onClick={clickHandler} disabled={isFetching}>Logout</button>
        </div>
    </>
    )
}

export default Trade
