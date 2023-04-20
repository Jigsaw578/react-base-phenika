import React, { useEffect, useState } from "react";
import {
  theme,
  Col,
  Row,
  Button,
  Space,
  Input,
  Form,
  Select,
  DatePicker,
  List,
  Typography,
  Checkbox,
  Table,
  message,
} from "antd";
import { DeleteOutlined, EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../shared/services/http-client";
import FormItem from "antd/es/form/FormItem";
import Search from "antd/es/transfer/search";
import icon from "../../../assets/images/Delete.png";
import Item from "antd/es/list/Item";

const onSearch = (value) => console.log(value);
const CreateUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };




  const buttonStyle = {
    backgroundColor: "#8767E1",
    color: "#fff",
  };

  const PathName = styled.p`
    margin: 10px 25px 0px 20px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 32px;
    color: #111111;
  `;

  const Content = styled.div`
    margin: 10px 15px;
    padding: 18px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  `;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);
  const [deviceNames, setDeviceNames] = useState([]);
  const [search, setSearch] = useState('');






  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleDelete = (record) => {
    setCheckedList(checkedList.filter((item) => item.value !== record.value));
  };

  // const valueList = checkedList.map((item) => item.value);


  const onFinish = (values) => {
    const data = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      dob: values.dob,
      phoneNumber: values.phonenumber,
      gender: values.gender,
      password: values.password,
      role: parseFloat(values.role),
      blocked: values.status

    };
    console.log(values);
    axiosInstance
      .post("/users", data)
      .then((response) => {
        if (response != null) {

          navigate("users_list")
          // logOut()
          message.success("Succes");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Some thing wrong");
      });
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axiosInstance.get(`/devices?filters[name][$contains]=${search}`);
        if (response.data) {
          setDeviceNames(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, [search]);
  const plainOptions = deviceNames.map((device) => ({
    label: device.attributes.code,
    value: device,
  }));


  return (
    <>
      <PathName>Add New User</PathName>
      <Content>
        <Col>
          <Row>
            <Col
              span={24}
              style={{
                flexGrow: 1,
              }}
            >
              <Form
                id="myForm"
                name="basic"
                layout="vertical"
                // initialValues={{
                //   remember: true,
                // }}
                autoComplete="off"
                onFinish={onFinish}
              >
                <Row>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="Name"
                      name="fullname"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner Name!",
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner Name"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please input owner Email!",
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner email"
                        id="email"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="UserName"
                      name="username"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner UserName!",
                        },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner username"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner Password!",
                        },
                        {
                          pattern: new RegExp(
                            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
                          ),
                          message:
                            " Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
                        },
                      ]}
                    >
                      <Input.Password
                        size="default size"
                        placeholder="Enter owner Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Phone number"
                      name="phonenumber"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner PhoneNumber!",
                        },
                        { min: 9 },
                        { pattern: /^\d+$/, message: 'Please enter numbers only', },
                      ]}
                    >
                      <Input
                        size="default size"
                        placeholder="Enter owner email"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner Gender!",
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select owner Gender"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "male",
                            label: "Male",
                          },
                          {
                            value: "female",
                            label: "Female",
                          },
                          {
                            value: "other",
                            label: "Other",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    <FormItem
                      label="DOB"
                      name="dob"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner DOB!",
                        },
                      ]}
                    >
                      <DatePicker


                        size="default size"
                        style={{ width: "100%" }}
                        picker="date"
                        placeholder="Chose date of birth"
                      />
                    </FormItem>
                  </Col>
                  <Col span={8} style={{ paddingRight: 16 }}>
                    {" "}
                    <FormItem
                      label="Role"
                      name="role"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner Role!",
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select owner Role"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: 1,
                            label: "Guest",
                          },
                          {
                            value: 2,
                            label: "User",
                          },
                          {
                            value: 3,
                            label: "Amin",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FormItem
                      label="Status"
                      name="status"
                      rules={[
                        {
                          required: true,

                          message: "Please input owner Status!",
                        },
                      ]}
                    >
                      <Select
                        size="default size"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder=" Select owner Status"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: false,
                            label: "Active",
                          },
                          {
                            value: true,
                            label: "Inactive",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>

                  <Col span={24}>
                    <FormItem label="Devices" name="Devices" rules={[{}]}>
                      <Row style={{ border: "1px solid #dcd2d2" }}>
                        <Col
                          span={12}
                          style={{
                            padding: "10px 10px 10px 10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Input
                            placeholder="input search text"

                            size="default size"
                            onChange={handleSearch}
                          />

                          {/* <List
                            style={{
                              height: 150,
                              overflowY: "auto",
                            }}
                            bordered
                            dataSource={items}
                            renderItem={(item) => (
                              <List.Item>
                                <Checkbox.Group  onChange>
                                  <Checkbox>{item.attributes.name}</Checkbox>
                                  {console.log(item.attributes)}
                                </Checkbox.Group>
                              </List.Item>
                            )}
                          /> */}
                          <List
                            style={{
                              height: 130,
                              overflowY: "auto",
                            }}
                            dataSource={plainOptions}
                            renderItem={(item) => (
                              <List.Item>
                                <Checkbox
                                  value={item.value}
                                  checked={checkedList.some((o) => o.value === item.value)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCheckedList([...checkedList, item]);
                                    } else {
                                      setCheckedList(checkedList.filter((o) => o.value !== item.value));
                                    }
                                  }}
                                >
                                  {item.label}
                                </Checkbox>
                              </List.Item>
                            )}
                          />
                        </Col>

                        <Col
                          span={12}
                          style={{
                            borderLeft: "1px solid #dcd2d2",
                            padding: 10,
                          }}
                        >
                          <p style={{ fontWeight: "bold" }}>
                            Seclect Devices ({checkedList.length})
                          </p>
                          <Table
                            style={{
                              height: 130,
                              overflowY: "auto",
                            }}
                            pagination={{ hideOnSinglePage: true }}
                            dataSource={checkedList}
                            columns={[
                              {
                                dataIndex: 'label',
                                key: 'label',
                              },
                              {


                                render: (text, record) => (

                                  <img
                                    style={{
                                      float: "right"
                                    }}
                                    onClick={() =>
                                      handleDelete(record)
                                    }
                                    src={icon}
                                    className={""}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                ),
                              },
                            ]}



                          />
                          <div>

                          </div>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Row style={{ borderTop: "1px solid #dcd2d2" }}>
            <Space style={{ paddingTop: 10 }}>
              <Button
                block
                style={buttonStyle}
                form="myForm"
                key="submit"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  navigate("users_list");
                }}
              >
                Back
              </Button>
            </Space>
          </Row>
        </Col>
      </Content>
    </>
  );
};
export default CreateUser;
