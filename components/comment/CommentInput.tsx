import { SmileOutlined } from "@ant-design/icons"
import { Button, Input, Popover } from "antd"
import styles from "../../styles/Comment.module.scss"

import data from '../../assets/emojis.json'
import React, { useEffect, useState } from "react"
import { commentArticle, replyComment } from "config/handleRequest"
import { CommentParam, ReplyParam } from "model/ParamsModel"

const { TextArea } = Input

const CommentInput: React.FC<
      {
            articleId: string,
            loadComment: Function,
            type: string,
            replyCommentId: number,
            topCommentId: number
      }
> = ({ articleId, loadComment, type, replyCommentId, topCommentId }) => {

      // emoji表情数据
      const [faceList, setFaceList] = useState<Array<string>>()
      //评论框绑定数据
      const [value, setValue] = useState('');
      const [framerId, setFramerId] = useState("")
      useEffect(() => {
            // console.log(props);
            // 判断是否登录
            setFramerId(localStorage.getItem("framer_id") || "")
            setFaceList([...loadEmojis()])
      }, [])

      // 加载emoji表情数据
      const loadEmojis = () => {
            var l: string[] = []
            for (let i in data) {
                  l.push(data[i].char)
            }
            return l
      }

      //点击emoji修改value值
      const changeValue = (char: string) => {
            let v = value
            setValue(v.concat(char))
      }
      //控制按钮的显现
      const [display, setDisplay] = useState("none")
      //发送评论(直接评论文章)
      const comment = () => {
            const params: CommentParam = { articleId, framerId, content: value }
            commentArticle(params).then(res => {
                  if (res.code === 200) {
                        loadComment()
                        setValue("")
                  }
            })
      }
      // 回复别人评论
      const reply = () => {
            const params: ReplyParam = { articleId, framerId, content: value, replyCommentId, topCommentId }
            replyComment(params).then(res => {
                  if (res.code === 200) {
                        loadComment()
                        setValue("")
                  }
            })
      }

      const handleType = {
            "reply": reply,
            "comment": comment
      }

      const sendComment = () => {
            handleType[type]()
      }

      return (
            <div>

                  {
                        framerId === "" ?
                              <div>未登录</div>
                              :
                              <div>
                                    <TextArea
                                          value={value}
                                          onChange={(e) => setValue(e.target.value)}
                                          placeholder="输入评论(Enter换行,Ctrl+Enter发送)"
                                          autoSize={{ minRows: 3 }}
                                          onFocus={() => setDisplay("flex")}
                                    />
                                    <div className={styles.commentButtonContainer} style={{ display }}>
                                          <Popover placement="bottomLeft" content={
                                                <div className={styles.browBox}>
                                                      <ul>
                                                            {faceList?.map((item, index) => {
                                                                  return (
                                                                        <li onClick={() => changeValue(item)} key={index}>{item}</li>
                                                                  )
                                                            })}
                                                      </ul>
                                                </div>
                                          } trigger="click">
                                                <Button type="link"><SmileOutlined /> 表情</Button>
                                          </Popover>
                                          <div style={{ marginTop: '5px' }}>
                                                <Button type="primary" onClick={() => sendComment()}>
                                                      发送
                                                </Button>
                                          </div>
                                    </div>
                              </div>
                  }

            </div>
      )
}
export default CommentInput