import { Row } from "antd";
import { Layout } from "../../components/layout";
import { EmployeeForm } from "../../components/custom/employeeForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectorUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees/employees";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const CreateEmployee = () => {
  const [error, setError] = React.useState("");
  const user = useAppSelector(selectorUser);
  const navigate = useNavigate();
  const [addEmployee] = useAddEmployeeMutation();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const onCreateEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
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
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={onCreateEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
