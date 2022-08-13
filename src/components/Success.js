import React from 'react'
import { Typography } from 'antd';

import '../success.css'

const { Title } = Typography
const Success = () => {
    return (
        <>
        <div className='success'>
            < Title level={3} className='success-title'>KudiCrypto says welcome :)</Title>
            < Title level={5} className='success-click'>A welcome message as been sent to the email (check your spam) provided click on the link to complete the verification process</Title> 
        </div>
        </>
    )
}

export default Success