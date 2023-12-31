import React, { useEffect, useState } from "react";
import { Avatar, Card, Button, Statistic, Divider } from "antd";
import { EyeFilled, LikeFilled } from '@ant-design/icons'

import styles from "../../styles/Author.module.scss";

import { ArticleCardIcon } from '../../utils/icon'
import { getFramerCardInfo } from "../../config/getRequest";
import { addPrivateMsgLinkMan, clickAttention } from "../../config/handleRequest";
import { AuthorCardModel } from "../../model/ResponseModel"
import Router from "next/router";
import { PrivateMsgLinkManParam } from "model/ParamsModel";

interface PropsModel {
  framerP: string,
  framerName: string,
  framerAvatar: string
}

const initInfo: AuthorCardModel = {
  isAttention: false,
  beLiked: 0,
  beViewed: 0,
}
const valueStyle = {
  fontSize: '14px',
  color: "#252933",
  fontWeight: 400
}

const iconStyle = {
  fontSize: '16px',
  color: '#7bb9ff',
  backgroundColor: '#e1efff',
  borderRadius: '50%',
  padding: '6px'
}


export default function Author(props: PropsModel) {
  const { framerP, framerName, framerAvatar } = props
  const [info, setInfo] = useState<AuthorCardModel>(initInfo);
  const [isAttention, setIsAttention] = useState<boolean>()
  const likeText = ""


  const getInfo = () => {
    const framerI = localStorage.getItem("framer_id") || ""
    getFramerCardInfo(framerI, framerP).then(res => {
      if (res.code === 200) {
        setInfo(res.data)
        setIsAttention(res.data.isAttention)
      } else {
        console.log("详情页卡片信息：" + res);
      }
    })
  }
  useEffect(() => {
    getInfo()
  }, [])
  // 点击关注
  const attention = () => {
    clickAttention(localStorage.getItem("framer_id") as string, framerP).then(res => {
      if (res.code === 200) {
        setIsAttention(!isAttention);
      } else {
        console.log("关注失败", res);
      }
    })
  }
  // 点击私信
  // const router = useRouter()
  const toPrivateMsg = () => {
    // 先为 联系人关系 入库，
    const params: PrivateMsgLinkManParam = {
      userId: localStorage.getItem("framer_id") || "",
      friendId: framerP,
      userName: framerName,
      avatar: framerAvatar,
      constatus: 0,
      needInit: 0,
      placeTop: 0
    }

    addPrivateMsgLinkMan(params).then(res => {
      console.log(res);
    })

    Router.push({ pathname: "/notification/im", query: { participantId: framerP } })
  }
  return (
    <Card style={{ marginBottom: '8px' }}>
      <div className={styles.authorInfoBlock}>
        <div className={styles.authorInfoBox}>
          <a href="" className={styles.authorLink}>
            <Avatar src={framerAvatar} size={48} style={{ marginRight: '8px' }} />
          </a>
          <div className={styles.authorNameBox} >
            <div className={styles.authorName}>
              {framerName}
            </div>
            <div className={styles.authorIntroduce}>
              <ArticleCardIcon type="icon-biaoqian" />&nbsp;
              每天都是努力的代码人！！
            </div>
          </div>
        </div>
        <div className={styles.authorInfoBox} style={{ marginTop: '5px' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            {
              isAttention ?
                <Button type="primary" block size={"large"} onClick={attention} style={{ backgroundColor: '#f2f3f5', color: '#8a919f' }}>已关注</Button>
                :
                <Button type="primary" block size={"large"} onClick={attention}>关注</Button>
            }
          </div>
          <div style={{ flex: 1 }}>
            <Button type="primary" ghost block
              size={"large"}
              style={{
                backgroundColor: '#f4f9ff',
                color: '#1e80ff',
                borderColor: '#b3d5ff'
              }}
              onClick={() => toPrivateMsg()}
            >私信</Button>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ marginBottom: '8px', display: 'flex' }}>
        <span style={{ flex: 1 }}>
          <LikeFilled style={iconStyle} />
        </span>
        <span style={{ flex: 6 }}>
          <Statistic prefix="获得点赞:" value={info.beLiked} valueStyle={valueStyle} />
        </span>
      </div>
      <div style={{ marginBottom: '8px', display: 'flex' }}>
        <span style={{ flex: 1 }}>
          <EyeFilled style={iconStyle} />
        </span>
        <span style={{ flex: 6 }}>
          <Statistic prefix="文章被阅读:" value={info.beViewed} valueStyle={valueStyle} />
        </span>
      </div>
    </Card>
  );
};