import './style.scss'
import React, { useEffect } from 'react';
import { Form } from 'antd';
import './style.scss';
import loginSvg from '@/assets/animate/link.svg'
import LoginBox from '@/components/module/loginBox';
import { connect } from 'dva';
import { ConnectProps, ConnectState, Dispatch } from '@/models/connect';
interface LoginProps extends ConnectProps {
    auth: any;
    location: any;
    dispatch: Dispatch;
}
const WrapedLoginBox: any = Form.create({ name: 'normal_login' })(LoginBox);
const Login: React.FC<LoginProps> = props => {
    // const userInfo = props.userInfo;
    const { dispatch, auth } = props;
    const {from} = props.location.state || {from: {pathname: '/manageCenter/deviceList'}};
    function loginIn(data: any) {
        let {username, password} = data;
        console.debug('触发登陆');
        dispatch({
            type: 'auth/login',
            payload: {
                username
            },
        });
    }
    return (
        <div className="login-page">
            <div className="login-center-area">
                <div className="login-svg">
                    <img src={loginSvg}/>
                </div>
                <WrapedLoginBox loginIn={loginIn}></WrapedLoginBox>
            </div>
        </div>
    )
}
export default connect(({ auth }: ConnectState ) => ({
    auth
  }))(Login);