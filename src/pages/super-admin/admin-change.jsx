import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin";
import { Table, Tag, Button } from "antd";
import { Loading } from "../../components/loading/loading";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { toast } from "react-toastify";

export const AdminChange = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError, error } = useGetAllAdmin(limit, offset);
  const { mutate, error: deleteError, isPending } = useAdminDelete();

  if (isLoading) return <Loading />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  // Prepare data for table
  const superAdmins =
    data?.users?.filter((user) => user.role === "superadmin") || [];
  const admins = data?.users?.filter((user) => user.role === "admin") || [];
  const users = data?.users?.filter((user) => user.role === "user") || [];
  const allAdmins = [...superAdmins, ...admins, ...users];

  // Handle delete operation
  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Admin muvaffaqiyatli o'chirildi!");
      },
      onError: () => {
        toast.error(deleteError?.message);
      },
    });
  };

  // Define table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image_url",
      render: (text, record) => (
        <img
          src={record.image_url || "https://via.placeholder.com/80"}
          alt="Admin"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag
          color={
            role === "superadmin" ? "gold" : role === "admin" ? "blue" : "green"
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <div>
          <Button
            type="link"
            onClick={() => navigate(`/super-admin/detail-page/${id}`)}
          >
            View
          </Button>
          {record.role !== "superadmin" && (
            <Button danger onClick={() => handleDelete(id)} loading={isPending}>
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hamma Adminlar</h2>
      <Table
        columns={columns}
        dataSource={allAdmins}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};
