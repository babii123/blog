import { SmileOutlined } from "@ant-design/icons"
import { Result, Button, Row, Col } from "antd"
import { NextPage } from "next"
import Header from 'components/other/Header'
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from 'styles/Published.module.scss'

const Published: NextPage = () => {

      const [title, setTitle] = useState("");
      useEffect(() => {
            console.log(sessionStorage.getItem("new_title"));
            setTitle(sessionStorage.getItem("new_title") || "")
      }, [])

      return (
            <>
                  <Head>
                        <title>发布成功</title>
                  </Head>
                  <Header />
                  <Row className="comm-main" justify="center">
                        <Col className="comm-left" style={{ backgroundColor: '#fff', height: 'calc(100vh - 100px)' }} xs={24} sm={24} md={24} lg={24} xl={15}>
                              <Result
                                    icon={<></>}
                                    extra={<>
                                          <img src="./static/提交成功.png" alt="" width={180} height={180} />
                                          <div className={styles.result_text}>
                                                <div className={styles.result_title}>{`《${title}》`}<br /></div>
                                                <div className={styles.text_other}>
                                                      有了你的分析我们会变得更好！感谢您的每一次分享！
                                                </div>

                                          </div>
                                          <Button type="primary" size="large" className={styles.result_button}> 回到首页 </Button>
                                    </>}
                              />
                        </Col>

                  </Row>
            </>
      )
}

export default Published