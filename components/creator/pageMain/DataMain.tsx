/**
 * @Description 数据中心 - 内容数据 - 文章数据
 */

import { Card, Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import Router from 'next/router'
import type { TabsProps } from 'antd';

import { CountDataModel } from './type'
import dynamic from 'next/dynamic';
import MyCharts from '../MyCharts';

interface PropsModel {
      type: string,
      myChart: string
}

const tabListNoTitle = [
      {
            key: 'article',
            tab: '文章数据',
      },
      {
            key: 'column',
            tab: '专栏数据',
      },
      {
            key: 'pin',
            tab: '沸点数据',
      },
];

const onChange = (key: string) => {
      Router.push("/creator/data/content/article/" + key)
};

const items: TabsProps['items'] = [
      {
            key: 'entire',
            label: `整体分析`,
      },
      {
            key: 'single',
            label: `单篇分析`,
      },
];

const CountList = {
      '全部': 'all',
      '已发布': 'published',
      '审核中': 'auditing',
      '未通过': 'rejected'
}

const ArticleData = dynamic(() => import('../data/content/ArticleData'))
const ColumnData = dynamic(() => import('../data/content/ColumnData'))
const PinData = dynamic(() => import('../data/content/PinData'))
const Children: Record<string, React.ReactNode> = {
      'article': <ArticleData />,
      'column': <ColumnData />,
      'pin': <PinData />
}

const ContentArticleMain: React.FC<PropsModel> = ({ type, myChart }) => {
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

      const [activeTabKey2, setActiveTabKey2] = useState<string>('article');
      const [children, setChildren] = useState<React.ReactNode>()
      const onTab2Change = (key: string) => {
            // setActiveTabKey2(key);
            // 跳转
            Router.push("/creator/data/content/" + key + "/entire")
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
            setChildren(Children[type])
      }, [type, myChart])

      return (
            <>
                  <Card
                        style={{ width: '100%' }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeTabKey2}
                        onTabChange={onTab2Change}
                        tabBarExtraContent={<Input placeholder="请输入标题关键字" suffix={<SearchOutlined style={{ color: '#89939e' }} />} />}
                  >
                        {/* 数据统计 */}
                        {children}
                        <h2 style={{ margin: '20px 0' }}>数据趋势</h2>
                        <Tabs defaultActiveKey="entire" items={items} onChange={onChange} />
                        <MyCharts />
                  </Card>
            </>
      );
};

export default ContentArticleMain;