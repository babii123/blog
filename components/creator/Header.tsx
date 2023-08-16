/**
 * 创作者中心的头部
 */
import { useState, useEffect } from "react";
import Router from 'next/router'
import Link from 'next/link'
import styles from "../../styles/header.module.css";
import { Row, Col, Menu, Avatar, Space, Dropdown, Popover, Button, Affix } from "antd";

const Header: React.FC = () => {
      const [token, setToken] = useState<string>()
      const [framer_img, setframerImg] = useState<string>()
      const [framer_id, setframerId] = useState<string>()

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
            <div style={{ position: 'relative' }}>
                  <div style={{ position: 'fixed', height: '2.8rem', top: 0, width: '100%', backgroundColor: '#fff', borderBottom: '1px solid #ccc', transform: 'translateZ(0)', transition: 'transform .2s',zIndex:'250' }}>
                        <Row justify="center">
                              <Col xs={24} sm={24} md={19} lg={10} xl={16} offset={2}>
                                    <span className={styles.header_logo} style={{marginTop: '5px'}}>BLOG</span>
                              </Col>
                              <Col xs={0} sm={0} md={5} lg={10} xl={4} offset={2} style={{ paddingTop: '10px' }}>
                                    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                                          <a href={"/user/" + framer_id} target="_blank">
                                                <Avatar src={framer_img} size="large" style={{ marginRight: '8px' }} />
                                          </a>
                                    </Dropdown>
                              </Col>
                        </Row>
                  </div>
            </div>
      );
}

export default Header;
