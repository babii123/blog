/**
 * @Description 创作者中心-内容管理-文章管理-草稿箱
 */

import dynamic from 'next/dynamic';

import styles from '../../styles/creator.module.scss'
import Header from "../../components/creator/Header";
import SideBar from "../../components/creator/SideBar"
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, NextApiRequest } from 'next';
import { MenuKeyPath } from './data';
import { useEffect, useState } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import showLoginModel from 'utils/showLoginModel';
import middleware from 'middleware';


//首页
const HomeMain = dynamic(() => import("../../components/creator/pageMain/HomeMain"))
// 内容管理-文章管理
const DraftsMain = dynamic(() => import("../../components/creator/pageMain/DraftsMain"), { loading: () => <p>...</p> })
const EssaysMain = dynamic(() => import("../../components/creator/pageMain/EssaysMain"), { loading: () => <p>...</p> })
// 内容管理-专栏管理
const ColumnMain = dynamic(() => import('../../components/creator/pageMain/ColumnMain'))
// 内容管理-沸点管理
const PinsMain = dynamic(() => import('../../components/creator/pageMain/PinsMain'))
// 数据中心-粉丝数据
const FollowerData = dynamic(() => import('../../components/creator/pageMain/FollowerData'))
// 创作工具 - 自主导入
const ToolImportSelf = dynamic(() => import('../../components/creator/pageMain/ToolImportSelf'))

const DataMain = dynamic(() => import('../../components/creator/pageMain/DataMain'))
const contentListNoTitle: Record<string, React.ReactNode> = {
      '/home': <HomeMain />,
      // 内容管理-文章管理
      '/content/article/drafts': <DraftsMain />,
      '/content/article/essays': <EssaysMain />,
      '/content/column': <ColumnMain />,
      '/content/pins': <PinsMain />,
      '/data/content/article/entire': <DataMain type="article" myChart="entire" />,
      '/data/content/article/single': <DataMain type="article" myChart="single" />,
      '/data/content/column/entire': <DataMain type="column" myChart="entire" />,
      '/data/content/column/single': <DataMain type="column" myChart="single" />,
      '/data/content/pin/entire': <DataMain type="pin" myChart="entire" />,
      '/data/content/pin/single': <DataMain type="pin" myChart="single" />,
      '/data/follower/data': <FollowerData type="data" />,
      '/data/follower/list': <FollowerData type="list" />,
      '/tool/import/self': <ToolImportSelf />
};

export default function Creator({ defaultSelectedKeys, pathName, isLogin }: InferGetServerSidePropsType<typeof getServerSideProps>) {

      const [children, setChildren] = useState<React.ReactNode>()
      useEffect(() => {
            console.log(isLogin);

            if (isLogin === 'false') {
                  showLoginModel()
            }

            setChildren(contentListNoTitle[pathName])
      }, [defaultSelectedKeys, pathName])

      return (
            <>
                  <Head>
                        <title>创作者中心</title>
                  </Head>
                  <Header />
                  <main className={styles.container} style={{ maxWidth: '1200px' }}>
                        <SideBar DefaultSelectedKeys={defaultSelectedKeys} />
                        <div className={styles.rightWrap}>
                              <div className={styles.homeContainer + " " + styles.mainContent}>
                                    {children}
                              </div>
                        </div>
                  </main>

            </>
      );
};

export const getServerSideProps: GetServerSideProps<{
      defaultSelectedKeys: Array<string>,
      pathName: string,
      isLogin: string
}> = async ({ params, req }: { params: { layout: Array<string> }, req: any }) => {
      let pathName = ""
      let defaultSelectedKeys = [""]

      if (req.headers.islogin === "true") {
            pathName = '/' + params.layout.join('/')
            defaultSelectedKeys = [MenuKeyPath[pathName] as string]
      }

      return {
            props: {
                  defaultSelectedKeys,
                  pathName,
                  isLogin: req.headers.islogin
            }
      }
}