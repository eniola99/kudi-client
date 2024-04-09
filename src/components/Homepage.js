import React from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Typography, Statistic, Row, Col } from 'antd';
import millify from "millify";
import { Link } from 'react-router-dom';
import Crypto from './Crypto'
import Loader from './Loader';
import News from './News'
import Typed from 'react-typed'
import Typography2 from '@mui/material/Typography';


const Homepage = () => {
    
    const { data, isFetching } = useGetCryptosQuery(10)

    const globalStats = data?.data?.stats;

    if (isFetching) return < Loader />;
    
    return (
        <>
            <Typography2 variant="h5" sx={{color: "rgb(0, 21, 41)", marginBottom: "50px"}}> <Typed
            strings={["GET LATEST CRYPTO UPDATES.", "READ LATEST CRYPTO NEWS.", "BITCOIN WALLET.", "KudiPay COMING SOON."]}
            typeSpeed={65} backSpeed={65} loop ></Typed> </Typography2>
            <Typography.Title level={4} className='heading'>Global Crypto Stats</Typography.Title>
            <Row>
                <Col span={12}> <strong> <Statistic title='Total Crypto' value={millify(globalStats.total)}/> </strong> </Col>
                <Col span={12}> <strong><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} $/> </strong></Col>
                <Col span={12}> <strong><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /> </strong></Col> 
                <Col span={12}> <strong><Statistic title='Total 24hr volume' value={millify(globalStats.total24hVolume)} /> </strong></Col>              
            </Row>
            <div className='home-heading-container'>
                <Typography.Title level={5} className='home-tittle'>Top 10 Crypto</Typography.Title>
                <Typography.Title level={5} className='show-more'><Link to='/crypto'> Show more </Link></Typography.Title>
            </div>
            < Crypto simplified/>

            <div className='home-heading-container'>
                <Typography.Title level={5} className='home-tittle'>Latest Crypto News</Typography.Title>
                <Typography.Title level={5} className='show-more'><Link to='/news'> Show more </Link></Typography.Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage