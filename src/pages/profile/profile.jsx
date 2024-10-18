import React from "react";
import { useGetProfile } from "../../service/query/useGetProfile"; // Profil ma'lumotlarini olish hooki
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/profile-card/profile-card";
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";
import { Button } from "antd";

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const navigate = useNavigate();

  if (isLoading) return <Loading/>
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const role = loadState("user")

  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/update-profile`
      : `/admin/update-profile`;



  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Profil</h1>

      <ProfileCard {...data} />

      <div className="mt-6 text-center">
        <Button
        type="primary"
          className="p-5 text-white rounded-md w-full max-w-lg min-w-20"
          onClick={() => navigate(updateLink)}
        >
          Profilni Tahrirlash
        </Button>
      </div>
    </>
  );
};
