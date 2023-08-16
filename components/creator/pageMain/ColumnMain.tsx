/**
 * @Description 创作者中心-内容管理-专栏管理
 */

import { Card, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import Router from 'next/router'

const tabListNoTitle = [
      {
            key: 'cloumn',
            tab: '专栏',
      },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
      cloumn: <p>敬请期待...</p>,
};

const ColumnMain: React.FC = () => {
      const [activeTabKey2, setActiveTabKey2] = useState<string>('cloumn');

      const onTab2Change = (key: string) => {
            // Router.push("/creator/content/" + key)
      };

      return (
            <>
                  <Card
                        style={{ width: '100%' }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeTabKey2}
                        onTabChange={onTab2Change}
                        tabBarExtraContent={<Input placeholder="请输入标题关键字" suffix={<SearchOutlined style={{ color: '#89939e' }} />} />}
                  >
                        {contentListNoTitle[activeTabKey2]}
                  </Card>
            </>
      );
};

export default ColumnMain;