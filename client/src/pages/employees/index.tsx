import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom/button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees/employees";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectorUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const onAddEmployee = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton
        onClick={onAddEmployee}
        type="primary"
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data}
        pagination={false}
        scroll={{ y: 440 }}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return { onClick: () => navigate(`${Paths.employee}/${record.id}`) };
        }}
      />
    </Layout>
  );
};
