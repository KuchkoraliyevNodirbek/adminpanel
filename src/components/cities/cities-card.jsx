import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal, Flex, message } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { citiesEndPoints } from "../../config/endpoints";

const { Text } = Typography;

export const CitiesCard = ({ category }) => {
  const { mutate: deleteCities, isPending } = useDeleteById(
    citiesEndPoints.delete,
    citiesEndPoints.list
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    deleteCities(category.id, {
      onSuccess: () => {
        message.success(`${category.name.uz} o'chirildi`);
        setIsModalVisible(false);
      },
      onError: () => {
        message.error(`shahar o'chirishda xato yuz berdi!`);
        setIsModalVisible(false);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateLink = `/admin/cities-update/${category.id}`;
  const detailLink = `/admin/cities-detail/${category.id}`;
  const addDistrictsLink = `/admin/create-district/${category.id}`;

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

      <Flex gap={24} className=" mt-4 md:mt-0">
        <Tooltip title="Yangi tuman qo'shish">
          <Link to={addDistrictsLink}>
            <Button type="primary" icon={<PlusOutlined />}></Button>
          </Link>
        </Tooltip>

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
            onClick={showDeleteConfirm}
            disabled={isPending}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </Flex>

      <Modal
        title="O'chirishni tasdiqlash"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ loading: isPending }}
      >
        <Text>{`${category.name.uz} shahri ` || "shahar"} o'chirilsinmi?</Text>
      </Modal>
    </div>
  );
};
