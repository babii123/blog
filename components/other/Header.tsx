import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import styles from "../../styles/header.module.scss";
import { Row, Col, Menu, Avatar, Space, Dropdown, Popover, Button, Affix } from "antd";
import { BellFilled, CaretDownOutlined, } from "@ant-design/icons"
import { getTypeList } from "../../config/getRequest";

import LoginMsg from "./LoginMsg";
import { TypeModel } from "model/ResponseModel";
import HeaderContent from "./HeaderContent";

const Header: React.FC = () => {
  const [navArray, setNavArray] = useState<Array<TypeModel>>([])
  const [token, setToken] = useState<string>("")
  const [framer_img, setframerImg] = useState<string>("")
  const [framer_id, setframerId] = useState<string>("")

  const title = "登录即享以下权益"
  const content = (
    <LoginMsg />
  )
  const content1 = (
    <HeaderContent />
  );
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
  //创作者中心的下拉菜单
  const handleMenuClick = (e: any) => {
    console.log(e);
  }
  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick
  // }
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
    setframerId("")
    setframerImg("")
    location.reload()
  }

  return (
    <div className={styles.header}>
      <Row justify="center">
        <Col xs={24} sm={24} md={5} lg={10} xl={2} offset={2}>
          <span className={styles.header_logo}>BLOG</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={19} lg={8} xl={10}>
          <Menu mode="horizontal" items={navArray} onClick={(e) => handleClick(e)} selectedKeys={[current]} />
        </Col>

        <Col xs={0} sm={0} md={5} lg={10} xl={5} offset={5} style={{ paddingTop: '10px' }}>
          <Space size={25} wrap>
            <div>
              <Button type="primary" onClick={() => enterCreator()} style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0', padding: 'none 5px' }}>
                <div>创作者中心</div>
              </Button>
              <Popover content={content1} title="Title">
                <Button type="primary" style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0', paddingLeft: '5px', paddingRight: '5px', borderLeft: '1px solid hsla(0,0%,100%,.1)' }}><CaretDownOutlined /></Button>
              </Popover>
            </div>
            <div>
              <BellFilled style={{ fontSize: '24px' }} />
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
                  <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <a href={"/user/" + framer_id} target="_blank">
                      <Avatar src={framer_img} size="large" style={{ marginRight: '8px' }} />
                    </a>
                  </Dropdown>
              }
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
