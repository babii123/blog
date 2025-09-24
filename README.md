# blog
## 全栈个人博客系统
一个自主设计并实现的全栈个人博客系统，采用前后端分离架构，涵盖了从文章创作、发布、检索到用户认证的全流程功能。
#### **项目概述**

#### **技术架构与职责**

**1. 前端部分**
*   **技术栈**：`React 18` + `TypeScript` + `Ant Design`
*   **核心实现**：
    *   使用 `React Router` 实现前端路由，构建单页面应用（SPA），提供流畅的用户交互体验。
    *   采用 `TypeScript` 进行开发，通过静态类型检查显著提升了代码的健壮性和可维护性。
    *   对文章列表、评论等模块进行了组件化封装，实现了高内聚低耦合的代码结构。

**2. 后端部分**
*   **核心框架**：`Spring Boot`
*   **安全与认证**：集成 `Spring Security` + `JWT`（JSON Web Token），实现了完善的**用户登录、注册、权限控制**（如管理员与普通用户的权限分离）。
*   **数据持久层**：使用 `Spring Data JPA` 简化 `MySQL` 数据库操作，提升了开发效率。同时集成 `H2` 数据库作为测试环境，便于进行单元测试。
*   **全文检索**：集成 `Elasticsearch`，实现了对博客文章的**全文检索**功能，支持关键词高亮、相关性排序，大幅提升了内容的可发现性。
*   **文件服务**：
    *   **技术选型**：独立部署了一个基于 `Spring Boot` 和 `MongoDB` 的**文件微服务**，专门处理图片的上传、存储和访问。
    *   **工作流程**：博客主服务接收到图片上传请求后，通过内部 API 调用文件服务，文件服务将文件元信息存入 `MongoDB`，文件本身存储在服务器磁盘（或云存储），并返回可访问的 URL。

#### **项目亮点与难点**
*   **亮点一：模块化与微服务思想**：将文件服务独立出来，体现了模块化设计和微服务架构的思想，降低了系统耦合度。
*   **亮点二：技术栈全面且现代**：涵盖了主流的前后端技术、搜索引擎、安全框架，展示了扎实的全栈开发能力。
*   **难点攻克**：
    *   **`Spring Security` 配置**：成功配置了复杂的认证与授权流程，实现了动态权限管理。
    *   **`Elasticsearch` 数据同步**：解决了博客文章在创建或更新后，如何与 `Elasticsearch` 索引库保持实时同步的问题（如使用 `Logstash` 或 Spring 事件机制）。
    *   **前后端联调与部署**：解决了跨域问题，并成功将前后端应用部署到服务器（如 Docker 化部署）。
---

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




