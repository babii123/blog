/**
 * @Description 创作者中心-内容管理-文章管理-草稿箱
 */

import { Card, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import Router from 'next/router'

import BlogList from '../BlogList'

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
      drafts: <BlogList />,
};

const DraftsMain: React.FC = () => {
      const [activeTabKey2, setActiveTabKey2] = useState<string>('drafts');

      const onTab2Change = (key: string) => {
            Router.push("/creator/content/article/" + key)
      };

      return (
            <Card
                  style={{ width: '100%' }}
                  tabList={tabListNoTitle}
                  activeTabKey={activeTabKey2}
                  onTabChange={onTab2Change}
                  tabBarExtraContent={<Input placeholder="请输入标题关键字" suffix={<SearchOutlined style={{ color: '#89939e' }} />} />}
            >
                  {contentListNoTitle[activeTabKey2]}
            </Card>
      );
};

export default DraftsMain;