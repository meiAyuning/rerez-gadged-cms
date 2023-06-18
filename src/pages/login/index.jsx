import { Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import NDTitle from "@/components/NDTitle";
import NDButton from "@/components/NDButton";
import NDInputError from "@/components/NDInputError";
import AuthAPI from "@/api/user";
import { AuthenticationContext } from "@/context/authentication";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const { login, loading } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    console.log("login");
    console.log(loading);
    try {
      const { data } = await AuthAPI.login(values);
      login(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="login">
      <div className="form-wrapper">
        <NDTitle type="Page">Login</NDTitle>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: <NDInputError>Input email</NDInputError>,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: <NDInputError>Input password</NDInputError>,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <NDButton
              loading={loading}
              type="primary"
              htmlType="submit"
              className="secondary"
            >
              Signin
            </NDButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
