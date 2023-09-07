import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, List, Popover, Input, Row, Col } from 'antd';

import { SmileOutlined } from '@ant-design/icons';
import data1 from '../assets/emojis.json'
import styles1 from '../styles/Comment.module.scss'
import styles from '../styles/demo.module.scss'

const { TextArea } = Input


const data = [
      {
            title: 'Ant Design Title 1',
      },
      {
            title: 'Ant Design Title 2',
      },
      {
            title: 'Ant Design Title 3',
      },
      {
            title: 'Ant Design Title 4',
      },
];
const Demo: React.FC = () => {

      // emoji表情数据
      const [faceList, setFaceList] = useState<Array<string>>()
      //评论框绑定数据
      const [value, setValue] = useState('');
      const [framerId, setFramerId] = useState("")
      useEffect(() => {
            // console.log(props);
            // 判断是否登录
            setFramerId(localStorage.getItem("framer_id") || "")
            setFaceList([...loadEmojis()])
      }, [])

      // 加载emoji表情数据
      const loadEmojis = () => {
            var l: string[] = []
            for (let i in data1) {
                  l.push(data1[i].char)
            }
            return l
      }

      return (
            <Row className={styles.RowStyles}>
                  <Col span={6} className={styles.siderStyle}>
                        <List
                              itemLayout="horizontal"
                              dataSource={data}
                              renderItem={(item, index) => (
                                    <List.Item style={{ overflow: 'hidden', maxHeight: '80px', padding: '12px' }}>
                                          <List.Item.Meta
                                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design"
                                          />
                                    </List.Item>
                              )}
                        />
                  </Col>
                  <Col span={16}>
                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '700px', }}>
                              <div className={styles.headerStyle}>
                                    <div className={styles.header_name}>babii</div>
                              </div>
                              <div className={styles.contentStyle}>
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                          <div>
                                                <Avatar style={{ backgroundColor: "rgb(53, 90, 207)" }}>
                                                </Avatar>
                                          </div>
                                          <div className={styles.framer_left}>
                                                <div className={styles.triangle_left}></div>
                                                <span className={styles.rotationtiao_left}>这是一段聊天内</span>
                                          </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '10px' }}>
                                          <div>
                                                <Avatar>
                                                </Avatar>
                                          </div>
                                          <div className={styles.framer_right}>
                                                <div className={styles.triangle_right}></div>
                                                <span className={styles.rotationtiao_right}>这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容这是一段聊天内容</span>
                                          </div>
                                    </div>


                              </div>
                              <div className={styles.footerStyle}>
                                    <div className={styles1.commentButtonContainer}>
                                          <Popover placement="topRight" content={
                                                <div className={styles1.browBox}>
                                                      <ul>
                                                            {faceList?.map((item, index) => {
                                                                  return (
                                                                        <li onClick={() => changeValue(item)} key={index}>{item}</li>
                                                                  )
                                                            })}
                                                      </ul>
                                                </div>
                                          } trigger="click">
                                                <div style={{padding: '10px'}}><SmileOutlined style={{ color: '#515767',fontSize: '20px'}}/></div>
                                          </Popover>
                                    </div>
                                    <TextArea
                                          value={value}
                                          onChange={(e) => setValue(e.target.value)}
                                          autoSize={{ minRows: 3 }}
                                          bordered={false}
                                    />
                                    <div className={styles.msgFooter}>按 Enter 发送消息</div>
                              </div>
                        </div>
                  </Col>

            </Row>
      )
}
export default Demo;