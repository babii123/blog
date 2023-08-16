import React from 'react';
import {
      LikeOutlined,
      EyeOutlined,
} from "@ant-design/icons";
import { useEffect } from 'react';
import { Row, Col, List, FloatButton, Affix, Tabs, Pagination, Divider } from "antd";
import Advert from "./Advert";
import styles from '../../styles/index.module.css'
import Tocify from '../tocify';
import { marked } from "marked";
import { useState } from 'react';
import { ArticleCardIcon } from '../../utils/icon.js'
import { processFormat } from '../../utils/numerProcess'
import { GetAritcleListModel } from '../../model/ResponseModel'

import { getArticleCount, getAritcleList } from '../../config/getRequest'
import hljs from 'highlight.js';

interface PropsModel {
      url: string,
      countUrl: string,
      data: Array<GetAritcleListModel>,
      count: number
}

const DataList: React.FC<PropsModel> = (props) => {
      const { url, countUrl, data, count } = props
      const pageSize = 10
      const [current, setCurrent] = useState<number>(1)
      const [mylist, setMylist] = useState<Array<GetAritcleListModel>>()
      const [total, setTotal] = useState<number>()
      // 获取条数
      const getCount = async () => {
            getArticleCount(countUrl).then(res => {
                  if (res.code === 200) {
                        setTotal(res.data)
                  } else {
                        console.log("获取文章总数失败：" + res);
                  }
            })
      }
      // 获取数据
      const appendData = async (page: number, pageSize: number) => {
            // console.log(page, pageSize);
            getAritcleList(url, page, pageSize).then(res => {
                  if (res.code === 200) {
                        setMylist(res.data)
                  } else {
                        console.log("获取文章列表失败：" + res);
                  }
            })
      }
      useEffect(() => {
            console.log(count);
            setMylist(data);
            setTotal(count);
            // appendData(current, pageSize);
            // getCount();
      }, [props]);
      const tocify = new Tocify();

      const renderer = new marked.Renderer();
      renderer.heading = function (text: string, level: number) {
            const anchor = tocify.add(text, level);
            return `<a id="${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
      };

      marked.setOptions({
            renderer,
            highlight: function (code: string, lang: any) {
                  // return hljs.highlightAuto(code).value;
                  const hljs = require("highlight.js");
                  const language = hljs.getLanguage(lang) ? lang : "plaintext";
                  return hljs.highlight(code, { language }).value;
            },
            langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            // smartypants: false,
            // xhtml: false,
            tables: true,
            smartLists: true,
      });
      const onChange = (page: number, pageSize: number) => {
            setCurrent(page)
            appendData(page, pageSize)
      }
      return (
            <>
                  <Row className="comm-main" justify="center">
                        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                              <List
                                    dataSource={mylist}
                                    renderItem={(item) => (
                                          <List.Item style={{ display: 'block' }}>
                                                <div style={{ color: '#8a919f' }}>
                                                      <a
                                                            href={`/user/${item.framerId}`}
                                                            target="_blank"
                                                            style={{ color: '#515767' }}
                                                      >
                                                            <span className="link">
                                                                  {item.framerName}
                                                            </span>
                                                      </a>
                                                      <Divider type="vertical" />
                                                      {item.updateTime}
                                                      <Divider type="vertical" />
                                                      {item.typeName}
                                                </div>
                                                <div className="list-title">
                                                      <a
                                                            href={`/post/${item.id}`}
                                                            target="_blank"
                                                            style={{ color: '#252933' }}
                                                      >
                                                            {item.title}
                                                      </a>
                                                </div>
                                                <div className="list-context"
                                                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                                                ></div>
                                                <div>
                                                      <span className={styles.itemIcon}>
                                                            <EyeOutlined />
                                                            &nbsp; {processFormat(item.viewCount)}
                                                      </span>
                                                      <span className={styles.itemIcon}>
                                                            <LikeOutlined />
                                                            &nbsp; {processFormat(item.likeCount)}
                                                      </span>
                                                      <span className={styles.itemIcon}>
                                                            <ArticleCardIcon type='icon-pinglun' />
                                                            &nbsp; {processFormat(item.commentCount)}
                                                      </span>
                                                </div>
                                          </List.Item>
                                    )}

                              />
                              <Pagination current={current} total={total} onChange={onChange} />
                        </Col>

                        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
                              {/* <Author /> */}
                              <Affix offsetTop={10} onChange={(affixed) => console.log(affixed)}>
                                    <Advert />
                              </Affix>
                        </Col>
                  </Row>
                  <FloatButton.BackTop />
            </>
      );
};

export default DataList;