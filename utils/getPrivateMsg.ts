import { LinkManInfoModel, ChatContentModel, LinkManModel } from "model/NotificatioinModel"

export default async function getPrivateMsg(framer_id: string, participantId: string): Promise<{ linkManInfo: LinkManInfoModel, chatContentList: ChatContentModel[] }> {
      // 获取当前聊天对象的数据
      const res2 = await fetch(`http://localhost:8080/blog/private_msg_link_man/getLinkManInfo/${framer_id}/${participantId}`)
      const linkManInfo: LinkManInfoModel = (await res2.json()).data || undefined
      console.log(linkManInfo)

      // 获取聊天内容
      const res1 = await fetch(`http://localhost:8080/blog/private_msg/getHistoricalChat/${framer_id}/${participantId}`)
      const chatContentList: Array<ChatContentModel> = (await res1.json()).data || []

      // 将与这个用户的所有聊天记录都记录为已读
      const res3 = await fetch(`http://localhost:8080/blog/private_msg/setPrivateMsgRead/${framer_id}/${participantId}`)
      // if ((await res3.json()).data === false) {
      //       console.log("修改已读结果", (await res3.json()));
      // }
      return {
            linkManInfo,
            chatContentList,
      }
}

export async function getLinkList(framer_id: string, participantId: string): Promise<{ linkManList: Array<LinkManModel> }> {
      const res = await fetch(`http://localhost:8080/blog/private_msg_link_man/getLinkManList/${framer_id}/${participantId}`)
      console.log(`http://localhost:8080/blog/private_msg_link_man/getLinkManList/${framer_id}/${participantId}`);
      
      const linkManList: Array<LinkManModel> = (await res.json()).data || []
      return {linkManList};
}