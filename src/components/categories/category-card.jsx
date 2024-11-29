import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex, message } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { CategoryDetailLink, categoryUpdateLink } from "../../routes/paths";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { categoriesEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const CategoryCard = ({ category }) => {
  const { mutate: deleteCategory, isPending } = useDeleteById(
    categoriesEndPoints.delete,
    categoriesEndPoints.list
  );

  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        setConfirmVisible(false);
        message.success(`${category.name.uz} Kategoriya o'chirildi`);
      },
      onError: () => {
        message.error(`Kategoriya o'chirishda xato yuz berdi!`);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <div className="p-4 bg-accent rounded-lg border shadow-sm shadow-dark flex flex-col md:flex-row items-center justify-between w-full">
      <div className="w-full md:flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Text className="text-lg text-start">
            {category.name.uz || "N/A"}
          </Text>
          <Text className="text-lg text-start">
            {category.name.en || "N/A"}
          </Text>
          <Text className="text-lg text-start">
            {category.name.ru || "N/A"}
          </Text>
        </div>
      </div>

      <Flex gap={24} className="mt-4 md:mt-0">
        <Tooltip title="Batafsil ko'rish">
          <Link to={CategoryDetailLink(category.id)}>
            <Button
              className="bg-blue-500 text-white"
              type="default"
              icon={<InfoCircleOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="Tahrirlash">
          <Link to={categoryUpdateLink(category.id)}>
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
        okButtonProps={{ loading: isPending }}
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={handleDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <Text>Kategoriyani o'chirishni tasdiqlaysizmi?</Text>
      </Modal>
    </div>
  );
};
