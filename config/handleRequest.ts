import requests from ".";
import { RootObject } from "../model/rootObject";
import { AddArticleParam, CommentParam, LikeCommentParam, LoginParams, PrivateMsgLinkManParam, PrivateMsgParam, RegisterParam, ReplyParam } from "../model/ParamsModel";
import { LoginResponse, GetAritcleListModel, AuthorCardModel, PrivateMsg } from "../model/ResponseModel";


// 用户登录
export const userLogin = (data: LoginParams) => requests.post<LoginResponse>('/login', data)// 用户注册
export const userRegister = (data: RegisterParam) => requests.post<LoginResponse>('/register', data)

// 文章点赞
export const clickLike = (framerId: string, articleId: string) => requests.get<boolean>(`/like/clickLike/${framerId}/${articleId}`)
// 文章收藏
export const clickCollect = (framerId: string, articleId: string) => requests.get(`/collect/clickCollect/${framerId}/${articleId}`)
// 关注作者
export const clickAttention = (framerId: string, beFramerId: string) => requests.get(`/attention/clickFollow/${framerId}/${beFramerId}`)
// 新增文章
export const addArticle = (data: AddArticleParam) => requests.post(`/article/addArticle`, data)
// 编辑个人资料
export const updateEditInfo = (data: any) => requests.post('/framer/updateEditInfo', data)
// 删除博客
export const delArticle = (articleId: string) => requests.delete<boolean>(`/article/delArticle/${articleId}`)
// 编辑博客
export const editArticle = (data: AddArticleParam) => requests.post('/article/updateArticle', data)
// 发布评论(直接评论文章)
export const commentArticle = (data: CommentParam) => requests.post("/comment/commentArticle", data)
// 回复别人的评论
export const replyComment = (data: ReplyParam) => requests.post("/comment/replyComment", data)
// 点赞评论
export const likeComment = (data: LikeCommentParam) => requests.get(`/comment/like/${data.framerId}/${data.commentId}`)
// 私信:发消息
export const sendPrivateMsg = (data: PrivateMsgParam) => requests.post<PrivateMsg>(`/private_msg/sendPrivateMsg`, data)
// 私信： 添加一位联系人关系
export const addPrivateMsgLinkMan = (data: PrivateMsgLinkManParam) => requests.post("/private_msg_link_man/insertLinkMan",data)