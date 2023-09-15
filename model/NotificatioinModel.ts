export interface LinkManInfoModel {
      friendId: string,
      userName: string,
      avatar: string,
      needInit: number,
      placeTop: number
}

export interface LinkManModel {
      friendId: string,
      userName: string,
      avatar: string,
      //免打扰
      needInit: number,
      // 置顶
      placeTop: number,
      // 最近的一条消息
      recentTime: string,
      // 最近一条消息的内容
      recentMsg: string,
      // 未读的数量
      unreadCount: number,
}

export interface ChatContentModel {
      id: number,
      senderId: string,
      receiverId: string,
      messageType: number,
      messageContent: string,
      sendTime: Date,
      status: number,
}