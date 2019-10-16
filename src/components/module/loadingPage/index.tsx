import { Spin } from 'antd'
import './style.scss'
import React from 'react'
const LoadingPage: React.FC = () => {
    return (
        <div className="page-loader loader-full">
            <Spin size="large" delay={200}></Spin>
        </div>
    )
}
export default LoadingPage