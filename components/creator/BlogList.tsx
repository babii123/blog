import { Skeleton, List, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import React, { useState } from 'react';

const data = [
      {
            title: 'SSM框架技术',
            updateTime: '2023-05-09 21:49',
            viewCount: 32,
            likeCount: 0,
            commentCount: 0,
            collectCount: 0
      },
      {
            title: 'Ant Design Title 2',
            updateTime: '2023-05-09 21:49',
            viewCount: 32,
            likeCount: 0,
            commentCount: 0,
            collectCount: 0
      },
      {
            title: 'Ant Design Title 3',
            updateTime: '2023-05-09 21:49',
            viewCount: 32,
            likeCount: 0,
            commentCount: 0,
            collectCount: 0
      },
      {
            title: 'Ant Design Title 4',
            updateTime: '2023-05-09 21:49',
            viewCount: 32,
            likeCount: 0,
            commentCount: 0,
            collectCount: 0
      },
];

const items: MenuProps['items'] = [
      {
            key: '1',
            label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        编辑
                  </a>
            ),
      },
      {
            key: '2',
            label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        删除
                  </a>
            ),
      },
];

type PaginationPosition = 'top' | 'bottom' | 'both';
type PaginationAlign = 'start' | 'center' | 'end';

const BlogList: React.FC = () => {
      const [loading, setLoading] = useState(false)
      const [position, setPosition] = useState<PaginationPosition>('bottom');
      const [align, setAlign] = useState<PaginationAlign>('center');
      return (
            <List
                  size='large'
                  pagination={{
                        onChange: (page) => {
                              console.log(page);
                        },
                        pageSize: 3,
                        position: 'bottom',
                        align: 'center'
                  }}
                  dataSource={data}
                  renderItem={(item) => (
                        <List.Item>
                              <Skeleton avatar title={false} loading={loading} active>
                                    <List.Item.Meta
                                          title={<a href="https://ant.design" style={{ fontSize: '16px', fontWeight: '400' }}>{item.title}</a>}
                                          description={<div>{item.updateTime}<Divider type='vertical' />{item.viewCount}阅读 · {item.likeCount}点赞 · {item.commentCount}评论 · {item.collectCount}收藏</div>}
                                    />
                                    {/* <div>content</div> */}
                                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                          <EllipsisOutlined style={{ fontSize: '25px', fontWeight: 700 }} />
                                    </Dropdown>
                              </Skeleton>
                        </List.Item>
                  )}
            />
      );
}

export default BlogList;