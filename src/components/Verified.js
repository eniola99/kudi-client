import React from 'react'
import { Typography } from 'antd';
import '../success.css'
import { Link } from 'react-router-dom'



const { Title } = Typography
const Verified = () => {
    return (
        <div>
             <div className='success'>
            < Title level={3} className='success-title'>KudiCrypto is happy to have you, Explore the crypto world with KudiCrypto :)</Title>
            < Title level={5} className='success-click'>Your account as been verified <Link to="/login">click here to login</Link></Title> 
        </div>
        </div>
    )
}

export default Verified
