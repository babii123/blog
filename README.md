# blog
博客项目，仿掘金
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 运行
First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## 更多

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

- 文本编辑器：[ByteMd](https://bytemd.js.org/)
- 实时聊天：注意前后端适配问题，``socket.io``
```xml
//后：
<dependency>
    <groupId>com.corundumstudio.socketio</groupId>
    <artifactId>netty-socketio</artifactId>
    <version>1.7.11</version>
</dependency>
```
```json
//前：
"socket.io-client": "^2.4.0"
```
- UI组件库：[ant-design](https://ant.design/components)
- 图表 
```json
"echarts": "^5.4.2",
"echarts-for-react": "^3.0.2",
```
- 控制全局弹出登录框
```json
"@ebay/nice-modal-react": "^1.2.10"
```

## 项目功能解析图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9392b94b8b944d284be54ef908e8515~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1324&h=1294&s=750056&e=png&b=ffffff)

## 功能展示图
### 首页
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c98387af3ad24fe5a2d927f0fa10fa83~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=175079&e=png&b=fcfcfc)
### 详情页
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b44963b109fe422e9f064b074879ec3a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=233613&e=png&b=fcfcfc)
### 评论区
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60aa14fc71f74514be46aae692ab7a07~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=132032&e=png&b=fbfbfb)
### 博客发表
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa1588cf4456473da5eeaee93b7b03f1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=90570&e=png&b=fefefe)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b43b3db389c445b595c30dc789c79c02~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=98282&e=png&b=8b8b8b)
### 发布成功页

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8837276b64134c868f2fed9b33091410~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=83827&e=png&b=fbfbfb)

### 个人中心 | 文章列表展示 | 关注列表展示
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ceb5b0daefb4a1b911d4fb43aebaa7c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=186965&e=png&b=fbfbfb)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65daf77ed2eb4ca7a27e750b97335aad~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=185396&e=png&b=fcfcfc)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d02b9db73ce4b52b384cf317463bf35~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=204799&e=png&b=fcfcfc)
### 编辑个人信息

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78b1b8e30e9b4d879f68ac355a8065e4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=79247&e=png&b=fcfcfc)
### 私信
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7656352461444f049c6c3b6439eee86c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=166068&e=png&b=fbfbfb)
### 创作者中心(有很多页面就不都展示了)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9472b751acfa42338b1c3db28180a563~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=149981&e=png&b=fbfbfb)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc477700bd5b4e49940cb90eadbd3138~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=123997&e=png&b=fcfcfc)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e63c1fa223d45259297d32934411f65~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=924&s=125122&e=png&b=fcfcfc)




