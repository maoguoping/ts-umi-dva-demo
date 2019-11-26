import React from 'react'
import {Menu, Icon } from 'antd';
const { SubMenu } = Menu;
export interface SiderItem {
    value: string;
    label: string;
    children: any[];
  }
interface SideMenuProps {
    list: SiderItem[];
    defaultValue: string[];
    value: string[];
    onClick: (e: any) => void;
}
const SideMenu: React.FC<SideMenuProps> = props => {
    const {list, defaultValue, value} = props;
    const defaultOpen = defaultValue[0];
    const defaultSelect = defaultValue[1];
    console.debug('默认打开', defaultOpen)
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[defaultSelect]}
            defaultOpenKeys={[defaultOpen]}
            selectedKeys={value}
            style={{ height: '100%', borderRight: 0 }}
            onClick={props.onClick}
        >
            {
                list.length >0 && list.map((subItem: any) =>
                    <SubMenu
                        key={subItem.value}
                        title={
                            <span><Icon type={subItem.iconType} />{subItem.label}</span>
                        }
                    >
                        {
                            subItem.children.map((childrenItem: any) => 
                                <Menu.Item key={childrenItem.value}>
                                    {childrenItem.label}
                                </Menu.Item>
                            )
                        }
                    </SubMenu>
                )
            }
        </Menu>
    )
}
export default SideMenu;
