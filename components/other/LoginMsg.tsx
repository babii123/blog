import React from 'react';
import { useState } from 'react'
import { Button } from 'antd';
import { HeartOutlined, SmileOutlined } from '@ant-design/icons'
import styles from '../../styles/Login.module.css'
import Login from './Login'
import Register from './Register'
import NiceModal from '@ebay/nice-modal-react';


const LoginMsg: React.FC = () => {
      // const [isOpen1, setIsOpen1] = useState(false)
      // const [isOpen2, setIsOpen2] = useState(false)

      const showLogin = () => {
            NiceModal.show(Login).then((res) => {
                  console.log(res);
            }, err => {
                  console.log(err);
            })
      }

      const showRegister = () => {
            NiceModal.show(Register).then((res) => {
                  console.log(res);
            }, err => {
                  console.log(err);
            })
      }

      return (
            <>
                  <div className={styles.childbox}>
                        <HeartOutlined className='icon-type' />
                        <span>收藏有用文章</span>
                        <SmileOutlined className='icon-type' />
                        <span>收藏有用文章</span>
                  </div>
                  <div className={styles.childbox}>
                        <HeartOutlined className='icon-type' />
                        <span>收藏有用文章</span>
                        <SmileOutlined className='icon-type' />
                        <span>收藏有用文章</span>
                  </div>
                  <div className={styles.childbox}>
                        <Button type="primary" block onClick={showLogin}>立即登录</Button>
                        {/* {
                              isOpen1 == true?
                              <Login />:
                              null
                        }        */}
                  </div>
                  <div style={{ fontSize: '10px', textAlign: 'center' }}>
                        首次使用?
                        <a href="#" onClick={showRegister}>点我注册</a>
                  </div>
            </ >
      );
};

export default LoginMsg;