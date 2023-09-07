/**
 * 创作者中心的头部
 */
import { useState, useEffect } from "react";

import styles from "../../styles/Header.module.scss";
import { Row, Col, Menu, Avatar, Space, Dropdown, Popover, Button, Affix } from "antd";
import { BellFilled } from "@ant-design/icons";
import LoginMsg from "components/other/LoginMsg";

const Header: React.FC = () => {

      const title = "登录即享以下权益"
      const content = (
            <LoginMsg />
      )

      const [token, setToken] = useState<string>()
      const [framer_img, setframerImg] = useState<string>()
      const [framer_id, setframerId] = useState<string>()

      useEffect(() => {
            setframerImg(localStorage.getItem("framer_img") || "")
            setframerId(localStorage.getItem("framer_id") || "")
      }, [])

      const items = [
            {
                  key: '1',
                  label: (
                        <a href="#" onClick={LogOut}>
                              退出登录
                        </a>
                  ),
            }
      ]
      function LogOut() {
            localStorage.removeItem("framer_id")
            localStorage.removeItem("framer_img")
            location.reload()
      }
      return (
            <div className={styles.header_creator}>
                  <Row justify="center">
                        <Col xs={24} sm={24} md={19} lg={10} xl={16} offset={2}>
                              <span className={styles.header_logo} style={{ marginTop: '5px' }}>BLOG</span>
                        </Col>
                        <Col xs={0} sm={0} md={5} lg={10} xl={3} offset={3}>
                              <Space size={25} wrap>
                                    <BellFilled style={{ fontSize: '24px' }} />
                                    {
                                          framer_id === "" ?
                                                <Popover
                                                      placement="bottomRight"
                                                      title={title}
                                                      content={content}
                                                      zIndex={1000}
                                                >
                                                      <Button>  登录 | 注册  </Button>
                                                </Popover>
                                                :
                                                <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                                                      <a href={"/user/" + framer_id} target="_blank">
                                                            <Avatar src={framer_img} size="large" style={{ marginRight: '8px' }} />
                                                      </a>
                                                </Dropdown>
                                    }
                              </Space>
                        </Col>
                  </Row>
            </div>
      );
}

export default Header;
