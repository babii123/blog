import React from 'react'
import Link from 'next/link'
import { Row, Col, Avatar, Button, Menu, Divider, Statistic } from 'antd'
import { LikeFilled, EyeFilled, MailFilled, PlusOutlined } from "@ant-design/icons";
import styles from '../../styles/Center.module.css'
import Header from '../../components/other/Header'
import ArticlesList from '../../components/user/Articles';
import Attention from '../../components/user/Attention';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArticleCardIcon } from '../../utils/icon'
import { getCenterInfo, getArticleListByFramerId, getLikeListByFramerId } from '../../config/getRequest'

const items = [
      {
            label: '文章',
            key: 'article',
      },
      {
            label: '点赞',
            key: 'like',
      },
      {
            label: '关注',
            key: 'attention',
      },
]

const Center = ({ articles, framerInfo }) => {
      // const router = useRouter()
      // const { id } = router.query
      const [current, setCurrent] = useState("article")

      const [articleList, setArticleList] = useState(articles);
      const [framer, setFramer] = useState(framerInfo);
      const [framerId, setFramerId] = useState();
      // const [attentionList, setAttentionList] = useState(articleList);
      // 切换 
      const router = useRouter()
      const { id } = router.query
      const handleClick = (e) => {
            console.log(id);
            // 修改数据
            if (e.key === 'article') {
                  // getArticleListByFramerId(id).then(res => {
                  //       if (res.code === 200) {
                  //             setArticleList(res.data)
                  //       } else {
                  //             console.log("个人中心获取文章列表失败：", res);
                  //       }
                  // })
            } else if (e.key === 'like') {
                  // getLikeListByFramerId(id).then(res => {
                  //       if (res.code === 200) {
                  //             setArticleList(res.data)
                  //       } else {
                  //             console.log("个人中心获取文章列表失败：", res);
                  //       }
                  // })
            }
            setCurrent(e.key)
      }
      useEffect(() => {
            // setFramerId(localStorage.getItem("framer_id"))
            console.log(framer);
      })
      return (
            <>
                  <Header></Header>
                  <Row className="comm-main" justify="center">
                        <Col xs={24} sm={24} md={16} lg={18} xl={14} style={{ marginRight: '8px' }}>
                              <div className={styles.authorInfoBlock} >
                                    <div style={{ flex: 1 }}>
                                          <Avatar src={framer.framerAvatar || "https://p3-passport.byteimg.com/img/user-avatar/66f0ecb24865f01a29414889790df4d7~100x100.awebp"} size={100} />
                                    </div>
                                    <div style={{ flex: 3 }} >
                                          <h2 className={styles.authorName}>
                                                {framer.framerName || "~"}
                                          </h2>
                                          <div className={styles.metaBox}>
                                                <ArticleCardIcon type='icon-huiyijieshao' style={{ fontSize: '20px' }} />&nbsp;&nbsp;
                                                {framer.introduce || "~"}
                                          </div>
                                    </div>
                                    <div style={{ flex: 2, position: 'relative' }}>
                                          <div style={{ position: 'absolute', right: '10px' }}>
                                                <ArticleCardIcon type='icon-weibo1' className={styles.contactIcon} />
                                                <ArticleCardIcon type='icon-github' className={styles.contactIcon} />
                                                <ArticleCardIcon type='icon-diqiu' className={styles.contactIcon} />
                                          </div>
                                          <div style={{ position: 'absolute', bottom: '0', right: '10px' }}>
                                                {
                                                      id === framerId ?
                                                            (<Button style={{ borderColor: '#007fff', color: '#007fff' }}><a href={`/edit`} target="_blank">编辑个人资料</a></Button>)
                                                            :
                                                            null
                                                      // (true ?
                                                      //       (
                                                      //             <>
                                                      //                   <Button type="primary" style={{ backgroundColor: '#f2f3f5', color: '#8a919f', marginRight: '15px' }}>&nbsp;&nbsp;已关注&nbsp;&nbsp;</Button>
                                                      //                   <Button type="primary" ghost icon={<MailFilled />} style={{ backgroundColor: '#f4f9ff', color: '#1e80ff', borderColor: '#b3d5ff' }}>私信</Button>
                                                      //             </>
                                                      //       )
                                                      //       :
                                                      //       (
                                                      //             <>
                                                      //                   <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '5px' }}>关注</Button>
                                                      //                   <Button type="primary" ghost icon={<MailFilled />} style={{ backgroundColor: '#f4f9ff', color: '#1e80ff', borderColor: '#b3d5ff' }}>私信</Button>
                                                      //             </>
                                                      //       )
                                                      // )
                                                }
                                          </div>
                                    </div>

                              </div>
                              <div>
                                    <Menu mode="horizontal" items={items} style={{ fontSize: '16px' }} onClick={(e) => handleClick(e)} selectedKeys={[current]} />
                                    {
                                          current === "article" ?
                                                (<ArticlesList articles={articleList} />)
                                                :
                                                (current === "like" ? (<ArticlesList articles={articleList} />) : (<Attention id={id} />))
                                    }
                              </div>

                        </Col>
                        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
                              <div className={styles.block} style={{ marginBottom: '0.5rem' }}>
                                    <h3 className={styles.blockTitle}>个人成就</h3>
                                    <Divider style={{ margin: '15px 0' }} />
                                    <div style={{ marginBottom: '8px' }}>
                                          <LikeFilled className='icon-type' />&nbsp;&nbsp;
                                          <span style={{ marginLeft: '4px' }}>
                                                获得点赞:
                                                {framer.beLiked}
                                          </span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                          <EyeFilled className='icon-type' />&nbsp;&nbsp;
                                          <span style={{ marginLeft: '4px' }}>
                                                文章被阅读:
                                                {framer.beViewed}
                                          </span>
                                    </div>
                              </div>
                              <div className={styles.block} style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                          <p className={styles.itemsTitle}>关注了</p>
                                          <div className={styles.itemsCount1}>
                                                <Statistic value={framer.followCount || 0} />
                                          </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                          <p className={styles.itemsTitle}>关注者</p>
                                          <div className={styles.itemsCount1}>
                                                <Statistic value={framer.beFollowCount || 0} />
                                          </div>
                                    </div>
                              </div>
                              <div style={{ padding: '8px', paddingTop: '0px' }}>
                                    <Divider />
                                    <Link href="">
                                          <span className={styles.itemsTitle}>收藏集</span>
                                          <span className={styles.itemsCount}>{framer.collectionSet}</span>
                                    </Link>
                                    <Divider />
                                    <Link href="">
                                          <span className={styles.itemsTitle}>关注标签</span>
                                          <span className={styles.itemsCount}>12</span>
                                    </Link>
                                    <Divider />
                                    <Link href="">
                                          <span className={styles.itemsTitle}>加入于</span>
                                          <span className={styles.itemsCount}>{framer.registerTime}</span>
                                    </Link>
                                    <Divider />
                              </div>
                        </Col>
                  </Row>
            </>
      )
}

Center.getInitialProps = async (context) => {
      const id = context.query.id
      const res1 = await getArticleListByFramerId(id)
      let articles = undefined;
      let framerInfo = undefined;
      // if (res1.code === 200) {
      //       articles = res1.data;
      // } else {
      //       console.log("个人中心获取文章列表失败：", res1);
      // }

      const res2 = await getCenterInfo(id)
      // if (res2.code === 200) {
      //       framerInfo = res2.data;
      // } else {
      //       console.log("获取用户数据失败：", res2);
      // }
      return { articles, framerInfo };
}

export default Center;
