
/**
* @Description 数据中心 - 内容数据 - 文章数据
*/

import { Avatar, Card, Divider, Statistic } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';

import styles from '../../../styles/creator.module.css'
import BlogList from '../BlogList';

const HomeMain: React.FC = () => {

      return (
            <>
                  <div className={styles.main}>
                        <Card style={{ marginBottom: '20px' }}>
                              <div style={{ display: "flex", fontSize: '16px' }}>
                                    <Avatar size={64} />
                                    <div style={{ marginLeft: '15px', padding: '3px 0' }}>
                                          <div className={styles.rightTop}>Babii</div>
                                          <div className={styles.rightBottom} style={{ marginTop: '6px' }}>
                                                0 粉丝
                                                <Divider type="vertical" />
                                                2 关注
                                                <Divider type="vertical" />
                                                在blog创作的第324天
                                          </div>
                                    </div>
                              </div>
                        </Card>
                        <Card
                              title="数据概览"
                              style={{ marginBottom: '20px' }}
                              extra={<a href="#" >查看更多<RightOutlined /></a>}
                        >
                              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className={styles.dataCard}>
                                          <Statistic title="总粉丝数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                                    <div className={styles.dataCard}>
                                          <Statistic title="文章展现数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                                    <div className={styles.dataCard} style={{ marginRight: '0' }}>
                                          <Statistic title="文章阅读数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className={styles.dataCard} style={{ marginBottom: '0' }}>
                                          <Statistic title="文章点赞数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                                    <div className={styles.dataCard} style={{ marginBottom: '0' }}>
                                          <Statistic title="文章评论数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                                    <div className={styles.dataCard} style={{ marginBottom: '0', marginRight: '0' }}>
                                          <Statistic title="文章收藏数" value={112893} />
                                          <div>较前日--</div>
                                    </div>
                              </div>
                        </Card>
                        <Card title="近期发布">
                              <BlogList />
                        </Card>
                  </div>
                  <div className={styles.right}>
                        <Card title="创作活动" className={styles.activityCard}></Card>
                        <Card title="创作话题" className={styles.activityCard} style={{ top: "calc(4rem + 188px)" }}></Card>
                  </div>
            </>
      );
};

export default HomeMain;