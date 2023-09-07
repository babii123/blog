/**
 * 获取数据的请求
 */
import requests from ".";
import { GetAritcleListModel, AuthorCardModel, TypeModel, ArticleInfoModel, DetailRelateModel, FramerInfoModel, ArticleCountModel, ArticleEditModel, FramerEditModel, ArticleDetailModel, CommentListModel } from "../model/ResponseModel";

// 获取文章总数
export const getArticleCount = (countUrl: string) => requests.get<number>(`${countUrl}`)
// 获取文章分类类型集合
export const getTypeList = () => requests.get<Array<TypeModel>>('/type')
// 获取文章
export const getAritcleList = (url: string, page: number, pageSize: number) => requests.get<Array<GetAritcleListModel>>(`${url}/${page}/${pageSize}`)
// 博客详情页，根据Id获取文章详情
export const getDetailInfo = (id: string) => {
      console.log("xxx");
      return requests.get<ArticleDetailModel>(`/article/getDetailInfo/${id}`)
}
// 获取博客详情页，作者卡片信息

export const getFramerCardInfo = (framer_i: string, framer_p: string) => requests.get<AuthorCardModel>(`/framer/getFramerCardInfo/${framer_i}/${framer_p}`)
// 文章详情页 获取是否点赞 收藏 关注
export const getRelateByFramerId = (framerId: string, beFramerId: string, articleId: string) => requests.get<DetailRelateModel>(`/article/getRelate/${framerId}/${beFramerId}/${articleId}`)

// 个人中心
// 个人中心 作者数据
export const getCenterInfo = (id: string) => requests.get<FramerInfoModel>(`/framer/getCenterInfo/${id}`)
// 个人中心 文章列表
export const getArticleListByFramerId = (framer_id: string) => requests.get<Array<ArticleInfoModel>>(`/article/center/${framer_id}`)
// 获取点赞 文章列表
export const getLikeListByFramerId = (framer_id: string) => requests.get<Array<ArticleInfoModel>>(`/like/getListByFramerId/${framer_id}`)
// 获取关注 用户列表
export const getFollowListByFramerId = (framer_id: string) => requests.get<Array<ArticleInfoModel>>(`/attention/getFollow/${framer_id}`)
// 获取被关注 用户列表
export const getBeFollowListByFramerId = (framer_id: string) => requests.get<Array<ArticleInfoModel>>(`/attention/getBeFollow/${framer_id}`)

// 获取文章统计
export const getCountAllByType = () => requests.get<ArticleCountModel>('/article/getCountByType')
// 获取文章统计 通过id
export const getCountAllByFramerId = (framerId: string) => requests.get<ArticleCountModel>(`/article/getCountAllByFramerId/${framerId}`)
// 获取个人资料编辑
export const getEditInfo = (framerId: string) => requests.get<FramerEditModel>(`/framer/getEditInfo/${framerId}`)
// 获取需要编辑的博客信息
export const getArticle = (articleId: string) => requests.get<ArticleEditModel>(`/article/getArticle/${articleId}`)

// 获取评论
export const getCommentByArticleId = (articleId: string) => requests.get<Array<CommentListModel>>(`/comment/${articleId}`)
