import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom/button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees/employees";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
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

  return (
    <Layout>
      <CustomButton
        onClick={null as any}
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
        rowKey={(record) => record.id}
        onRow={(record) => {
          return { onClick: () => navigate(`${Paths.employee}/${record.id}`) };
        }}
      />
    </Layout>
  );
};
