import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss'
interface LoginBoxProps {
    form: any;
    loginIn: (values: any) => void;
}
const LoginBox: React.FC<LoginBoxProps> = props =>{
    const { getFieldDecorator } = props.form;
    function handleSubmit (e: any) {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
          if (!err) {
            console.log('Received values of form: ', values);
            props.loginIn(values);
          }
        });
    };
    return (
        <div className="login-box">
            <div className="login-title-box">
                <h5>React Study Demo</h5>
            </div>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)}
                    <a className="login-form-forgot">
                        忘记密码
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a>马上注册!</a>
                </Form.Item>
            </Form>
        </div>
    )
}
export default React.memo(LoginBox);