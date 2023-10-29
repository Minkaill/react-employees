import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "./input";
import { ErrorMessage } from "../error";
import { CustomButton } from "./button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput placeholder="FirstName" type="text" name="firstName" />
        <CustomInput placeholder="LastName" type="text" name="lastName" />
        <CustomInput placeholder="Age" type="number" name="age" />
        <CustomInput placeholder="Address" type="text" name="address" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
