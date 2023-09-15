/**
 * @description写文章
 */

/**
 * @description 编辑文章
 */
import { useEffect, useState } from 'react';
import { Col, Row, Input, Button, Select, Modal, message, Avatar, Space } from 'antd';
import { nanoid } from 'nanoid'
import { addArticle } from 'config/handleRequest'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import ChangeMode from 'components/icons/ChangeMode'
import ByteMd from 'components/edit/ByteMd'
import Head from 'next/head';
import { AddArticleParam } from 'model/ParamsModel';

const { TextArea } = Input;

const New: NextPage = () => {
      // 文章标题
      const [title, setTitle] = useState("")
      // 文章内容
      const [value, setValue] = useState("");
      // 文章简介
      const [intro, setIntro] = useState("");
      // 文章分类
      const [type, setType] = useState("");
      // 控制弹窗
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      // 头像
      const [avatar, setAvatar] = useState("")
      const router = useRouter()
      useEffect(() => {
            setAvatar(localStorage.getItem("framer_img") || "")
      }, [])

      const showModal = () => {
            setIsModalOpen(true);
      };

      const handleOk = () => {
            setConfirmLoading(true);
            let obj: AddArticleParam = {
                  id: nanoid(),
                  typeId: type,
                  framerId: localStorage.getItem("framer_id") || "",
                  title: title,
                  articleContent: value,
                  introduce: intro,
                  addTime: "",
                  updateTime: "",
                  viewCount: 0,
                  likeCount: 0,
                  collectCount: 0,
                  commentCount: 0
            }
            console.log(obj);
            addArticle(obj).then(res => {
                  if (res.code === 200) {
                        sessionStorage.setItem("new_title", title)
                        router.push("/published")
                        message.success("发布成功")
                  } else {
                        message.error("发布失败")
                        console.log("发布失败", res);
                  }
            })
            setTimeout(() => {
                  setIsModalOpen(false);
                  setConfirmLoading(false);
            }, 2000);
      };

      const handleCancel = () => {
            setIsModalOpen(false);
      };

      const changeType = (value: string) => {
            setType(value)
      };

      // const changeIntro = (value) => {
      //       setI(value)
      // };

      return (
            <>
                  <Head>
                        <title>写文章</title>
                  </Head>
                  <div>
                        <Row style={{ height: '60px' }}>
                              <Col span={12}>
                                    <Input placeholder="请输入文章标题..." bordered={false}
                                          style={{ fontSize: '24px', lineHeight: '56px', marginLeft: '10px' }}
                                          value={title}
                                          onChange={(e) => {
                                                setTitle(e.target.value);
                                          }} />
                              </Col>
                              <Col span={12}>
                                    <div style={{ position: 'relative' }}>
                                          <div style={{ position: 'absolute', right: '40px', top: '10px' }}>
                                                <Space size={20}>
                                                      <Button block>草稿箱</Button>
                                                      <Button type="primary" onClick={showModal} >发 布</Button>
                                                      <ChangeMode />
                                                      <Avatar src={avatar} />  
                                                </Space>
                                          </div>
                                          <Modal title="填写信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                                                <div>分类： </div>
                                                <Select
                                                      size="large"
                                                      value={type}
                                                      onChange={changeType}
                                                      style={{ width: 200 }}
                                                      options={[
                                                            { value: '6809635626661445640', label: 'IOS' },
                                                            { value: '6809635626879549454', label: 'Android' },
                                                            { value: '6809637767543259144', label: '前端' },
                                                            { value: '6809637769959178254', label: '后端' },
                                                            { value: '6809637771511070734', label: '开发工具' },
                                                            { value: '6809637772874219534', label: '阅读' },
                                                            { value: '6809637773935378440', label: '人工智能' },
                                                      ]}
                                                />
                                                <div>简介： </div>
                                                <TextArea
                                                      value={intro}
                                                      onChange={(e) => setIntro(e.target.value)}
                                                      placeholder="请输入简介..."
                                                      autoSize={{ minRows: 3, maxRows: 5 }}
                                                />
                                          </Modal>
                                    </div>
                              </Col>
                        </Row>
                        <ByteMd value={value} setValue={setValue} />
                  </div>
            </>

      )
}

export default New;