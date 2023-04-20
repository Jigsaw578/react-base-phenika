import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi hệ thống đang gặp sự cố"
            extra={
                <Button type="primary">
                    <Link to="/">Trở lại trang đăng nhập</Link>
                </Button>
            }
        />
    );
};

export default ErrorPage;