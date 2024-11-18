import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex } from "antd";
import { useDeleteAuthor } from "../../service/mutation/useDeleteAuthors";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export const AuthorsCard = ({ author }) => {
  const { mutate: deleteAuthor, isPending } = useDeleteAuthor();

  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteAuthor(author.id, {
      onSuccess: () => {
        toast.success(`${author.name || "Muallif"} o'chirildi`);
        setConfirmVisible(false);
      },
      onError: () => {
        toast.error(`Muallifni o'chirishda xato yuz berdi!`);
        setConfirmVisible(false);
      },
    });
  };

  const updateLink = `/admin/authors-update/${author.id}`;
  const detailLink = `/admin/authors-detail/${author.id}`;

  return (
    <div className="p-4 bg-accent rounded-lg border shadow-sm shadow-dark flex flex-col gap-4 md:flex-row items-center justify-between w-full">
      <div className="w-full md:flex-1">
        <Text className="text-lg text-start">{`${author.name} | ${author.surname}`}</Text>
      </div>

      <Flex gap={24}>
        <Tooltip title="Batafsil ko'rish">
          <Link to={detailLink}>
            <Button
              className="bg-blue-500 text-white"
              type="default"
              icon={<InfoCircleOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="Tahrirlash">
          <Link to={updateLink}>
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
        visible={confirmVisible}
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
