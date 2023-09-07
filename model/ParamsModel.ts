/**
 * 发送请求的参数类型
 */

export interface LoginParams {
      nameOrEmailOrPhone: string,
      password: string,
}

export interface RegisterParam {
      id: string,
      name: string,
      img_path: null,
      introduce: null,
      registerTime: null,
      password: string,
      email: string,
      phone: string,
      recentTime: null
}

export interface CommentParam{
      articleId: string,
      framerId: string,
      content: string
}

export interface ReplyParam{
      articleId: string,
      framerId: string,
      content: string,
      replyCommentId: number,
      topCommentId: number
}

export interface LikeCommentParam{
      framerId: string,
      commentId: number
}