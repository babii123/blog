import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import styles from "../../styles/header.module.scss";
import { Row, Col, Menu, Avatar, Space, Dropdown, Popover, Button, Affix, Badge, MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons"
import { getTypeList, getUnReadCount } from "../../config/getRequest";
import Notification from 'components/icons/Notification'

import LoginMsg from "./LoginMsg";
import { TypeModel } from "model/ResponseModel";
import HeaderContent from "./HeaderContent";

const Header: React.FC = () => {
  const [navArray, setNavArray] = useState<Array<TypeModel>>([])
  const [token, setToken] = useState<string>("")
  const [framer_img, setframerImg] = useState<string>("")
  const [framer_id, setframerId] = useState<string>("")
  const [unread, setUnread] = useState<number>(6)

  const title = "登录即享以下权益"
  const content = (
    <LoginMsg />
  )
  const content1 = (
    <HeaderContent />
  );
  const content2 = (
    <a href="#" onClick={() => LogOut()}>退出登录</a>
  )
  const items: MenuProps['items'] = [
    { key: '1', label: (<a href="/">评论</a>), },
    { key: '2', label: (<a href="/">赞和收藏</a>), },
    { key: '3', label: (<a href="/">新增粉丝</a>), },
    {
      key: '4', label: (
        <a href="/notification/im">
          <span style={{ marginRight: '10px' }}>私信</span>
          <Badge size="small" count={unread} />
        </a>),
    },
    { key: '5', label: (<a href="/">系统通知</a>), },
  ]
  // 获取文章类型，导航栏数据
  const fetchData = async () => {
    getTypeList().then(res => {
      if (res.code === 200) {
        setNavArray(res.data)
      } else {
        console.log("获取类型失败：" + res);
      }
    })
    setToken(localStorage.getItem('token') as string)
  }

  useEffect(() => {
    // 获取地址栏信息，初始化导航栏的current
    const href = window.location.href;
    const hrefArray = href.split("/");
    const key = hrefArray[hrefArray.length - 1]
    if (key === '') {
      setCurrent("/")
    } else {
      setCurrent(key as string)
    }
    // 初始化文章类型
    fetchData()
    // 初始化
    setframerId(localStorage.getItem("framer_id") || "")
    setframerImg(localStorage.getItem("framer_img") || "")

    // 获取未读私信数量
    getUnReadCount(localStorage.getItem("framer_id") || "").then(res => {
      if (res.code === 200) {
        console.log("未读", res.data);

        setUnread(res.data)
      }
    })

  }, [])
  // 切换类型 
  const [current, setCurrent] = useState('/');
  const router = useRouter()
  const handleClick = (e: any) => {
    setCurrent(e.key as string)
    if (e.key == '/') {
      router.push('/')
    }
    else {
      router.push('/' + e.key)
    }
  }
  // 点击创作者中心按钮 
  const enterCreator = () => {
    if (framer_id !== null) {
      window.open("/creator/home")
    }
  }
  const LogOut = () => {
    localStorage.removeItem("framer_id")
    localStorage.removeItem("framer_img")
    setframerId("")
    setframerImg("")
    location.reload()
  }

  return (
    <div className={styles.header}>
      <Row justify="center">
        <Col xs={24} sm={24} md={5} lg={10} xl={2} offset={2}>
          <div className={styles.header_logo} style={{ display: 'flex', alignContent: 'center' }}>
            <div>
              <img src="../../static/logo.ico" alt="logo" className={styles.header_logo_img} />
            </div>
            <div className={styles.header_logo_name}> BLOG </div>
          </div>
        </Col>
        <Col className="memu-div" xs={0} sm={0} md={19} lg={8} xl={10}>
          <Menu mode="horizontal" items={navArray} onClick={(e) => handleClick(e)} selectedKeys={[current]} />
        </Col>

        <Col xs={0} sm={0} md={5} lg={10} xl={6} offset={4} style={{ paddingTop: '10px' }}>
          <Space size={25} wrap>
            <div>
              <Button type="primary" onClick={() => enterCreator()} className={styles.creator_button} >
                <div>创作者中心</div>
              </Button>
              <Popover content={content1} trigger="click">
                <Button type="primary" className={styles.creator_drop}><CaretDownOutlined style={{ fontSize: '11px' }} /></Button>
              </Popover>
            </div>
            {/* 会员 */}
            <div className={styles.vip}>
              <div className={styles.vip_img}>
                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/24127194d5b158d7eaf8f09a256c5d01.svg" alt="vip" width={24} height={24} />
              </div>
              <div className={styles.vip_words}>会员</div>
            </div>
            {/* 通知 */}
            <div>
              <Badge count={unread} size="small">
                <div style={{ padding: '4px' }}>
                  <Dropdown menu={{ items }} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className={styles.notification}>
                      {/* <BellFilled style={{ fontSize: '24px' }} /> */}
                      <Notification />
                    </a>
                  </Dropdown>
                </div>
              </Badge>

            </div>
            <div>
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
                  <Popover content={content2}>
                    <a href={"/user/" + framer_id} target="_blank">
                      <Avatar src={framer_img} size="large" style={{ marginRight: '8px' }} />
                    </a>
                  </Popover>
              }
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
