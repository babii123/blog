/**
 * 创作者中心侧边栏
 * @returns 
 */
import type { MenuProps } from 'antd';
import { Menu, Button } from 'antd';
import { CreatorSideBarIcon } from '../../utils/icon'
import styles from '../../styles/creator.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
      type?: 'group',
): MenuItem {
      return {
            key,
            icon,
            children,
            label,
            type,
      } as MenuItem;
}

interface PropsModel {
      DefaultSelectedKeys: string[]
}

const items: MenuProps['items'] = [
      getItem('首页', 'sub1', <CreatorSideBarIcon type='icon-shouye' />),
      getItem('内容管理', 'sub2', <CreatorSideBarIcon type='icon-shuju9' />, [
            getItem('文章管理', '5'),
            getItem('专栏管理', '6'),
            getItem('沸点管理', '7'),
      ]),
      getItem('数据中心', 'sub3', <CreatorSideBarIcon type='icon-shuju1' />, [
            getItem('内容数据', '8'),
            getItem('粉丝数据', '9'),
      ]),

      getItem('创作工具', 'sub4', <CreatorSideBarIcon type='icon-chuangzuo' />, [
            getItem('文章导入发布', '10'),
      ]),
      getItem('帮助中心', 'sub5', <CreatorSideBarIcon type='icon-changjianwentixiangguanwenti2' />, [
            getItem('常见问题', '11'),
      ])
];

const MenuKeyPath = {
      'sub1': '/creator/home',
      '5': '/creator/content/article/essays?status=all',
      '6': '/creator/content/column?status=all',
      '7': '/creator/content/pins?status=all',
      '8': '/creator/data/content/article/entire',
      '9': '/creator/data/follower/data',
      '10': '/creator/tool/import/self',
      '11': '/creator/help/question'
}

const SideBar: React.FC<PropsModel> = ({ DefaultSelectedKeys }) => {
      const router = useRouter()
      const onClick: MenuProps['onClick'] = (e) => {
            router.push(MenuKeyPath[e.key])
      };

      const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<Array<string>>(DefaultSelectedKeys)

      // useEffect(() => {
      //       // 获取地址
      //       console.log('sideBar', DefaultSelectedKeys);
      //       // setDefaultSelectedKeys()
      // }, [])

      return (
            <div className={styles.sidebar}>
                  <Button type="primary" className={styles.sendButton}>写文章</Button>
                  <Menu
                        onClick={onClick}
                        style={{ fontSize: '16px', fontWeight: '500' }}
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={['sub2', 'sub3', 'sub4', 'sub5']}
                        mode="inline"
                        items={items}
                  />
            </div>
      );
};

export default SideBar;