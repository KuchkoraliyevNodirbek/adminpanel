import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteDistricts } from "../../service/mutation/useDeleteDistrict";

const { Text } = Typography;

export const DistrictsCard = ({ category }) => {
  const { mutate: deleteDistricts, isPending } = useDeleteDistricts();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    deleteDistricts(category.id, {
      onSuccess: () => {
        toast.success(`${category.name.uz || "tuman"} o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        toast.error(`Tuman o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateLink = `/admin/update-district/${category.id}`;

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
            onClick={showDeleteConfirm}
            disabled={isPending}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </Flex>

      <Modal
        title="O'chirishni tasdiqlash"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <Text>{`${category.name.uz} tumani` || "tuman"} o'chirilsinmi?</Text>
      </Modal>
    </div>
  );
};
