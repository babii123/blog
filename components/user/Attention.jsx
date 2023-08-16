import React from 'react'
import { Divider, List, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from '../../styles/Attention.module.css'
import { getFollowListByFramerId } from '../../config/getRequest'
import { useState } from 'react'
import { useEffect } from 'react'

const Attention = ({ id }) => {
  const [data, setData] = useState([])
  // const data = [
  //   'Racing car sprays burning fuel into crowd.',
  //   'Japanese princess to wed commoner.',
  //   'Australian walks 100km after outback crash.',
  //   'Man charged over missing wedding girl.',
  //   'Los Angeles battles huge wildfires.',
  // ];
  const onChange = (key) => {
    console.log(key);
  };
  const getFollow = async () => {
    getFollowListByFramerId(id).then(res => {
      if (res.code === 200) {
        setData(res.data)
      } else {
        console.log("获取用户关注列表失败：", res);
      }
    })
  }

  const getBeFollow = () => {

  }
  useEffect(() => {
    getFollow()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.navLink}>
        <div style={{ lineHeight: '48px', flex: 1 }}>
          <h3>关注</h3>
        </div>
        <div className={styles.navLinkItem}>
          <a href="#" onClick={getFollow}>关注的用户</a>
          <Divider type="vertical" style={{ backgroundColor: '#d8dce0' }} />
          <a href="#" onClick={getBeFollow}>关注者</a>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff' }}>
        <List
          size="large"
          dataSource={data}
          renderItem={(item) =>
            <List.Item>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1, marginRight: '20px', alignItems: 'center' }}>
                  <Avatar size={64} src={item.framerAvatar} />
                </div>
                <div style={{ flex: 8 }}>
                  <span className={styles.listName}>{item.framerName}</span>
                  <span style={{ lineHeight: '39 px' }}>{item.introduce}</span>
                </div>
                <button className={styles.listButton}> 已关注 </button>
              </div>
            </List.Item>}
        />
      </div>

    </div>
  )
}

export default Attention;
