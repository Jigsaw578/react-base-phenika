import { Button, Col, Divider, Form, Input, Row, Select, Space, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axiosInstance from "../../../shared/services/http-client";
import { Navigate, useNavigate } from "react-router";

const Content = styled.div`
    margin: 15px 16px;
    padding: 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius:10px;
    overflow: hidden;
    .ant-form-item .ant-input,.ant-form-item .ant-select{
        width: 299px;
        height: 36px;
    }
    button{
        width: 80px;
        height: 33px;
    }
    .ant-form-vertical .ant-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .ant-form-vertical .ant-form-item:last-child{
        padding-top: 10px
    }
`;
export default function AddDevice() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [status, setStatus] = useState('active')
    const [address, setAddress] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // event.preventDefault();
        try {
            const data = {
                data: {
                    name: name,
                    code: code,
                    status: status,
                    address: address,
                }
            }
            const response = await axiosInstance.post("/devices", data).catch((e) => {
                console.log(11, e);
                notification.error({
                    message: 'Lỗi',
                    description: `Lỗi ${e.response.data.error.details.errors[0].path} ${e.response.data.error.details.errors[0].message}.`,
                });
            })
            notification.success({
                message: 'Tạo thành công',
                description: `Tạo thành công ${response.data.attributes.name}.`,
            });
            navigate('/dashboard/users_list');

        } catch (error) {
            console.log(1111, error);
            notification.error({
                message: 'Không thể tạo',
                description: error.error.name,
            });
        }
    };
    const buttonStyle = {
        backgroundColor: '#8767E1',
        color: '#fff',
    };
    const handleGetCode = (e) => {
        setCode(e.target.value)
    };

    const handleGetName = (e) => {
        setName(e.target.value)
    };

    const handleGetStatus = (e) => {
        setStatus('active')
    };

    const handleGetAddress = (e) => {
        setAddress(e.target.value)
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Do something with the form data, such as submit to an API
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Content>
            <Form
                layout={'vertical'}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}

            >
                <Space >
                    <Form.Item name='code' label="Code" rules={[{ required: true, message: 'Please enter device code' }, {
                        pattern: /^([a-zA-Z]{3})_([0-9]{2})$/,
                        message: 'Hay nhap theo format XXX_YY voi YY la 2 so)'
                    }
                    ]}>
                        <Input placeholder="Enter device code"
                            onChange={handleGetCode}
                        />
                    </Form.Item>
                    <Form.Item name='name' label="Name" rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'string',
                            min: 6,
                        },
                    ]}>
                        <Input placeholder="Enter device name"
                            onChange={handleGetName}
                        />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Select
                            placeholder="Select a status"
                            options={[
                                {
                                    value: 'active',
                                    label: 'Active',
                                },
                                {
                                    value: 'inactive',
                                    label: 'Inactive',
                                },
                            ]}
                            defaultValue={'active'}
                            onChange={handleGetStatus}
                        />
                    </Form.Item>
                </Space>
                <Form.Item
                    name="intro"
                    label='Address'
                    rules={[{ required: true, message: 'Please input Intro' }]}
                    style={{ width: '100%', height: 120, paddingBottom: 10 }}
                >
                    <Input.TextArea style={{ width: '100%', height: 120 }} onChange={handleGetAddress} />
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Divider />
                        <Space>
                            <Button style={buttonStyle} htmlType="submit">Save</Button>
                            {contextHolder}
                            {/* <Button style={buttonStyle}>Save Fake</Button> */}
                            <Button >Cancel</Button>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </Content >
    )
}