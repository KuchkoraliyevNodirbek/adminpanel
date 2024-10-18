import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin";
import { Table, Tag, Button, Tooltip } from "antd";
import { Loading } from "../../components/loading/loading";
import { useAdminDelete } from "../../service/mutation/useAdminDelete";
import { toast } from "react-toastify";

import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

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

  console.log(allAdmins);
  

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
      title: "Roli",
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
      title: "Harakatlar",
      dataIndex: "id",
      render: (id, record) => (
        <div className="space-x-5">
          <Tooltip title="Batafsil Ko'rish">

          <Button
            icon={<InfoCircleOutlined />}
            type="default"
            onClick={() => navigate(`/super-admin/detail-page/${id}`)}
            className="bg-blue-500 text-white"
          ></Button>
          </Tooltip>

          <Tooltip title="O'chirish">

          {record.role !== "superadmin" && (
            <Button
              onClick={() => handleDelete(id)}
              loading={isPending}
              className="bg-red-500 text-white"
            >
              <DeleteOutlined />
            </Button>
          )}
          </Tooltip>

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
        pagination={true}
      />
    </div>
  );
};
