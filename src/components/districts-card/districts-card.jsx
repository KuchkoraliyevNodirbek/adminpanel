import React from "react";
import { Button, Tooltip, Typography } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteDistricts } from "../../service/mutation/useDeleteDistrict";

const { Text } = Typography;

export const DistrictsCard = ({ category }) => {
  const { mutate: deleteCities, isLoading } = useDeleteDistricts();
  const role = loadState("user");

  const handleDelete = () => {
    deleteCities(category.id, {
      onSuccess: () => {
        toast.success(`${category.name.uz || "tuman"} o'chirildi`);
      },
      onError: () => {
        toast.error(`Tuman o'chirishda xato yuz berdi!`);
      },
    });
  };

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/update-district/${category.id}`
      : `/admin/update-district/${category.id}`;

  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm shadow-primary flex flex-col md:flex-row items-center justify-between w-full mb-4">
      <div className="w-full md:flex-1">
        {/* Category Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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

      {/* Action Buttons */}
      <div className="flex  space-x-14 mt-4 md:mt-0">
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
            loading={isLoading}
            onClick={handleDelete}
            disabled={isLoading}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </div>
    </div>
  );
};
