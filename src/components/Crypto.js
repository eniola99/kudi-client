import React, { useState, useEffect } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Typography,  Row, Col, Card, Input} from 'antd';
import millify from "millify";
import { Link } from 'react-router-dom';
import Loader from './Loader';


const Crypto = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [ cryptos, setCryptos ] = useState([])
    const [ search, setSearch ] = useState('')

    
    useEffect(() => {

        const filterCoin = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
        setCryptos(filterCoin)

    }, [cryptoList, search])

    if (isFetching) return <Loader />;

    const onChangeSearchHandler = (e) => {
        setSearch(e.target.value.toLowerCase())
    }
    
    return (
        <> 

        {!simplified && (
            <div className='search-crypto'>
                <Typography.Title level={2} style={{textAlign: 'center'}}>List of Crypto Currency</Typography.Title>
                <Input placeholder='search crypto'  onChange={onChangeSearchHandler}/>
        </div>
        )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
                                <p>Price: ${millify(currency.price)}</p>
                                <p>MarketCap: ${millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row> 
             
        </>
    )
}

export default Crypto
           