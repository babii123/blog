import { Button, Divider, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { getEditInfo, updateEditInfo } from '../../config/getRequest'

const onFinish = (values) => {
      console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
};



const FormComp: React.FC = () => {
      const [name, setName] = useState<string>()
      const [phone, setPhone] = useState<string>()
      const [email, setEmail] = useState<string>()
      const [introduce, setIntro] = useState<string>()
      useEffect(() => {
            // getEditInfo(localStorage.getItem("framer_id")).then(res => {
            //       if (res.code === 200) {
            //             setName(res.data.name)
            //             setEmail(res.data.email)
            //             setPhone(res.data.phone)
            //             setIntro(res.data.introduce)
            //       } else {
            //             console.log(res);
            //       }
            // })
      }, [])
      const updateInfo = () => {
            const data = {
                  framerId: localStorage.getItem("framer_id"),
                  name: name,
                  email: email,
                  phone: phone,
                  introduce: introduce
            }
            console.log(data);
            // updateEditInfo(data).then(res => {
            //       if (res.code === 200) {
            //             message.success("修改成功")
            //             setInterval(()=>{
            //                   location.reload()
            //             },1000)
            //       } else {
            //             message.error("修改失败")
            //       }
            // })
      }
      return (
            <>
                  <h3 style={{ marginLeft: '10px', marginTop: '10px' }}>个人资料</h3>
                  <Divider />
                  <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                  >
                        <Form.Item
                              label="Username"
                              name="name"
                        >
                              <Input value={name}
                                    placeholder={name}
                                    onChange={(e) => {
                                          setName(e.target.value);
                                    }} />
                        </Form.Item>

                        <Form.Item
                              label="Phone"
                              name="phone"
                        >
                              <Input value={phone}
                                    placeholder={phone}
                                    onChange={(e) => {
                                          setPhone(e.target.value);
                                    }} />
                        </Form.Item>
                        <Form.Item
                              label="Email"
                              name="email"
                        >
                              <Input value={email}
                                    placeholder={email}
                                    onChange={(e) => {
                                          setEmail(e.target.value);
                                    }} />
                        </Form.Item>

                        <Form.Item
                              label="Introduce"
                              name="introduce"
                        >
                              <Input value={introduce}
                                    placeholder={introduce}
                                    onChange={(e) => {
                                          setIntro(e.target.value);
                                    }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                              <Button type="primary" onClick={updateInfo}>
                                    修改
                              </Button>
                        </Form.Item>
                  </Form>
            </ >
      );
}

export default FormComp;