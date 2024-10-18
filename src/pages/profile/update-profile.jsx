import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../service/query/useGetProfile";
import { useUpdateProfile } from "../../service/mutation/useUpdateProfile";
import { EditProfileCard } from "../../components/edit-profile-card/edit-profile-card";
import { toast } from "react-toastify";
import { useUploadFile } from "../../service/mutation/useUploadFile"; // Custom hook for file upload

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const { mutate } = useUpdateProfile();

  const { uploading, uploadFile } = useUploadFile(); // Custom hook for file upload

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    image_url: "", // Boshqa joyga URL saqlash
  });

  const [selectedFile, setSelectedFile] = useState(null); // Yuklangan faylni saqlash

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        date_of_birth: data.date_of_birth || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        image_url: data.image_url || "", // Eskirgan profil rasmini ko'rsatish
      });
    }
  }, [data]);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Faylni holatda saqlash
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      // Agar yangi fayl yuklangan bo'lsa, uni yuklash va URL ni olish
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile);
      }

      // FormData ga URL ni qo'shamiz
      const updatedFormData = {
        ...formData,
        image_url: imageUrl, // Yuklangan URL'ni qo'shish
      };

      await updateProfile.mutateAsync(updatedFormData, {
        onSuccess: () => {
          toast.success("Profil o'zgartirildi!");
        },
      });

      navigate(-1); // Sahifani orqaga qaytarish
    } catch (error) {
      console.error("Yangilanishda xato:", error);
    }
  };

  return (
    <EditProfileCard
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      uploading={uploading}
    />
  );
};
