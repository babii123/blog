/**
 * @description 编辑文章
 */
import { useEffect, useState } from 'react';
import { Col, Row, Input, Button, Select, Modal, message } from 'antd';
import { nanoid } from 'nanoid'
import { getArticle, editArticle } from '../../../config/getRequest';
import { useRouter } from 'next/router';
// import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import 'bytemd/dist/index.css'
// import 'github-markdown-css'
import 'highlight.js/styles/vs.css'
// placed after highlight styles to override `code` padding
import 'katex/dist/katex.css'
import { Editor, Viewer } from '@bytemd/react'

const { TextArea } = Input;

let mode = 'auto'
let localeKey = 'en'
let maxLength: number

// const plugins = [
// gfm(),
// Add more plugins here
// ]

function stripPrefixes(obj: Record<string, any>) {
      return Object.entries(obj).reduce((p, [key, value]) => {
            p[key.split('/').slice(-1)[0].replace('.json', '')] = value
            // console.log(p)
            return p
      }, {} as Record<string, any>)
}


let enabled = {
      breaks: false,
      frontmatter: true,
      gemoji: true,
      gfm: true,
      highlight: true,
      math: true,
      'medium-zoom': true,
      mermaid: true,
}
const plugins = [
      enabled.breaks && breaks(),
      enabled.frontmatter && frontmatter(),
      enabled.gemoji && gemoji(),
      enabled.gfm && gfm(),
      enabled.highlight && highlight(),
      enabled.math && math(),
      enabled['medium-zoom'] && mediumZoom(),
      enabled.mermaid &&
      mermaid(),
].filter((x) => x)

const create: React.FC = () => {
      // 文章id
      const [articleId, setArticleId] = useState("");
      // 文章标题
      const [title, setTitle] = useState("用例标题")
      // 文章内容
      const [value, setValue] = useState("文章内容");
      // 文章简介
      const [intro, setIntro] = useState("内容简介");
      // 文章分类
      const [type, setType] = useState("6809635626879549454");
      // 控制弹窗
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const router = useRouter()
      useEffect(() => {
            const a = location.href.split("/")
            const id1 = a[a.length - 1]
            // getArticle(id1).then(res => {
            //       if (res.code === 200) {
            //             console.log(res.data);
            //             setArticleId(res.data.id)
            //             setTitle(res.data.title)
            //             setValue(res.data.articleContent)
            //             setIntro(res.data.introduce)
            //             setType(res.data.typeId)
            //       } else {
            //             console.log("获取失败edit", res);
            //       }
            // })
      }, [])

      const showModal = () => {
            setIsModalOpen(true);
      };

      const handleOk = () => {
            setConfirmLoading(true);
            let obj = {
                  id: articleId,
                  typeId: type,
                  framerId: localStorage.getItem("framer_id"),
                  title: title,
                  articleContent: value,
                  introduce: intro,
                  addTime: null,
                  updateTime: null,
                  viewCount: 0,
                  likeCount: 0,
                  collectCount: 0,
                  commentCount: 0
            }
            console.log(obj);
            // editArticle(obj).then(res => {
            //       if (res.code === 200) {
            //             message.success("修改成功")
            //       } else {
            //             message.error("修改失败")
            //             console.log("修改文章失败：", res);
            //       }
            // })
            setTimeout(() => {
                  setIsModalOpen(false);
                  setConfirmLoading(false);
            }, 2000);
      };

      const handleCancel = () => {
            setIsModalOpen(false);
      };

      const changeType = (value) => {
            setType(value)
      };

      // const changeIntro = (value) => {
      //       setI(value)
      // };

      return (
            <>
                  <Row style={{ overflowY: 'hidden' }}>
                        <Col span={12}>
                              <Input placeholder="请输入文章标题..." bordered={false}
                                    style={{ fontSize: '24px', lineHeight: '56px', marginLeft: '10px' }}
                                    value={title}
                                    onChange={(e) => {
                                          setTitle(e.target.value);
                                    }} />
                        </Col>
                        <Col span={12}>
                              <div>
                                    <Button type="primary" size="large" onClick={showModal} style={{ position: 'fixed', right: '25px', top: '10px' }}>发 布</Button>
                                    <Modal title="填写信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
                                          <div>分类： </div>
                                          <Select
                                                size="large"
                                                value={type}
                                                onChange={changeType}
                                                style={{ width: 200 }}
                                                options={[
                                                      { value: '6809635626661445640', label: 'IOS' },
                                                      { value: '6809635626879549454', label: 'Android' },
                                                      { value: '6809637767543259144', label: '前端' },
                                                      { value: '6809637769959178254', label: '后端' },
                                                      { value: '6809637771511070734', label: '开发工具' },
                                                      { value: '6809637772874219534', label: '阅读' },
                                                      { value: '6809637773935378440', label: '人工智能' },
                                                ]}
                                          />
                                          <div>简介： </div>
                                          <TextArea
                                                value={intro}
                                                onChange={(e) => setIntro(e.target.value)}
                                                placeholder="请输入简介..."
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                          />
                                    </Modal>
                              </div>
                        </Col>
                  </Row>
                  <Editor
                        value={value}
                        plugins={plugins}
                        onChange={(v) => {
                              setValue(v)
                        }}
                  />
            </>
      )
}

export default create;