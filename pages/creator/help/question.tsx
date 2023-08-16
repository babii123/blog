/**
 * @Description 数据中心 - 粉丝数据 - 粉丝数据
 */

import { Card, Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import Router from 'next/router'
import { NextPage } from 'next';
import type { TabsProps } from 'antd';

import styles from '../../../styles/creator.module.css'
import Header from "../../../components/creator/Header";
import SideBar from "../../../components/creator/SideBar"
import ContentQuestion from '../../../components/creator/help/ContentQuestion';
import AuditQuestion from '../../../components/creator/help/AuditQuestion';
import { MenuKeyPath, Props } from '../data'

const tabListNoTitle = [
      {
            key: 'content',
            tab: '内容曝光',
      },
      {
            key: 'audit',
            tab: '内容审核',
      },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
      content: <ContentQuestion />,
      audit: <AuditQuestion />
};

const Question: NextPage<Props> = ({ DefaultSelectedKeys }) => {

      const [activeTabKey2, setActiveTabKey2] = useState<string>('content');

      const onTab2Change = (key: string) => {
            setActiveTabKey2(key)
            // console.log(key);
      };

      return (
            <>
                  <Header />
                  <main className={styles.container} style={{ maxWidth: '1200px' }}>
                        <SideBar DefaultSelectedKeys={DefaultSelectedKeys} />
                        <div className={styles.rightWrap}>
                              <div className={styles.homeContainer + " " + styles.mainContent}>
                                    <Card
                                          style={{ width: '100%' }}
                                          tabList={tabListNoTitle}
                                          activeTabKey={activeTabKey2}
                                          onTabChange={onTab2Change}
                                    >
                                          {contentListNoTitle[activeTabKey2]}
                                    </Card>
                              </div>
                        </div>
                  </main >

            </>
      );
};

Question.getInitialProps = async ({ pathname }) => {
      return {
            DefaultSelectedKeys: [MenuKeyPath[pathname]]
      }
}

export default Question;