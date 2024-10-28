import React, { useState } from "react";
import { Pagination, List, Tag, Button, Tooltip, Modal, Card } from "antd";
import { Loading } from "../../components/loading/loading";
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { toast } from "react-toastify";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

export const AllUsers = () => {
  const [limit, setLimit] = useState(10); // Har bir sahifadagi foydalanuvchilar soni
  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa
  const offset = (currentPage - 1) * limit; // Offset hisoblash
  const { data, isLoading, isError, error } = useGetAllAdmin(limit, offset);
  const { mutate, error: deleteError, isPending } = useAdminDelete();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate()

  if (isLoading) return <Loading />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const users = data?.users?.filter((user) => user.role === "user") || [];
  const totalCount = data?.count || 0; // Umumiy foydalanuvchilar soni

  console.log(totalCount);
  console.log(users.length);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    mutate(deleteId, {
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
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Hamma Foydalanuvchilar
      </h2>
      <List
        grid={{ gutter: 10, xs: 1, sm: 1, md: 1, lg: 1, column: 1 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card className="border-dark">
              <div className="flex gap-5 justify-center items-center flex-wrap md:justify-between space-x-4">
                <div className="flex gap-5 md:gap-20 items-center flex-col md:flex-row">
                  <img
                    src={user.image_url || "https://via.placeholder.com/80"}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover"
                  />
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
                <div className="max-w-48 min-w-48 text-center md:text-start">
                  <p className="font-bold text-xs md:text-base">{user.email}</p>
                </div>
                <div className="flex space-x-5 w-fit">
                  <Tooltip title="Batafsil Ko'rish">
                    <Button
                      icon={<InfoCircleOutlined />}
                      type="default"
                      onClick={() =>
                        navigate(`/super-admin/detail-page/${user.id}`)
                      }
                      className="bg-blue-500 text-white"
                    />
                  </Tooltip>
                  {user.role !== "superadmin" && (
                    <Tooltip title="O'chirish">
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(user.id)}
                        loading={isPending}
                        className="bg-red-500 text-white"
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Sahifani yangilash
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Sahifa o'lchamini o'zgartirish
            setCurrentPage(1); // Sahifani 1 ga qaytarish
          }}
          showQuickJumper // Tez sahifa o'zgartirish imkoniyati
        />
      </div>

      {/* Confirmation Modal */}
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
    </div>
  );
};
