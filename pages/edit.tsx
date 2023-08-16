import { Row, Col, Menu } from 'antd';
import { useState } from 'react';
import Header from '../components/other/Header';
import Charts from '../components/edit/Charts';
import Form from '../components/edit/Form';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

// function getItem(label, key, icon, children) {
//       return {
//             key,
//             icon,
//             children,
//             label,
//       };
// }
function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
): MenuItem {
      return {
            key,
            icon,
            children,
            label,
      } as MenuItem;
}
const items: MenuProps['items'] = [
      getItem('修改个人信息', '1'),
      getItem('文章分类统计', '2'),
];

const Edit: React.FC = () => {
      const [isKey, setIsKey] = useState<string>('1')
      const handleClick = ({ item, key }) => {
            setIsKey(key)
      }
      return (
            <>
                  <Header></Header>
                  <div style={{ padding: '1vh 15vw' }}>
                        <Row>
                              <Col span={6}>
                                    <Menu
                                          style={{
                                                width: 256,
                                                height: '87vh',
                                                borderRadius: '4px'
                                          }}
                                          defaultSelectedKeys={[isKey]}
                                          mode="inline"
                                          theme='light'
                                          items={items}
                                          onClick={handleClick}
                                    />
                              </Col>
                              <Col span={18} style={{
                                    height: '87vh',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff'
                              }}>
                                    {/* 修改表单 */}
                                    {/* 文章分类统计 */}
                                    {
                                          isKey === '1' ? <Form /> : <Charts></Charts>
                                    }
                              </Col>
                        </Row>
                  </div>
            </>


      );
};
export default Edit;