import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, List, Popover, Input, Row, Col, Badge } from 'antd';

import { SmileOutlined } from '@ant-design/icons';
import data1 from 'assets/emojis.json'
import styles1 from 'styles/Comment.module.scss'
import styles from 'styles/im.module.scss'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { socket, init } from 'utils/socket';
import { sendPrivateMsg } from 'config/handleRequest';
import { PrivateMsgParam } from 'model/ParamsModel';
import { LinkManInfoModel, LinkManModel, ChatContentModel } from 'model/NotificatioinModel'
import { useRouter } from 'next/router';
import getPrivateMsg, { getLinkList } from 'utils/getPrivateMsg';
import Head from 'next/head';

const { TextArea } = Input

export default function Notification({ query_participantId, linkManList, chatContentList, linkManInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) {

      // emoji表情数据
      const [faceList, setFaceList] = useState<Array<string>>()
      //评论框绑定数据
      const [value, setValue] = useState('');
      // 登录的用户id
      const [framerId, setFramerId] = useState("")
      // 标记当前所在聊天的id
      const [participantId, setParticipantId] = useState(query_participantId)
      // 联系人列表信息
      const [linkManData, setLinkManData] = useState<Array<LinkManModel>>(linkManList);
      // 当前联系人信息
      const [linkManRecent, setlinkManRecent] = useState(linkManInfo)
      // 聊天记录
      const [chatContentData, setChatContentData] = useState<Array<ChatContentModel>>(chatContentList)

      useEffect(() => {
            console.log("初渲染");
            console.log(linkManData);

            // 根据participantId查,以及最近的50条记录
            setFramerId(localStorage.getItem("framer_id") || "")
            setFaceList([...loadEmojis()])
            init(localStorage.getItem("framer_id") || "")
            socket.on('chatevent', function (message: ChatContentModel) {
                  console.log("chatevent", message);
                  if (message.senderId === participantId) {
                        setChatContentData((old) => [...old, message])
                  } else {
                        console.log(message.senderId);

                        // 找到 senderId
                        setLinkManData((old) => {
                              console.log(old);
                              const new_l = old.map((item) => {
                                    if (item.friendId === message.senderId) {
                                          item.unreadCount = item.unreadCount + 1
                                    }
                                    console.log(item);
                                    return item;
                              })

                              return new_l
                        })
                  }
            });
            return () => {
                  socket.disconnect();
            };
      }, [])



      useEffect(() => {
            const msg_content: HTMLDivElement = document.getElementById("msg_content") as HTMLDivElement
            msg_content.scrollTop = msg_content.scrollHeight
      }, [chatContentData])

      // 加载emoji表情数据
      const loadEmojis = () => {
            var l: string[] = []
            for (let i in data1) {
                  l.push(data1[i].char)
            }
            return l
      }

      //点击emoji修改value值
      const changeValue = (char: string) => {
            let v = value
            setValue(v.concat(char))
      }

      const sendMsg = (event: any) => {
            const jsonObject: PrivateMsgParam = {
                  senderId: framerId,
                  receiverId: participantId,
                  userName: linkManRecent.userName,
                  avatar: linkManRecent.avatar,
                  message: value
            };

            sendPrivateMsg(jsonObject).then(res => {
                  console.log(res);
                  // 修改chatContentData
                  setChatContentData((old) => [...old, res.data])
                  setValue("")
            })
      }
      //切换聊天对象
      const router = useRouter()
      const changePrivateMsg = async (friendId: string) => {
            const newQuery = { participantId: friendId };
            router.push({
                  pathname: router.pathname, // 保持当前路径不变
                  query: newQuery, // 更新查询参数
            });
            setParticipantId(friendId)
            const privateMsg = getPrivateMsg(framerId, friendId)
            const linkManInfo_p = (await privateMsg).linkManInfo
            const chatContentList = (await privateMsg).chatContentList
            setChatContentData(chatContentList)
            setlinkManRecent(linkManInfo_p)

            setLinkManData((old) => {
                  const new_l = old.map(item => {
                        if (item.friendId === friendId) {
                              item.unreadCount = 0
                        }
                        return item
                  })
                  return new_l
            })
      }

      return (
            <>
                  <Head>
                        <title>私信</title>
                  </Head>
                  <Row className={styles.RowStyles}>
                        <Col span={6} className={styles.siderStyle}>
                              <List
                                    itemLayout="horizontal"
                                    dataSource={linkManData}
                                    renderItem={(item, index) => (
                                          <List.Item
                                                style={{ overflow: 'hidden', maxHeight: '80px', padding: '12px', backgroundColor: item.friendId === participantId ? '#eaf2ff' : '#fff' }}
                                                onClick={() => changePrivateMsg(item.friendId)}>
                                                <List.Item.Meta
                                                      avatar={<Avatar src={item.avatar} />}
                                                      title={<a href={`http://localhost:3000/user/${item.friendId}`} target='_blank'>{item.userName}</a>}
                                                      description={item.recentMsg || " "}
                                                />
                                                <div><Badge size="small" count={item.unreadCount} /></div>
                                          </List.Item>
                                    )}
                              />
                        </Col>
                        <Col span={16}>
                              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '700px', }}>
                                    <div className={styles.headerStyle}>
                                          <div className={styles.header_name}>{linkManRecent?.userName || ""}</div>
                                    </div>
                                    <div className={styles.contentStyle} id='msg_content'>
                                          {
                                                chatContentData?.map((item: ChatContentModel, index: number) => {
                                                      return (
                                                            <div key={index}>
                                                                  {
                                                                        item.senderId === framerId ?
                                                                              <>
                                                                                    <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '10px' }} key={item.id}>
                                                                                          <div>
                                                                                                <Avatar src={localStorage.getItem("framer_img")}>
                                                                                                </Avatar>
                                                                                          </div>
                                                                                          <div className={styles.framer_right}>
                                                                                                <div className={styles.triangle_right}></div>
                                                                                                <span className={styles.rotationtiao_right}>{item.messageContent}</span>
                                                                                          </div>
                                                                                    </div>
                                                                              </>
                                                                              :
                                                                              <>
                                                                                    <div style={{ display: 'flex', marginTop: '10px' }} key={item.id}>
                                                                                          <div>
                                                                                                <Avatar src={linkManRecent?.avatar || ""}>
                                                                                                </Avatar>
                                                                                          </div>
                                                                                          <div className={styles.framer_left}>
                                                                                                <div className={styles.triangle_left}></div>
                                                                                                <span className={styles.rotationtiao_left}>{item.messageContent}</span>
                                                                                          </div>
                                                                                    </div>
                                                                              </>
                                                                  }
                                                            </div>
                                                      )
                                                })
                                          }
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
                                                      <div style={{ padding: '10px' }}><SmileOutlined style={{ color: '#515767', fontSize: '20px' }} /></div>
                                                </Popover>
                                          </div>
                                          <TextArea
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                autoSize={{ minRows: 3 }}
                                                bordered={false}
                                                onPressEnter={(e) => sendMsg(e)}
                                          />
                                          <div className={styles.msgFooter}>按 Enter 发送消息</div>
                                    </div>
                              </div>
                        </Col>
                  </Row>
            </>
      )
}



export const getServerSideProps:
      GetServerSideProps<{
            query_participantId: string,
            linkManList: Array<LinkManModel>,
            chatContentList: Array<ChatContentModel>,
            linkManInfo: LinkManInfoModel,
      }>
      = async ({ query, req }: { query: { participantId: string }, req: any }) => {
            try {
                  // 获取联系人列表
                  const linkManList = (await getLinkList(req.cookies.framer_id, query.participantId)).linkManList
                  // 没有点击任何一个聊天的用户
                  if (query.participantId === undefined) {
                        return {
                              props: {
                                    query_participantId: query.participantId || "",
                                    linkManList,
                              }
                        }
                  } else {
                        const privateMsg = getPrivateMsg(req.cookies.framer_id, query.participantId)
                        const linkManInfo = (await privateMsg).linkManInfo
                        const chatContentList = (await privateMsg).chatContentList
                        return {
                              props: {
                                    query_participantId: query.participantId || "",
                                    linkManList,
                                    chatContentList,
                                    linkManInfo
                              }
                        }
                  }
            } catch (error) {
                  console.log("/notification/im");
                  return {
                        redirect: {
                              destination: '/error/404',
                              permanent: false,
                        },
                  }
            }
      }
