import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Added InfoCircleOutlined import
import { useDeleteTranslator } from "../../service/mutation/useDeleteTranslator";

const { Text } = Typography;

export const TranslatorCard = ({ translator }) => {
  const { mutate: deleteTranslator, isPending } = useDeleteTranslator();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => setIsModalVisible(true);

  const handleDelete = () => {
    deleteTranslator(translator.id, {
      onSuccess: () => {
        toast.success(
          `${translator.name?.uz || "Translator"} deleted successfully`
        );
        setIsModalVisible(false);
      },
      onError: () => {
        toast.error("Error occurred while deleting translator!");
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => setIsModalVisible(false);

  const updateLink = `/admin/translator-update/${translator.id}`;

  return (
    <div className="p-4 bg-accent rounded-lg  shadow-sm shadow-dark flex flex-row items-center justify-between w-full">
      <div className="w-full md:flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <Text className="text-lg">{translator?.name || "N/A"}</Text>
          <Text className="text-lg">{translator?.surname || "N/A"}</Text>
        </div>
      </div>

      <Flex gap={24} className="mt-4 md:mt-0">
        <Tooltip title="Tahrirlash">
          <Link to={updateLink}>
            <Button
              className="bg-yellow-500 hover:bg-yellow-700"
              type="primary"
              icon={<EditOutlined />}
            />
          </Link>
        </Tooltip>

        <Tooltip title="O'shirish">
          <Button
            type="default"
            loading={isPending}
            onClick={showDeleteConfirm}
            disabled={isPending}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </Flex>

      <Modal
        title="Oʻchirishni tasdiqlang"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <p>
          {`${translator?.name} ${translator?.surname}`} tarjimonni o'chirishni
          tasdiqlaysizmi?
        </p>
      </Modal>
    </div>
  );
};
