import React, { useEffect } from 'react'
import { processFormat } from '../../utils/numerProcess'
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import styles from '../../styles/Center.module.scss'
import { List, Divider, Empty, Dropdown, message } from 'antd';
import { ArticleCardIcon } from '../../utils/icon'
import { useState } from 'react';
import { getArticleListByFramerId } from '../../config/getRequest'
import { delArticle } from '../../config/handleRequest'
import { ArticleInfoModel } from 'model/ResponseModel';

const Articles: React.FC<{ articles: Array<ArticleInfoModel> }> = ({ articles }) => {

      const [articleList, setArticleList] = useState(articles)
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
      const [id, setId] = useState<string>("")
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
      const getId = (id: string) => {
            console.log(id);
            setId(id)
      }
      useEffect(() => {
            setArticleList(articles)
      }, [articles])

      return (
            <>
                  {
                        articles.length === 0
                              ?
                              <Empty style={{ paddingTop: '20px', paddingBottom: '20px', margin: 0, backgroundColor: '#fff', width: '100%' }} />
                              :
                              <List
                                    style={{ backgroundColor: '#fff', padding: '1rem' }}
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
                                                      {item.updateTime.toLocaleString() || ""}
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
                                                      dangerouslySetInnerHTML={{ __html: (item.introduce || "") }}
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
                                                                  <span onClick={(e) => getId(item.id)}>...</span>
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
