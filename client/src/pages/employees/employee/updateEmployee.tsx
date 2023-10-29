import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/layout";
import React from "react";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../../app/services/employees/employees";
import { Row } from "antd";
import { EmployeeForm } from "../../../components/custom/employeeForm";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { Paths } from "../../../paths";
import { Employee } from "@prisma/client";

export const UpdateEmployee = () => {
  const navigate = useNavigate();

  const { id } = useParams<string>();
  const { data, isLoading } = useGetEmployeeQuery(id || "");

  const [updateEmployee] = useEditEmployeeMutation();
  const [error, setError] = React.useState("");

  if (isLoading) return <span>Загрузка</span>;

  const onUpdate = async (employee: Employee) => {
    try {
      await updateEmployee({ ...data, ...employee }).unwrap();
      navigate(`${Paths.status}/updated`);
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
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={onUpdate}
        />
      </Row>
    </Layout>
  );
};
