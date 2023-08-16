import Header from "../components/other/Header";
import DataList from "../components/other/DataList";
import Footer from "../components/other/Footer";
import NiceModal from '@ebay/nice-modal-react';
import { GetAritcleListModel } from "model/ResponseModel";
import { useEffect, useState } from "react";
import { getAritcleList, getArticleCount } from "config/getRequest";
import Head from "next/head";

export default function Home() {
  const url = "/article"
  const countUrl = "/article/getCount"

  const [data,setData] = useState<Array<GetAritcleListModel>>();
  const [count,setCount] = useState<number>()

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

  })

  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <NiceModal.Provider>
        <Header />
        <DataList url={url} countUrl={countUrl} data={data as Array<GetAritcleListModel>} count={count || 0}/>
        <Footer />
      </NiceModal.Provider>
    </>
  );
}
