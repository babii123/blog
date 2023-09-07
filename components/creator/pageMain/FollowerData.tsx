/**
 * @Description 数据中心 - 粉丝数据 - 粉丝数据
 */

import { Card, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import Router from 'next/router'

import styles from '../../../styles/creator.module.scss'
import StatisticEntire from '../StatisticEntire';
import MyCharts from '../MyCharts';

interface CountDataModel {
      label: string,
      count: number,
      color: string
}

interface PropsModel {
      type: string
}

const tabListNoTitle = [
      {
            key: 'data',
            tab: '粉丝数据',
      },
      {
            key: 'list',
            tab: '粉丝列表',
      },
];

const FollowerData: React.FC<PropsModel> = ({ type }) => {

      const [count_data, setCountData] = useState<Array<CountDataModel>>([
            {
                  label: '总文章数',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '文章展现数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章阅读数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章点赞数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章评论数',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '文章收藏数',
                  count: 0,
                  color: '#86909c'
            },
      ]);

      const CountList = {
            '全部': 'all',
            '已发布': 'published',
            '审核中': 'auditing',
            '未通过': 'rejected'
      }

      const [activeTabKey2, setActiveTabKey2] = useState<string>(type);

      const onTab2Change = (key: string) => {
            // setActiveTabKey2(key);
            // 跳转
            Router.push("/creator/data/follower/" + key)
      };

      const changeData = (_item: CountDataModel) => {
            Router.push({ pathname: '/creator/content/article/essays', query: { status: CountList[_item.label] } })
            const dataArray = count_data.map((item, i) => {
                  if (item.label === _item.label) return { ...item, color: '#1677ff' }
                  else return { ...item, color: '' }
            })
            setCountData(dataArray)
      }

      useEffect(() => {
            const status = Router.query.status as string
            console.log(status);

            const dataArray = count_data.map((item, i) => {
                  if (CountList[item.label] === status) return { ...item, color: '#1677ff' }
                  else return { ...item, color: '#86909c' }
            })
            setCountData(dataArray)
      }, [])
      useEffect(() => {
            setActiveTabKey2(type)
      },[type])

      return (
            <>

                  <Card
                        style={{ width: '100%' }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeTabKey2}
                        onTabChange={onTab2Change}
                        tabBarExtraContent={<Input placeholder="请输入标题关键字" suffix={<SearchOutlined style={{ color: '#89939e' }} />} />}
                  >
                        {
                              type === 'data'
                                    ?
                                    (
                                          <>
                                                {/* 数据统计 */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                      <div className={styles.dataCardEntire}>
                                                            <StatisticEntire value={21} title="总粉丝" />
                                                            <div>较前日--</div>
                                                      </div>
                                                      <div className={styles.dataCardEntire}>
                                                            <StatisticEntire title="互动粉丝" value={3563} />
                                                            <div>较前日--</div>
                                                      </div>
                                                      <div className={styles.dataCardEntire} style={{ marginRight: '0' }}>
                                                            <StatisticEntire title="新增粉丝" value={956} />
                                                            <div>较前日--</div>
                                                      </div>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                      <div className={styles.dataCardEntire} style={{ marginBottom: '0' }}>
                                                            <StatisticEntire title="取消关注" value={16} />
                                                            <div>较前日--</div>
                                                      </div>
                                                      <div className={styles.dataCardEntire} style={{ marginBottom: '0' }}>
                                                            <StatisticEntire title="净增关注" value={1} />
                                                            <div>较前日--</div>
                                                      </div>
                                                </div>
                                                <h2 style={{ margin: '20px 0' }}>数据趋势</h2>
                                                <MyCharts />
                                          </>
                                    )
                                    :
                                    (
                                          <>{type}</>
                                    )
                        }
                  </Card>
            </>

      );
};

export default FollowerData;