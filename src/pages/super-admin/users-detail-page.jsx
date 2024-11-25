import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAdminById } from "../../service/query/useGetUsersById";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Loading } from "../../components/loading/loading";
import { Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const AdminDetailPage = () => {
  const { id } = useParams();
  const { data: admin, isLoading, error } = useGetAdminById(id);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex vertical gap={24}>
      <Flex>
        <Button
          onClick={() => navigate(-1)}
          type="primary"
          icon={<ArrowLeftOutlined />}
        >
          Orqaga
        </Button>
      </Flex>
      <ProfileCard {...admin} />
    </Flex>
  );
};
