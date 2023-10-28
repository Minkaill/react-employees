import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/custom/password";
import { CustomInput } from "../../components/custom/input";
import { CustomButton } from "../../components/custom/button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={() => console.log("Success!")}>
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
