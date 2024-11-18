import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdminById } from "../../service/query/useGetUsersById";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Loading } from "../../components/loading/loading";

export const AdminDetailPage = () => {
  const { id } = useParams();
  const { data: admin, isLoading, error } = useGetAdminById(id);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <ProfileCard {...admin} />
    </>
  );
};
