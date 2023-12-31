import React from 'react';
import { Button, Modal, Input, Space, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { userLogin } from '../../config/handleRequest'
import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { setCookie } from 'cookies-next';
import { init } from 'utils/socket';

const Login = NiceModal.create(() => {
      const [phone, setPhone] = useState("Lvzl")
      const [password, setPassword] = useState("1234")
      const [isLoading, setIsLoading] = useState(false)

      const checkLogin = () => {
            if (!phone) {
                  message.error("用户名不能为空");
                  return false;
            }
            if (!password) {
                  message.error("密码不能为空");
                  return false;
            }
            let userData = {
                  nameOrEmailOrPhone: phone,
                  password: password,
            };
            setIsLoading(true);
            userLogin(userData).then((res) => {
                  if (res.code === 200) {
                        message.success("登录成功");
                        localStorage.setItem("framer_id", res.data.framerId);
                        localStorage.setItem("framer_img", res.data.framerImg);
                        setCookie("token", res.data.token, { maxAge: 60 * 6 * 24 })
                        setCookie("framer_id", res.data.framerId, { maxAge: 60 * 6 * 24 })
                        location.reload()
                         modal.hide();
                  } else {
                        message.error("登录失败");
                  }
            })
            setTimeout(() => {
                  setIsLoading(false);
            }, 1000);
      }
      const modal = useModal();
      return (
            <div>
                  <Modal
                        title="手机号登录"
                        centered
                        // open={isOpen1}
                        open={modal.visible}
                        width="400"
                        footer={null}
                        // onOk={() => setModal2Open(false)}
                        // onCancel={() => setIsOpen1(false)}
                        onCancel={() => modal.hide()}
                  >
                        <Spin spinning={isLoading}>
                              <Space direction='vertical'>
                                    <Input
                                          placeholder="input username"
                                          prefix={<UserOutlined />}
                                          size="large"
                                          value={phone}
                                          onChange={(e) => {
                                                setPhone(e.target.value);
                                          }} />
                                    <Input.Password
                                          placeholder="input password"
                                          prefix={<KeyOutlined />}
                                          size="large"
                                          value={password}
                                          onChange={(e) => {
                                                setPassword(e.target.value);
                                          }} />
                                    <Button type='primary' block onClick={checkLogin}>登录</Button>
                                    <div>
                                          <p>
                                                <a>
                                                      其他登录方式
                                                </a>
                                          </p>
                                          <p>
                                                <a>
                                                      注册登录即表示同意 用户协议、隐私政策
                                                </a>
                                          </p>
                                    </div>
                              </Space>
                        </Spin>
                  </Modal>
            </div>
      );
});

export default Login;