import React from 'react';
import {Layout, Menu, Avatar, Dropdown} from 'antd';
import './style.scss'
const {Header} = Layout;
export interface HeaderBarProps {
    onChange: (e: any) => void;
    list: {
        value: string;
        label: string;
    }[];
    onLogout: () => void;
};
const HeaderBar: React.FC<HeaderBarProps>  = (props: HeaderBarProps) => {
    const { onChange, list } = props;
    const menu =  (
        <Menu onClick={chooseMenu}>
            <Menu.Item key="1">个人中心</Menu.Item>
            <Menu.Item key="2">设置</Menu.Item>
            <Menu.Item key="3">退出</Menu.Item>
        </Menu>
    );
    function chooseMenu(e: any) {
        const {key} = e;
        if (key === '3') {
            props.onLogout();
        }
    }
    return (
        <Header className="header">
            <div className="header-left">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                    onClick={onChange}
                >
                    {list.length > 0 && list.map((item: any) => <Menu.Item key={item.value}>{item.label}</Menu.Item>)}
                </Menu>
            </div>
            <div className="header-right user-info-box">
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                    <Avatar icon="user" className="avatar"/>
                </Dropdown>
            </div>
        </Header>
    )
}
export default HeaderBar;