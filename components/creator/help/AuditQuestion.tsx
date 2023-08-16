import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
      {
            key: '1',
            label: '为什么会有安全审核',
            children: <p>{text}</p>,
      },
      {
            key: '2',
            label: '什么样的内容需要审核',
            children: <p>{text}</p>,
      },
      {
            key: '3',
            label: '有几种常见的审核状态',
            children: <p>{text}</p>,
      },
];

const AuditQuestion: React.FC = () => {
      const onChange = (key: string | string[]) => {
            console.log(key);
      };

      return <Collapse items={items} onChange={onChange} />;
};

export default AuditQuestion;