import { Space, Badge, Avatar, Divider } from "antd"
import { ArticleDetailModel } from "model/ResponseModel"
import { useState } from "react"
import { ArticleCardIconOtherColor, ArticleCardIcon } from "utils/icon"
import { processFormat } from "utils/numerProcess"
import { clickCollect, clickLike } from '../../config/handleRequest'


interface PropsModel {
      info: ArticleDetailModel,
}

export const ArticleSide: React.FC<PropsModel> = ({ info }) => {

      const [isLike, setIsLike] = useState<boolean>(false);
      const [isCollect, setIsCollect] = useState<boolean>(false);
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
      return (<>
            <div style={{ position: 'fixed', top: '20%', left: '4%' }}>
                  <Space size="large" direction="vertical">
                        <Badge count={processFormat(info?.likeCount)} overflowCount={10000000} color="#c2c8d1" >
                              <Avatar size={48} icon={
                                    isLike ? <ArticleCardIconOtherColor type='icon-dianzan' /> : <ArticleCardIcon type='icon-dianzan_kuai' />
                              } className="panelBtn" onClick={like} />
                        </Badge>
                        <Badge count={processFormat(info?.commentCount)} overflowCount={10000000} color="#c2c8d1">
                              <a href="#comment">
                                    <Avatar size={48} icon={<ArticleCardIcon type='icon-pinglun1' />} className="panelBtn" />
                              </a>
                        </Badge>
                        <Badge count={processFormat(info?.collectCount)} overflowCount={10000000} color="#c2c8d1">
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
      </>)
}