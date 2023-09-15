/**
 * 响应数据类型
 */

export interface LoginResponse {
      token: string,
      framerImg: string,
      framerId: string
}

export interface GetAritcleListModel {
      id: string,
      typeName: string,
      framerId: string,
      framerName: string,
      title: string,
      introduce: string,
      updateTime: string,
      likeCount: number,
      commentCount: number
      viewCount: number
}

export interface AuthorCardModel {
      isAttention: boolean,
      beLiked: number,
      beViewed: number
}

export interface TypeModel {
      id: string,
      key: string,
      label: string
}

export interface ArticleInfoModel {
      id: string,
      typeName: string,
      framerId: string,
      framerName: string,
      title: string,
      introduce: string,
      updateTime: Date,
      viewCount: number,
      likeCount: number,
      commentCount: number
}

export interface ArticleDetailModel {
      id: string,
      title: string,
      framerId: string,
      framerName: string,
      framerAvatar: string,
      content: string,
      updateTime: string,
      viewCount: number,
      likeCount: number,
      commentCount: number,
      collectCount: number,
}

export interface DetailRelateModel {
      isAttention: boolean,
      isLike: boolean,
      isCollect: boolean
}

export interface FramerInfoModel {
      framerName: string,
      framerAvatar: string,
      introduce: string,
      registerTime: Date,
      beViewed: number,
      beLiked: number,
      followCount: number,
      beFollowCount: number,
      collectionSet: number
}

export interface ArticleCountModel {
      ai: number,
      article: number,
      freebie: number,
      backend: number,
      frontend: number,
      android: number,
      ios: number
}

export interface ArticleEditModel {
      id: string,
      title: string,
      articleContent: string,
      typeId: string,
      introduce: string,
}

export interface FramerEditModel {
      framerId: string,
      name: string,
      email: string,
      phone: string,
      introduce: string,
}

export interface CommentListModel {
      commentId: number,
      framerId: string,
      framerName: string,
      framerAvatar: string,
      content: string,
      commentDate: number,
      beReplyCount: number,
      beLikeCount: number,
      beLike: boolean,
      items: Array<CommentItem>
}

export interface CommentItem{
      commentId: number,
      framerId: string,
      framerName: string,
      framerAvatar: string,
      content: string,
      commentDate: number,
      replyCommentContent: string,
      replyFramerId: string,
      replyFramerName: string,
      beReplyCount: string,
      beLikeCount: string
      beLike: boolean
}

export interface PrivateMsg{
      id: number,
      senderId: string,
      receiverId: string,
      messageType: number,
      messageContent: string,
      sendTime: Date,
      status: number,
}

export interface AttentionFramerModel{
      framerId: string,
      framerAvatar: string,
      framerName: string,
      introduce: string
}