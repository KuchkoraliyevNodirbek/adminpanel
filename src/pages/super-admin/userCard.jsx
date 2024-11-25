import React, { useState } from "react";
import { Button, Tag, Tooltip, Modal, Card, Flex } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/LogoIcon";

export const UserCard = ({ user }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { mutate, error: deleteError, isPending } = useAdminDelete();
  const navigate = useNavigate();

  const handleDelete = () => {
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    mutate(user.id, {
      onSuccess: () => {
        toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        toast.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <Flex align="center" wrap gap={24}  className="border border-dark p-2 rounded-md bg-accent justify-center  md:justify-between">
      {/* <div className="flex gap-5 justify-center items-center flex-wrap md:justify-between"> */}

        <div className="flex gap-5 md:gap-20 items-center flex-col md:flex-row">
          {user.image_url ? (
            <img
              src={user.image_url}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-dark"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-dark flex items-center justify-center bg-primary p-2">
              <LogoIcon />
            </div>
          )}
          <Tag
            className="mx-auto"
            color={
              user.role === "superadmin"
                ? "gold"
                : user.role === "admin"
                ? "blue"
                : "green"
            }
          >
            {user.role.toUpperCase()}
          </Tag>
        </div>
        <Flex wrap gap={24} className="w-full max-w-3xl justify-center md:justify-normal">
          <p className="font-semibold text-xs md:text-base">{`${
            user?.first_name || "Ism: kiritilmagan"
          } ${user?.last_name || "Familiya: kiritilmagan"}`}</p>
          <p className="font-bold text-xs md:text-base">{user?.email || "email: kiritilmagan"}</p>
          
        </Flex>
        <div className="flex space-x-5 w-fit">
          <Tooltip title="Batafsil Ko'rish">
            <Button
              icon={<InfoCircleOutlined />}
              type="default"
              onClick={() => navigate(`/admin/detail-page/${user.id}`)}
              className="bg-blue-500 text-white"
            />
          </Tooltip>
          {user.role !== "superadmin" && (
            <Tooltip title="O'chirish">
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={isPending}
                className="bg-red-500 text-white"
              />
            </Tooltip>
          )}
        </div>
      {/* </div> */}

      <Modal
        title="O'chirishni tasdiqlang"
        visible={confirmVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <p>Foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </Flex>
  );
};
