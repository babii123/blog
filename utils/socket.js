/**
 * 私聊与服务端建立连接的工具类
 */
import io from 'socket.io-client';

export var socket;
export function init(framer_id) {
      console.log(framer_id);

      socket = io(`http://localhost:9092?userId=${framer_id}`, {
            reconnection: false, //关闭自动重连
      });

      // 连接成功
      socket.on("connect", () => {
            console.log(socket.id, '监听客户端连接成功-connect');
      })
      // 断开连接
      socket.on("disconnect", (reason) => {
            console.log(socket.connected);
            console.log("断开连接-disconnect", reason);
      })
      // 错误
      socket.on("error", (err) => {
            console.log("错误-error", err);
      })
      // 连接错误
      socket.on("connect_error", (err) => {

            console.log("连接错误-connect_error", err);
      });
      // 连接超时
      socket.on("connect_timeout", (data) => {
            console.log("连接超时-connect_timeout", data);
      });
      // 重连成功
      socket.on("reconnect", (attemptNumber) => {
            // 重连尝试次数
            console.log("重连成功-reconnect", attemptNumber)
      });
      // 尝试重连时触发
      socket.on("reconnect_attempt", (attemptNumber) => {
            // 重连尝试次数
            console.log("尝试重连-reconnect_attempt", attemptNumber)
      });
      // 在尝试重新连接时触发
      socket.on("reconnecting", (attemptNumber) => {
            // 重连尝试次数
            console.log("正在尝试重连-reconnecting", attemptNumber)
      });
      // 重连尝试错误
      socket.on("reconnect_error", (err) => {
            err
            console.log(socket.connected);
            console.log("重连尝试错误-reconnect_error");
      });
      // 客户端不能重连时触发
      socket.on("reconnect_failed", () => {
            console.log("客户端不能连接-reconnect_failed")
      });
      // 当一个ping被发送到服务器时触发
      socket.on("ping", () => {
            console.log("一个ping发送到服务器-ping")
      });

      // 当服务器收到pong时触发
      socket.on("pong", (data) => {
            // data: 延迟多少ms
            console.log("服务器收到pong-pong", data);
      });

      // 发送消息到服务器
      socket.emit('chat', 'Hello, Server!', () => {
            console.log('hhhh');
      });

      console.log("初始化");
}