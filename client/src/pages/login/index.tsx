import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/custom/password";
import { CustomInput } from "../../components/custom/input";
import { CustomButton } from "../../components/custom/button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import React from "react";
import { ErrorMessage } from "../../components/error";

export const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const onLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (err) {
      const isError = isErrorWithMessage(err);
      if (isError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={onLogin}>
            <CustomInput placeholder="Email" name="email" type="email" />
            <PasswordInput placeholder="Password" name="password" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <Space size="large" direction="vertical">
            <Typography.Text>
              Нет аккаунта?
              <Link style={{ marginLeft: "4px" }} to={Paths.register}>
                Зарегистрируйтесь
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
