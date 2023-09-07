import React, { useEffect, useState } from "react";
import comments from "../data";
import { CommentOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Row, Input } from "antd";
import styles from '../../styles/Comment.module.scss'
import { getCommentByArticleId } from "config/getRequest";
import { CommentListModel } from "model/ResponseModel";
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import CommentInput from "./CommentInput";
import dateDiff from '../../utils/dateDiff'
import { likeComment } from "config/handleRequest";

const { TextArea } = Input;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div>屏蔽作者</div>
    ),
  },
  {
    key: '2',
    label: (
      <div>举报</div>
    ),
  },
];

const Comment: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [comments, setComments] = useState<Array<CommentListModel>>()
  const [framerId, setFramerId] = useState("")

  // 获取评论数据
  const loadComments = () => {
    getCommentByArticleId(articleId).then(res => {
      if (res.code === 200) {
        setComments(res.data)
        setReplyCommentId(0)
      } else {
        console.log(res.msg);
      }
    })
  }

  const replyHTML = "<div id='replyHTML'></div>"
  const [replyCommentId, setReplyCommentId] = useState<number>()
  // 点击回复
  const showReplyInput = (commentId: number) => {
    setReplyCommentId(commentId)
    // const pNode = e.target.parentNode
    // console.dir(pNode);
    // // 插入元素
    // document.getElementById("replyHTML")?.remove()
    // pNode.insertAdjacentHTML("afterend", replyHTML)
    // // const node = createRoot(document.getElementById("replyHTML"))
    // // node.render(<CommentInput articleId={articleId} loadComment={loadComments} />)
    // ReactDOM.render(<CommentInput articleId={articleId} loadComment={loadComments} />, document.getElementById("replyHTML"))
  };
  // 点击点赞
  const changeLike = (commentId: number) => {
    const commentList = comments?.map(item => {
      if (item.commentId === commentId) {
        item.beLike = !item.beLike
        return item
      }
      item.items.map(i => {
        if (i.commentId === commentId) {
          i.beLike = !i.beLike
          return item
        }
        return item
      })
      return item
    })
    likeComment({ framerId, commentId }).then(res=>{
      if (res.code === 200){
        setComments(commentList)
      }
    })
  }

  useEffect(() => {
    setFramerId(localStorage.getItem("framer_id") || "")
    loadComments()
  }, [])

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <span className="header_title">评论</span>
      </div>
      <CommentInput articleId={articleId} loadComment={loadComments} type="comment" />
      {/* 标题 */}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <span className="header_title">全部评论 {comments?.length}</span>
      </div>
      {/* 评论 */}
      <div>
        {comments?.map((comment1, index1) => {
          return (
            <div className={styles.first_comment} key={comment1.commentId}>
              <div style={{ flex: 1 }}>
                <Avatar
                  src={comment1.framerAvatar}
                  size="large"
                  icon={<UserOutlined />}
                  className={styles.comment_avatar}
                />
              </div>
              <div style={{ flex: 12 }}>
                <div style={{ display: "flex", width: "100%", justifyContent: 'space-between' }}>
                  <div className={styles.comment_name}>
                    {comment1.framerName}
                  </div>
                  <div className={styles.comment_date + " " + styles.comment_font_light}>
                    {dateDiff(comment1.commentDate)}
                  </div>
                </div>
                <div className={styles.comment_content}>
                  {comment1.content}
                </div>
                <div className={styles.comment_reply + " " + styles.comment_font_light}>
                  <div className={styles.comment_reply_item} onClick={() => changeLike(comment1.commentId)}>
                    {
                      comment1.beLike ?
                        (<div style={{ color: '#1e80ff' }}><LikeFilled />&nbsp;{comment1.beLikeCount}</div>)
                        :
                        (<><LikeOutlined />&nbsp;{comment1.beLikeCount}</>)
                    }

                  </div>
                  &emsp;
                  <div className={styles.comment_reply_item} onClick={(e) => { showReplyInput(comment1.commentId) }}>
                    <CommentOutlined /> {comment1.beReplyCount}
                  </div>
                  &emsp;
                  <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <EllipsisOutlined style={{ fontSize: '16px', lineHeight: '25px' }} />
                  </Dropdown>
                </div>
                {
                  comment1.commentId === replyCommentId ?
                    <CommentInput articleId={articleId} loadComment={loadComments} type="reply" replyCommentId={comment1.commentId} topCommentId={comment1.commentId} />
                    :
                    <></>
                }
                {comment1.items
                  ? comment1.items.map((comment2, index2) => {
                    return (
                      <div
                        className={styles.second_comment}
                        key={comment2.commentId}
                      >
                        {/* 头像 */}
                        <div style={{ flex: 1 }}>
                          <Avatar
                            src={comment2.framerAvatar}
                            icon={<UserOutlined />}
                            className={styles.comment_avatar}
                          />
                        </div>
                        <div style={{ flex: 12 }}>
                          <div style={{ display: "flex", width: "100%", justifyContent: 'space-between' }}>
                            {/* 名字 */}
                            <div className={styles.comment_name}>
                              {comment2.framerName}
                              {
                                comment2.replyFramerId !== '0' ?
                                  (<>
                                    <span className={styles.comment_font_light}>&ensp;回复&ensp;</span> {comment2.replyFramerName}
                                  </>)
                                  : ""
                              }
                            </div>
                            {/* 回复时间 */}
                            <div className={styles.comment_date + " " + styles.comment_font_light}>
                              {dateDiff(comment2.commentDate)}
                            </div>
                          </div>
                          {/* 回复内容 */}
                          <div className={styles.comment_content}>
                            {comment2.content}
                          </div>
                          <div className={styles.comment_reply + " " + styles.comment_font_light}>
                            <div className={styles.comment_reply_item} onClick={() => changeLike(comment2.commentId)}>
                              {
                                comment2.beLike ?
                                  (<><LikeFilled style={{ color: '#1e80ff' }} />&nbsp;</>)
                                  :
                                  (<><LikeOutlined />&nbsp;</>)
                              }
                              {comment2.beLikeCount}
                            </div>
                            &emsp;
                            <div className={styles.comment_reply_item} onClick={() => showReplyInput(comment2.commentId)}>
                              <CommentOutlined /> 回复
                            </div>
                            &emsp;
                            <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                              <EllipsisOutlined style={{ fontSize: '16px', lineHeight: '25px' }} />
                            </Dropdown>
                          </div>
                          {
                            comment2.commentId === replyCommentId ?
                              <CommentInput articleId={articleId} loadComment={loadComments} type="reply" replyCommentId={comment2.commentId} topCommentId={comment1.commentId} />
                              :
                              <></>
                          }
                        </div>
                      </div>
                    );
                  })
                  : null}
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}

export default Comment;
