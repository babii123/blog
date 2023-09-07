import Header from "../components/other/Header";
import Footer from "../components/other/Footer";
import DataList from "../components/other/DataList";
import { typeArr } from '../assets/typeData'

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { getAritcleList, getArticleCount } from "config/getRequest";
import { GetAritcleListModel } from "model/ResponseModel";
import NiceModal from "@ebay/nice-modal-react";
import Head from "next/head";

export default function Type({ url, countUrl, headName }:
       InferGetServerSidePropsType<typeof getServerSideProps>) {
      const [data, setData] = useState<Array<GetAritcleListModel>>()
      const [count, setCount] = useState<number>()

      //监听url
      useEffect(() => {
            console.log('type执行...', url, countUrl);
            getAritcleList(url, 1, 10).then(res => {
                  if (res.code === 200) {
                        setData(res.data)
                  } else {
                        console.log("获取文章列表失败：" + res);
                  }
            })
            getArticleCount(countUrl).then(res => {
                  if (res.code === 200) {
                        setCount(res.data)
                  } else {
                        console.log("获取文章总数失败：" + res);
                  }
            })
            console.log("count", count);
            console.log("data", data);

      }, [url, countUrl])

      return (
            <>
                  <Head>
                        <title>{headName}</title>
                  </Head>
                  <NiceModal.Provider>
                        <Header />
                        <DataList url={url} countUrl={countUrl} data={data as Array<GetAritcleListModel>} count={count || 0} />
                        <Footer />
                  </NiceModal.Provider>
            </>

      );
}

export const getServerSideProps:
      GetServerSideProps<{ url: string, countUrl: string, headName: string }>
      = async ({ params }: { params: { type: string } }) => {
            console.log('type:', typeArr[params.type]?.url);
            return {
                  props: {
                        url: typeArr[params.type]?.url,
                        countUrl: typeArr[params.type]?.countUrl,
                        headName: typeArr[params.type]?.headName
                  }
            }
      }
