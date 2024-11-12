import React, { useState } from "react";
import { Button, Tooltip, Typography, Modal } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"; // Added InfoCircleOutlined import
import { useDeleteTranslator } from "../../service/mutation/useDeleteTranslator";

const { Text } = Typography;

export const TranslatorCard = ({ translator }) => {
  const { mutate: deleteTranslator, isLoading } = useDeleteTranslator();
  const role = loadState("user"); // Fetch user role from local storage
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show modal to confirm deletion
  const showDeleteConfirm = () => setIsModalVisible(true);

  // Handle deletion of a translator
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

  // Close the delete confirmation modal
  const handleCancel = () => setIsModalVisible(false);

  // Determine the update link based on role
  const updateLink =
    role?.role === "superadmin"
      ? `/super-admin/translator-update/${translator.id}`
      : `/admin/translator-update/${translator.id}`;

  // Define the detail link based on role
  const detailLink =
    role?.role === "superadmin"
      ? `/super-admin/translator-detail/${translator.id}`
      : `/admin/translator-detail/${translator.id}`;

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm flex flex-col md:flex-row items-center justify-between w-full mb-4">
      <div className="w-full md:flex-1">
        {/* Translator Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <Text className="text-lg">{translator?.name || "N/A"}</Text>
          <Text className="text-lg">{translator?.surname || "N/A"}</Text>
          <Text className="text-lg">{translator?.phone || "N/A"}</Text>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        {/* View Detail Button */}
        <Tooltip title="View Details">
          <Link to={detailLink}>
            <Button
              className="bg-blue-500 text-white"
              type="default"
              icon={<InfoCircleOutlined />}
            />
          </Link>
        </Tooltip>

        {/* Edit Button */}
        <Tooltip title="Edit">
          <Link to={updateLink}>
            <Button
              className="bg-yellow-500 hover:bg-yellow-700"
              type="primary"
              icon={<EditOutlined />}
            />
          </Link>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip title="Delete">
          <Button
            type="default"
            loading={isLoading}
            onClick={showDeleteConfirm}
            disabled={isLoading}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ loading: isLoading }}
      >
        <p>
          Are you sure you want to delete{" "}
          {translator.name?.uz || "this translator"}?
        </p>
      </Modal>
    </div>
  );
};
