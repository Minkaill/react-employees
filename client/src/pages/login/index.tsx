import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/custom/password";
import { CustomInput } from "../../components/custom/input";
import { CustomButton } from "../../components/custom/button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={() => console.log("Success!")}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
