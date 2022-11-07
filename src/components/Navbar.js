import React, { useState, useEffect, useContext } from 'react'
import Avatar from 'antd/lib/avatar/avatar';
import { Typography, Menu } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined, BulbOutlined, SwapOutlined, WindowsOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


import icon from '../images/check.png'

const Navbar = () => {
  const user = useSelector((state) => state.user.userInfo)
    const [ activeMenu, setActiveMenu ] = useState(true)
    const [ screenSize, setScreenSize ] =useState(false)
    

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if(screenSize < 768) {
            setActiveMenu(false)
        }
        else {
            setActiveMenu(true)
        }
    }, [screenSize])


    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={5} className='logo'> 
                <Link to="/" style={{color: 'white'}}>kudiCrypto</Link>
                </Typography.Title>
                <button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}> <MenuOutlined /> </button>
            </div>
            {activeMenu && (
                < Menu theme='dark' >
                <Menu.Item key='1' icon={< HomeOutlined />}>
                <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={< WindowsOutlined />}>
                <Link to="/crypto">cryptocurrency</Link>
                </Menu.Item>
                <Menu.Item key='3' icon={< BulbOutlined />}>
                <Link to="/news">Crypto News</Link>
                </Menu.Item>
                {!user ?
                <>
                <Menu.Item key='4' icon={< LoginOutlined />}>
                <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key='5' icon={< UserAddOutlined />}>
                <Link to="/signup">Signup</Link>
                </Menu.Item>
                </>
                : null}
                {!user ? null :
                <Menu.Item key='6' icon={< SwapOutlined />}>
                <Link to="/trade">Trade</Link>
                </Menu.Item>
                }
                {!user ? null :
                <Menu.Item key='7' icon={< SettingOutlined />}>
                <Link to="/settings">Settings</Link>
                </Menu.Item>
                }
            </Menu>
            )}
            
        </div>
    )
}

export default Navbar