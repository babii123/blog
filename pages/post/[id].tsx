import { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Row, Col, Avatar, Affix, Divider, Space, Badge, Card } from "antd";
import { getDetailInfo, getRelateByFramerId } from '../../config/getRequest'
import Header from "../../components/other/Header";
import Author from "../../components/other/Author";
import Advert from "../../components/other/Advert";
import Footer from "../../components/other/Footer";
import styles from "../../styles/Detailed.module.scss";
import { ArticleDetailModel, DetailRelateModel } from "model/ResponseModel";
import Comment from "components/comment/Comment";
import { Sitdown } from 'sitdown';
import { applyJuejinRule } from '@sitdown/juejin';
import React from "react";
import { ArticleSide } from "components/other/AticleSide";

const MarkNav = React.lazy(() => import("../../components/other/MarkNavBar"))

export default function Detailed({ info }: InferGetServerSidePropsType<typeof getServerSideProps>) {
      const sitdown = new Sitdown({
            keepFilter: ['style'],
            codeBlockStyle: 'fenced',
            bulletListMarker: '-',
            hr: '---',
      });
      sitdown.use(applyJuejinRule);
      const content = info.content
      const markdText = sitdown.HTMLToMD(content)

      return (
            <>
                  <Head>
                        <title>{info.title}</title>
                  </Head>
                  <Header />
                  <Row className="comm-main" justify="center">
                        <ArticleSide info={info} />
                        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13} style={{ padding: '35px' }}>
                              <h1 className={styles.detailed_title}>
                                    {info?.title}
                              </h1>
                              <div className={styles.authorInfoBlock} style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <a href="">
                                          <Avatar src={info?.framerAvatar} size="large" style={{ marginRight: '8px' }} />
                                    </a>
                                    <div className={styles.authorInfoBox}>
                                          <div className={styles.authorName}>
                                                {info?.framerName}
                                          </div>
                                          <div className={styles.metaBox}>
                                                <span style={{ marginRight: '10px' }}>
                                                      {info?.updateTime}
                                                </span>
                                                •&nbsp;&nbsp;
                                                <span>
                                                      阅读 {info?.viewCount}
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              <div className={styles.detailed_content}
                                    dangerouslySetInnerHTML={{ __html: info.content }}
                              >
                              </div>

                        </Col>
                        <Col xs={0} sm={0} md={7} lg={5} xl={5}>
                              <Author framerP={info?.framerId} framerName={info?.framerName} framerAvatar={info?.framerAvatar} />
                              <Advert />
                              <Affix offsetTop={5} style={{ marginTop: '10px' }}>
                                    <Card>
                                          <div className={styles.nav_title}>文章目录</div>
                                          <div className={styles.mark_nav}>
                                                <MarkNav markdText={markdText} />
                                          </div>
                                    </Card>
                              </Affix>
                        </Col>
                  </Row>
                  <Row className="comm-main" justify="center" id="comment">
                        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13} style={{ padding: '35px' }}>
                              <Comment articleId={info.id} />
                        </Col>
                        <Col xs={0} sm={0} md={7} lg={5} xl={5}>
                        </Col>
                  </Row >
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

