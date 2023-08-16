/**
 * @Description 创作者中心-创作工具-文章的导入和发布
 */

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Card } from 'antd';

import React, { useState } from 'react';

const { Dragger } = Upload;

const tabListNoTitle = [
      {
            key: 'auto',
            tab: '自助导入发布',
      },
];

const props: UploadProps = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
            }
      },
      onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
      },
};

const ToolImportSelf: React.FC = () => {
      const [activeTabKey2, setActiveTabKey2] = useState<string>('auto');

      const onTab2Change = (key: string) => {
            setActiveTabKey2(key);
      };

      return (
            <Card
                  style={{ width: '100%' }}
                  tabList={tabListNoTitle}
                  activeTabKey={activeTabKey2}
                  onTabChange={onTab2Change}
            >
                  <Dragger {...props}>
                        <div style={{ height: '400px', margin: 'auto', paddingTop: '150px', boxSizing: 'border-box' }}>
                              <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click or drag file to this area to upload</p>
                              <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                    banned files.
                              </p>
                        </div>
                  </Dragger>
            </Card>
      );
};

export default ToolImportSelf;