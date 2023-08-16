import React from "react";
import comments from "../data";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Row } from "antd";

const Comment: React.FC = () => {
  const showReplyInput = () => {
    console.log("");
  };
  return (
    <div>
      <Row style={{ margin: "2vh 1vw" }}>
        {comments.map((comment1, index1) => {
          return (
            <div className="first_comment" key={comment1.commentId}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    className="comment_avatar"
                  />
                </div>
                <div style={{ flex: 12 }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div className="comment_name">{comment1.name}</div>
                    <div className="comment_date">{comment1.replyTime}</div>
                  </div>
                  <div className="comment_content">{comment1.content}</div>
                  <div>
                    <div className="comment_reply" onClick={showReplyInput}>
                      <CommentOutlined />
                      回复
                    </div>
                  </div>
                  {comment1.items
                    ? comment1.items.map((comment2, index2) => {
                      return (
                        <div
                          className="second_comment"
                          key={comment2.commentId}
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ flex: 1 }}>
                              <Avatar
                                icon={<UserOutlined />}
                                className="comment_avatar"
                              />
                            </div>
                            <div style={{ flex: 12 }}>
                              <div style={{ display: "flex", width: "100%" }}>
                                <div className="comment_name">
                                  {comment2.name}
                                </div>
                                <div className="comment_date">
                                  {comment2.replyTime}
                                </div>
                              </div>
                              <div className="comment_content">
                                {comment2.content}
                              </div>
                              <div>
                                <div
                                  className="comment_reply"
                                  onClick={showReplyInput}
                                >
                                  <CommentOutlined />
                                  回复
                                </div>
                              </div>
                              {comment2.items
                                ? comment2.items.map((comment3, index3) => {
                                  return (
                                    <div
                                      className="third_comment"
                                      key={comment3.commentId}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <div style={{ flex: 1 }}>
                                          <Avatar
                                            size="small"
                                            icon={<UserOutlined />}
                                            className="comment_avatar"
                                          />
                                        </div>
                                        <div style={{ flex: 12 }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              width: "100%",
                                            }}
                                          >
                                            <div className="comment_name">
                                              {comment3.name}
                                            </div>
                                            <div className="comment_date">
                                              {comment3.replyTime}
                                            </div>
                                          </div>
                                          <div className="comment_content">
                                            {comment3.content}
                                          </div>
                                          <div>
                                            <div
                                              className="comment_reply"
                                              onClick={showReplyInput}
                                            >
                                              <CommentOutlined />
                                              回复
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                                : null}
                            </div>
                          </div>
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </Row>
    </div>
  );
}

export default Comment;
