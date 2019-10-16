import React from 'react'
import './style.scss'
import { Result, Button } from 'antd'
import { withRouter } from 'react-router';
import router from 'umi/router';
const NotFound: React.FC<{}> = () => {
    function back () :void{
        router.goBack();
    }
    return (
        <div className="not-found-page">
            <Result
                status="404"
                title="404"
                subTitle="抱歉, 您访问的页面不存在."
                extra={<Button type="primary" onClick={back}>返回</Button>}
            />
        </div>
    )
}
export default withRouter(NotFound);