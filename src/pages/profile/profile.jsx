import React from "react";
import { useGetProfile } from "../../service/query/useGetProfile";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Button, Flex, Spin, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const navigate = useNavigate();

  if (isLoading) return <Spin />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const updateLink = `/admin/update-profile`;
  const useUpdatePasswordLink = `/admin/update-password`;

  return (
    <Flex vertical align="center" justify="center" className="h-full">
      <Typography.Title level={2} className="text-center md:hidden">
        Profile
      </Typography.Title>

      <ProfileCard {...data} />

      <Flex justify="center" align="center" gap={20} className="mt-5">
        <Button
          size="middle"
          icon={<EditFilled />}
          type="primary"
          onClick={() => navigate(useUpdatePasswordLink)}
        >
          Parolni Yangilash
        </Button>
        <Button
          icon={<EditFilled />}
          type="primary"
          onClick={() => navigate(updateLink)}
          size="middle"
        >
          Profile Tahrirlash
        </Button>
      </Flex>
    </Flex>
  );
};
