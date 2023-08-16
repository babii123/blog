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
            label: '哪些因素会影响你文章的曝光',
            children: <p>{text}</p>,
      },
      {
            key: '2',
            label: '推荐规则是什么',
            children: <p>{text}</p>,
      },
      {
            key: '3',
            label: '什么样的文章会被推荐',
            children: <p>{text}</p>,
      },
];

const ContentQuestion: React.FC = () => {
      const onChange = (key: string | string[]) => {
            console.log(key);
      };

      return <Collapse items={items} onChange={onChange} />;
};

export default ContentQuestion;