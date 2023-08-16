import requests from ".";
import { RootObject } from "../model/rootObject";
import { LoginParams, RegisterParam } from "../model/ParamsModel";
import { LoginResponse, GetAritcleListModel, AuthorCardModel } from "../model/ResponseModel";


// 用户登录
export const userLogin = (data: LoginParams) => requests.post<LoginResponse>('/login', data)// 用户注册
export const userRegister = (data: RegisterParam) => requests.post<LoginResponse>('/register', data)

// // 文章点赞
export const clickLike = (framerId: string, articleId:string) => requests.get<boolean>(`/like/clickLike/${framerId}/${articleId}`)
// // 文章收藏
export const clickCollect = (framerId: string, articleId: string) => requests.get(`/collect/clickCollect/${framerId}/${articleId}`)
// // 关注作者
export const clickAttention = (framerId: string, beFramerId: string) => requests.get(`/attention/clickFollow/${framerId}/${beFramerId}`)
// // 新增文章
export const addArticle = (data: any) => requests.post(`/article/addArticle`, data)
// // 编辑个人资料
export const updateEditInfo = (data: any) => requests.post('/framer/updateEditInfo', data)
// // 删除博客
export const delArticle = (articleId: any) => requests.delete<boolean>(`/article/delArticle/${articleId}`)
// // 编辑博客
export const editArticle = (data: any) => requests.post('/article/updateArticle', data)