/**
 * @Description 创作者中心-内容管理-文章管理-草稿箱
 */

import dynamic from 'next/dynamic';

import styles from '../../styles/creator.module.css'
import Header from "../../components/creator/Header";
import SideBar from "../../components/creator/SideBar"
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MenuKeyPath } from './data';

interface Props {
      DefaultSelectedKeys: string[],
      PathName: string
}

// 内容管理-文章管理
const DraftsMain = dynamic(() => import("../../components/creator/pageMain/DraftsMain"), { loading: () => <p>...</p> })
const EssaysMain = dynamic(() => import("../../components/creator/pageMain/EssaysMain"), { loading: () => <p>...</p> })
// 内容管理-专栏管理
const ColumnMain = dynamic(() => import('../../components/creator/pageMain/ColumnMain'))
// 内容管理-沸点管理
const PinsMain = dynamic(() => import('../../components/creator/pageMain/PinsMain'))
// 数据中心-内容数据-文章数据
const ArticleDataEntire = dynamic(() => import('../../components/creator/data/content/ArticleData'))
const ArticleDataSingle = dynamic(() => import('../../components/creator/pageMain/ArticleDataSingle'))
// 数据中心-内容数据-专栏数据
const ColumnDataEntire = dynamic(() => import('../../components/creator/pageMain/ColumnData'))
const PinDataEntire = dynamic(() => import('../../components/creator/data/content/PinData'))
// 数据中心-粉丝数据
const FollowerData = dynamic(() => import('../../components/creator/pageMain/FollowerData'))
// 创作工具 - 自主导入
const ToolImportSelf = dynamic(() => import('../../components/creator/pageMain/ToolImportSelf'))
const contentListNoTitle: Record<string, React.ReactNode> = {
      // 内容管理-文章管理
      drafts: <DraftsMain />,
      essays: <EssaysMain />,
      column: <ColumnMain />,
      pins: <PinsMain />,
      articleDataEntire: <ArticleDataEntire />,
      articleDataSingle: <ArticleDataSingle />,
      columnDataEntire: <ColumnDataEntire />,
      pinDataEntire: <PinDataEntire />,
      followerData: <FollowerData />,
      toolImportSelf: <ToolImportSelf />
};

export default function Creator({ url, countUrl, headName }: InferGetServerSidePropsType<typeof getServerSideProps>) {
      return (
            <>
                  <Head>
                        <title>创作者中心</title>
                  </Head>
                  <Header />
                  <main className={styles.container} style={{ maxWidth: '1200px' }}>
                        <SideBar DefaultSelectedKeys={DefaultSelectedKeys} />
                        <div className={styles.rightWrap}>
                              <div className={styles.homeContainer + " " + styles.mainContent}>
                                    {contentListNoTitle[PathName]}
                              </div>
                        </div>
                  </main>

            </>
      );
};
// const Creator: React.FC<Props> = ({ DefaultSelectedKeys, PathName }) => {
//       return (
//             <>
//                   <Head>
//                         <title>创作者中心</title>
//                   </Head>
//                   <Header />
//                   <main className={styles.container} style={{ maxWidth: '1200px' }}>
//                         <SideBar DefaultSelectedKeys={DefaultSelectedKeys} />
//                         <div className={styles.rightWrap}>
//                               <div className={styles.homeContainer + " " + styles.mainContent}>
//                                     {contentListNoTitle[PathName]}
//                               </div>
//                         </div>
//                   </main>

//             </>
//       );
// };

export const getServerSideProps: GetServerSideProps<{ DefaultSelectedKeys: string }> = async ({ pathname }: { pathname: string }) => {
      console.log('type:', typeArr[params.type].url);
      return {
            props: {
                  DefaultSelectedKeys: [MenuKeyPath[pathname]]
            }
      }
}
