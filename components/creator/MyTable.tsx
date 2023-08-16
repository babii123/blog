import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
      key: string;
      title: string;
      createTime: string;
      showCount: number;
      viewCount: number;
      likeCount: number;
      commentCount: number;
      collectCount: number;
}

const columns: ColumnsType<DataType> = [
      {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
      },
      {
            title: '发布时间',
            dataIndex: 'createTime',
            key: 'createTime',
      },
      {
            title: '展现数',
            dataIndex: 'showCount',
            key: 'showCount',
      },
      {
            title: '阅读数',
            dataIndex: 'viewCount',
            key: 'viewCount',
      },
      {
            title: '点赞数',
            dataIndex: 'likeCount',
            key: 'likeCount',
      },
      {
            title: '评论数',
            dataIndex: 'commentCount',
            key: 'commentCount',
      },
      {
            title: '收藏数',
            dataIndex: 'collectCount',
            key: 'collectCount',
      },
      Table.EXPAND_COLUMN,
];

const data: DataType[] = [
      {
            key: '1',
            title: '1',
            createTime: '1',
            showCount: 1,
            viewCount: 1,
            likeCount: 1,
            commentCount: 1,
            collectCount: 1
      }
];

const MyTable: React.FC = () => <Table columns={columns} dataSource={data}
      expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.title}</p>,
      }} />;

export default MyTable;