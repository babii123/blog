import React from 'react';
import { Button, Modal, Input, Space, Spin, message } from 'antd';
import { useState } from 'react';
import { userRegister } from '../../config/getRequest'
import Router from 'next/router';
import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { nanoid } from 'nanoid';
import { LoginParams, RegisterParam } from '../../model/ParamsModel';

const Register: React.FC = NiceModal.create(() => {
      const [phone, setPhone] = useState("17787634567")
      const [email, setEmail] = useState("17787634567@email")
      const [name, setName] = useState("梦奇")
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
            if (phone && password) {
                  const id: string = nanoid();
                  let userData: RegisterParam = {
                        id: id,
                        name: name,
                        img_path: null,
                        introduce: null,
                        registerTime: null,
                        password: password,
                        email: email,
                        phone: phone,
                        recentTime: null
                  }
                  setIsLoading(true);
                  userRegister(userData).then((res) => {
                        console.log(res);
                        if (res.data.code === 200) {
                              message.success("注册成功");
                              // setframerId(localStorage.setItem("framer_id", res.data.id))
                              localStorage.setItem("framer_id", id);
                              localStorage.setItem("framer_img", "");
                              location.reload()
                              // setIsOpen1(false)
                              modal.hide();
                        } else {
                              message.error("注册失败");
                        }
                  })
                  setTimeout(() => {
                        setIsLoading(false);
                  }, 1000);
            }
      }
      const modal = useModal();
      return (
            <div>
                  <Modal
                        title="手机号注册"
                        centered
                        // open={isOpen1}
                        open={modal.visible}
                        width="600"
                        footer={null}
                        // onOk={() => setModal2Open(false)}
                        // onCancel={() => setIsOpen1(false)}
                        onCancel={() => modal.hide()}
                  >
                        <Spin spinning={isLoading}>
                              <Space direction='vertical'>
                                    <Input
                                          placeholder="input telephone"
                                          defaultValue={phone}
                                          size="large"
                                          onChange={(e) => {
                                                setPhone(e.target.value);
                                          }} />
                                    <Input
                                          placeholder="input email"
                                          defaultValue={email}
                                          size="large"
                                          onChange={(e) => {
                                                setEmail(e.target.value);
                                          }} />
                                    <Input
                                          placeholder="input username"
                                          defaultValue={name}
                                          size="large"
                                          onChange={(e) => {
                                                setName(e.target.value);
                                          }} />
                                    <Input.Password
                                          placeholder="input password"
                                          defaultValue={password}
                                          size="large"
                                          onChange={(e) => {
                                                setPassword(e.target.value);
                                          }} />
                                    <Button type='primary' block onClick={() => checkLogin()}>注册</Button>
                                    <div>
                                          <p>
                                                <a href='#'>
                                                      其他注册方式
                                                </a>
                                          </p>
                                          <p>
                                                <a href="#">
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

export default Register;