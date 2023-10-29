import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/custom/password";
import { CustomInput } from "../../components/custom/input";
import { CustomButton } from "../../components/custom/button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useRegisterMutation } from "../../app/services/auth/auth";
import { useAppSelector } from "../../app/hooks";
import { selectorUser } from "../../features/auth/authSlice";
import React from "react";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const [error, setError] = React.useState("");
  const [register] = useRegisterMutation();
  const user = useAppSelector(selectorUser);
  const navigate = useNavigate();

  const onRegister = async (data: RegisterData) => {
    try {
      await register(data).unwrap();
      navigate("/login");
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
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={onRegister}>
            <CustomInput placeholder="Name" name="name" />
            <CustomInput placeholder="Email" name="email" type="email" />
            <PasswordInput placeholder="Password" name="password" />
            <PasswordInput placeholder="Password" name="confirmPassword" />
            <CustomButton type="primary" htmlType="submit">
              Зарегистироваться
            </CustomButton>
          </Form>
          <Space size="large" direction="vertical">
            <Typography.Text>
              Уже зарегистированы?
              <Link style={{ marginLeft: "4px" }} to={Paths.login}>
                Войдите
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
