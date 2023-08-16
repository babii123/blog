/**
 * @Description 创作者中心-内容管理-文章管理
 */
import { Card, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import Router from 'next/router'

import styles from '../../../styles/creator.module.css'
import BlogList from '../BlogList'


interface CountDataModel {
      label: string,
      count: number,
      color: string
}

const tabListNoTitle = [
      {
            key: 'essays',
            tab: '文章',
      },
      {
            key: 'drafts',
            tab: '草稿箱',
      },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
      essays: <BlogList />,
};

const EssaysMain: React.FC = () => {
      const [count_data, setCountData] = useState<Array<CountDataModel>>([
            {
                  label: '全部',
                  count: 21,
                  color: '#1677ff'
            },
            {
                  label: '已发布',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '审核中',
                  count: 0,
                  color: '#86909c'
            },
            {
                  label: '未通过',
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

      const [activeTabKey2, setActiveTabKey2] = useState<string>('essays');

      const onTab2Change = (key: string) => {
            // setActiveTabKey2(key);
            // 跳转
            Router.push("/creator/content/article/" + key)
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

      return (
            <Card
                  style={{ width: '100%' }}
                  tabList={tabListNoTitle}
                  activeTabKey={activeTabKey2}
                  onTabChange={onTab2Change}
                  tabBarExtraContent={<Input placeholder="请输入标题关键字" suffix={<SearchOutlined style={{ color: '#89939e' }} />} />}
            >
                  <div style={{ padding: '0 20px', color: '#86909c', cursor: 'pointer' }}>
                        {
                              count_data.map((item, index) => {
                                    return (
                                          <span key={index}>
                                                <span style={{ color: item.color }} onClick={() => changeData(item)}>{item.label}&nbsp; &nbsp;({item.count}) &nbsp;</span>
                                                <Divider type="vertical" className={styles.dividerGap} />
                                          </span>
                                    )
                              })
                        }
                  </div>
                  {contentListNoTitle[activeTabKey2]}
            </Card>
      );
};

export default EssaysMain;