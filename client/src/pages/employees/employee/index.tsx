import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../../app/services/employees/employees";
import { useAppSelector } from "../../../app/hooks";
import { selectorUser } from "../../../features/auth/authSlice";
import { Layout } from "../../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import { CustomButton } from "../../../components/custom/button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../../components/error";
import { Paths } from "../../../paths";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";

export const Employee = () => {
  const { id } = useParams<string>();
  const { data, isLoading } = useGetEmployeeQuery(id || "");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [removeEmployee] = useRemoveEmployeeMutation();
  const [error, setError] = React.useState("");

  const user = useAppSelector(selectorUser);
  const navigate = useNavigate();

  const onModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (isLoading) return <span>Загрузка</span>;

  if (!data) return <Navigate to="/" />;

  const onRemove = async () => {
    onModal();

    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <React.Fragment>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={onModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </React.Fragment>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={onRemove}
        onCancel={onModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника?
      </Modal>
    </Layout>
  );
};
