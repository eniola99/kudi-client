import React, { useContext, useState } from 'react'
import { Typography, Row, Card} from 'antd';
import Loader from './Loader';
import { AuthContext } from '../context/authContext/AuthContext';
import { TransactionContext } from '../SmartContractContext/TransactionContext'
import '../form.css'
import { ArrowRightOutlined } from '@ant-design/icons'
import Homepage from './Homepage';
import { FaEthereum } from 'react-icons/fa'
import { shortenAddress } from "../utils/shortenAddress";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from 'react-toastify'



let { Title } = Typography

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      style={{marginTop: 20}}
    />
  );

  const USDT = "TN5cbe57dbKt2Xy2VWGP396ghd8GAbk8Vc"
  const ETH ="0xf834a64b9a17774269b50074dc64fa0bdbf8e130"
  
const Trade = () => {
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData } = useContext(TransactionContext);
    const { user } = useContext(AuthContext)
    const { isFetching } = useContext(AuthContext)
    const [ loading, setLoading ] = useState(false)
    if(isFetching) return <Loader />

    const handleSubmit = (e) => {
        const { addressTo, amount } = formData
        e.preventDefault()
        if (!addressTo || !amount ) return;
        setLoading(true)

    sendTransaction();
    }

    const copiedUSDT = () => {
        toast('USDT address copied to  clipboard successfully')
    }

    const copiedETH = () => {
        toast('ETH address copied to  clipboard successfully')
    }
    return (
        <>
        {user ?
        <div className='trade-container'>
            <div className='trade-hero'><Typography.Title level={2}>Hello <u>{user.info.firstName}</u> are you ready to send Crypto across the World :)</Typography.Title></div>
            <Title level={5} style={{fontSize: '12px', paddingBottom: '10px', textAlign: "center"}}>Explore the crypto world with kudiCrypto.</Title>
            <div className='send-crypto'>

            
            <Row gutter={[16, 24]}>
                     <Card style={{width: 350}} hoverable >
                    <div>
                    <Title level={5}><FaEthereum/>  Balance</Title>
                    </div>
                    <div style={{marginTop: "100px"}}>
                        <p>{shortenAddress(currentAccount)}</p>
                        <Title level={4} >Ethereum</Title>
                    </div>
                    </Card>
                    <Card style={{width: 350}} hoverable span={8}>
                    <Title level={5}>Transfer ETH around the world seamlessly</Title>
                    <div className='form-style' >
                    <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                    <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />

                    {loading ? <button type='submit' disabled >Send Now</button> : <button type='submit' onClick={handleSubmit}>Send Now</button>}   
                    
                    </div>
                    </Card>
            </Row>
            </div>
            {!currentAccount && (<div className='connect-button'>
                <button type='submit' onClick={connectWallet}>Connect your wallet</button>
            </div>)}

                <div className='copied'>
                    <div>
                        <p>{shortenAddress(USDT)}</p>
                    <CopyToClipboard text={USDT}>
                        <button onClick={copiedUSDT}>Copy USDT(TRC20)</button>
                        
                    </CopyToClipboard>
                    </div>

                    <div className='eth'>
                        <p>{shortenAddress(ETH)}</p>
                    <CopyToClipboard text={ETH}>
                        <button onClick={copiedETH}>Copy ETH(ERC20)</button>
                    </CopyToClipboard>
                    </div>
                </div>
            
            <div className='support'>
            <p><strong>Talk to us</strong></p>
                    {/* <Typography.Title level={5} ><a href="https://api.whatsapp.com/send?phone=2347031191342&text=Welcome%20to%20KudiCrypto%20DM,%20%20Let%27s%20trade"> Trade with D1   {<ArrowRightOutlined />}</a></Typography.Title> */}
                    <Typography.Title level={5} ><a href="https://wa.me/message/7MFYBHOQFIEIL1"> Talk with kudi     {<ArrowRightOutlined />}</a></Typography.Title>
            </div>
        </div> : <Homepage />}
        
    </>
    )
}

export default Trade