import { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Row, Col, Avatar, Affix, Divider, Space, Badge } from "antd";
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../../components/tocify'
import { getDetailInfo, getRelateByFramerId } from '../../config/getRequest'
import { clickCollect, clickLike } from '../../config/handleRequest'
import Header from "../../components/other/Header";
import Author from "../../components/other/Author";
import Advert from "../../components/other/Advert";
import Footer from "../../components/other/Footer";
import styles from "../../styles/Detailed.module.css";
import { ArticleCardIcon, ArticleCardIconOtherColor } from '../../utils/icon.js'
import { processFormat } from '../../utils/numerProcess'
import { ArticleDetailModel, DetailRelateModel } from "model/ResponseModel";

export default function Detailed({ info }: InferGetServerSidePropsType<typeof getServerSideProps>) {
      const [isAttention, setIsAttention] = useState<boolean>(false);
      const [isLike, setIsLike] = useState<boolean>(false);
      const [isCollect, setIsCollect] = useState<boolean>(false);
      const tocify = new Tocify()

      const renderer = new marked.Renderer();
      renderer.heading = function (text: string, level: number, raw: number) {
            const anchor = tocify.add(text, level)
            return `<a id="${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
      }

      marked.setOptions({
            renderer,
            highlight: function (code: string, lang: string) {
                  return hljs.highlightAuto(code).value
                  // const hljs = require("highlight.js");
                  // const language = hljs.getLanguage(lang) ? lang : "plaintext";
                  // return hljs.highlight(code, { language }).value;
            },
            langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            // smartypants: false,
            // xhtml: false,
            tables: true,
            smartLists: true
      });
      let html = marked(info.content)

      useEffect(() => {
            // 获取是否关注和点赞

      }, [])
      // 点赞
      const like = () => {
            clickLike(localStorage.getItem("framer_id") as string, info.id).then(res => {
                  if (res.code === 200) {
                        setIsLike(!isLike)
                  } else {
                        console.log("点赞失败：", res);
                  }
            })
      }
      // 收藏
      const collect = () => {
            clickCollect(localStorage.getItem("framer_id") as string, info.id).then(res => {
                  if (res.code === 200) {
                        setIsCollect(!isCollect)
                  } else {
                        console.log("收藏失败：", res);
                  }
            })
      }
      return (
            <>
                  <Head>
                        <title>博客详细页</title>
                  </Head>
                  <Header />
                  <Row className="comm-main" justify="center">
                        <div style={{ position: 'fixed', top: '20%', left: '4%' }}>
                              <Space size="large" direction="vertical">
                                    <Badge count={processFormat(info.likeCount)} overflowCount={10000000}>
                                          <Avatar size={48} icon={
                                                isLike ? <ArticleCardIconOtherColor type='icon-dianzan' /> : <ArticleCardIcon type='icon-dianzan_kuai' />
                                          } className="panelBtn" onClick={like} />
                                    </Badge>
                                    <Badge count={processFormat(info.commentCount)} overflowCount={10000000}>
                                          <Avatar size={48} icon={<ArticleCardIcon type='icon-pinglun1' />} className="panelBtn" />
                                    </Badge>
                                    <Badge count={processFormat(info.collectCount)} overflowCount={10000000}>
                                          <Avatar size={48} icon={
                                                isCollect ? <ArticleCardIconOtherColor type='icon-shoucangxuanzhong' /> : <ArticleCardIcon type='icon-shoucang' />
                                          } className="panelBtn" onClick={collect} />
                                    </Badge>
                                    <Avatar size={48} icon={<ArticleCardIcon type='icon-zhuanfa' />} className="panelBtn" />
                              </Space>
                              <Divider orientation="left" />
                              <Space size="large" direction="vertical">
                                    <Avatar size={48} icon={<ArticleCardIcon type='icon-xinfangjubao' />} className="panelBtn" />
                                    <Avatar size={48} icon={<ArticleCardIcon type='icon-tianchongxing-' />} className="panelBtn" />
                              </Space>
                        </div>
                        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13} style={{ padding: '35px' }}>
                              <h1 className={styles.detailed_title}>
                                    {info.title}
                              </h1>
                              <div className={styles.authorInfoBlock} style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <a href="">
                                          <Avatar src={info.framerAvatar} size="large" style={{ marginRight: '8px' }} />
                                    </a>
                                    <div className={styles.authorInfoBox}>
                                          <div className={styles.authorName}>
                                                {info.framerName}
                                          </div>
                                          <div className={styles.metaBox}>
                                                <span style={{ marginRight: '10px' }}>
                                                      {info.updateTime}
                                                </span>
                                                •&nbsp;&nbsp;
                                                <span>
                                                      阅读 {info.viewCount}
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              <div className={styles.detailed_content}
                                    dangerouslySetInnerHTML={{ __html: html }}
                              >
                              </div>
                        </Col>
                        <Col xs={0} sm={0} md={7} lg={5} xl={5}>
                              <Author framerP={info.framerId} framerName={info.framerName} framerAvatar={info.framerAvatar} />
                              <Advert />
                              <Affix offsetTop={5}>
                                    <div className={styles.detailed_nav + " " + "comm-box"}>
                                          <div className={styles.nav_title}>文章目录</div>
                                          {tocify && tocify.render()}
                                    </div>
                              </Affix>
                        </Col>
                  </Row>
                  <Footer />
            </>
      );
}

export const getServerSideProps: GetServerSideProps<{ info: ArticleDetailModel }> = async ({ params }: { params: { id: string } }) => {
      const id = params.id;
      const res = await fetch(`http://localhost:8080/blog/article/getDetailInfo/${id}`)
      const info = (await res.json()).data

      getRelateByFramerId('1', info.framerId, info.id).then(res => {
            if (res.code === 200) {
                  console.log('xxx=', res);
            } else {
                  console.log("getRelateByFramerId:", res);
            }
      })

      return {
            props: {
                  info
            }
      }
}

