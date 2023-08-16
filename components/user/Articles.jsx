import React from 'react'
import { processFormat } from '../../utils/numerProcess'
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import styles from '../../styles/Center.module.css'
import { List, Divider, Empty, Dropdown, message } from 'antd';
import Tocify from '../tocify';
import { marked } from "marked";
import { ArticleCardIcon } from '../../utils/icon'
import { useState } from 'react';
import { delArticle, getArticleListByFramerId } from '../../config/getRequest'

const Articles = ({ articles }) => {

      const [articleList, setArticleList] = useState(articles)
      const tocify = new Tocify();

      const renderer = new marked.Renderer();
      renderer.heading = function (text, level, raw) {
            const anchor = tocify.add(text, level);
            return `<a id="${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
      };

      marked.setOptions({
            renderer,
            highlight: function (code, lang) {
                  return hljs.highlightAuto(code).value;
            },
            langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            tables: true,
            smartLists: true,
      });
      const items = [
            {
                  key: '1',
                  label: (<div onClick={del}>删除</div>)
            },
            {
                  key: '2',
                  label: (<div onClick={edit}>编辑</div>)
            },
      ]
      const [id, setId] = useState()
      function del() {
            delArticle(id).then(res => {
                  if (res.code === 200) {
                        message.success("删除成功")
                        location.reload()
                  } else {
                        message.success("删除失败")
                        console.log(res);
                  }
            })
      }
      function edit() {
            console.log(id);
            window.open(`/editor/drafts/${id}`)
      }
      const getId = (id) => {
            // event.stopPropagation();
            console.log(id);
            setId(id)
      }
      return (
            <>
                  {
                        articles.length === 0
                              ?
                              <Empty style={{ paddingTop: '20px', paddingBottom: '20px', margin: 0, backgroundColor: '#fff', width: '100%' }} />
                              :
                              <List
                                    style={{ backgroundColor: '#fff' }}
                                    dataSource={articleList || null}
                                    renderItem={(item) => (
                                          <List.Item style={{ display: 'block' }}>

                                                <div style={{ color: '#8a919f' }}>
                                                      <a
                                                            href={`/type/${item.framerId || ""}`}
                                                            target="_blank"
                                                            style={{ color: '#515767' }}
                                                      >
                                                            <span className="link">
                                                                  {item.framerName || ""}
                                                            </span>
                                                      </a>
                                                      <Divider type="vertical" />
                                                      {item.updateTime || ""}
                                                      <Divider type="vertical" />
                                                      {item.typeName || ""}
                                                </div>
                                                <div className="list-title">
                                                      <a
                                                            href={`/detailed?id=${item.id}`}
                                                            target="_blank"
                                                            style={{ color: '#252933' }}
                                                      >
                                                            {item.title || ""}
                                                      </a>
                                                </div>
                                                <div className="list-context"
                                                      dangerouslySetInnerHTML={{ __html: marked(item.introduce || "") }}
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
                                                      <span className={styles.itemIcon} >
                                                            <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
                                                                  <span onClick={(e) => getId(item.id, e)}>...</span>
                                                            </Dropdown>
                                                      </span>
                                                </div>
                                          </List.Item >
                                    )
                                    }
                              />
                  }

            </>

      )
}
export default Articles;
