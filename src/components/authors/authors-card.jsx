import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex, message } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { authorsDetailLink, authorsUpdateLink } from "../../routes/paths";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { authorsEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const AuthorsCard = ({ author }) => {
  const { mutate: deleteAuthor, isPending } = useDeleteById(
    authorsEndPoints.delete,
    authorsEndPoints.list
  );
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteAuthor(author.id, {
      onSuccess: () => {
        setConfirmVisible(false);
        message.success(`${author.name || "Muallif"} o'chirildi`);
      },
      onError: () => {
        setConfirmVisible(false);
        message.error("Muallifni o'chirishda xato yuz berdi!");
      },
    });
  };

  return (
    <div className="p-4 bg-accent rounded-lg border shadow-sm shadow-dark flex flex-col gap-4 md:flex-row items-center justify-between w-full">
      <div className="w-full md:flex-1">
        <Text className="text-lg text-start">{`${author.name} ${author.surname}`}</Text>
      </div>

      <Flex gap={24}>
        <Tooltip title="Batafsil ko'rish">
          <Link to={authorsDetailLink(author.id)}>
            <Button
              className="bg-blue-500 text-white"
              type="default"
              icon={<InfoCircleOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="Tahrirlash">
          <Link to={authorsUpdateLink(author.id)}>
            <Button
              className="bg-yellow-500 hover:bg-yellow-700"
              type="primary"
              icon={<EditOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="O'chirish">
          <Button
            type="default"
            loading={isPending}
            onClick={() => setConfirmVisible(true)}
            disabled={isPending}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </Flex>

      <Modal
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <Text>Muallifni o'chirishni tasdiqlaysizmi?</Text>
      </Modal>
    </div>
  );
};
