import React, { useState } from "react";
import { Card, Avatar, Button, Typography, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const formatPhoneNumber = (phone) => {
  if (!phone) return "Ma'lumot yo'q";
  // Telefon raqamini to'g'ri formatda ko'rsatish
  return phone.replace(
    /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    "$1 $2-$3-$4-$5"
  );
};

export const ProfileCard = ({
  date_of_birth,
  email,
  first_name,
  last_name,
  phone_number,
  image_url,
  role,
}) => {
  const [copyMessage, setCopyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modalni boshqarish uchun state

  const handleCopyPhoneNumber = () => {
    navigator.clipboard
      .writeText(phone_number)
      .then(() => {
        setCopyMessage(`${phone_number}`);
        setTimeout(() => setCopyMessage(""), 1000); // 1 soniyadan so'ng xabarni tozalash
      })
      .catch(() => {
        setCopyMessage("Nusxalashda xatolik yuz berdi.");
      });
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Modalni ochish
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Modalni yopish
  };

  return (
    <Card className="max-w-sm md:max-w-lg lg:max-w-2xl mx-auto p-0 md:p-3 shadow-md shadow-primary rounded-md">
      <div className="flex flex-col items-center mb-6">
        <Avatar
          src={image_url || "http://via.placeholder.com/128"}
          size={128}
          onClick={handleImageClick} // Bosganda modal ochiladi
          className="hover:scale-125 transition-all duration-300 border-4 border-primary cursor-zoom-in"
        />
        <Title level={2} className="text-center text-xl md:text-2xl">
          {first_name} {last_name}
        </Title>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 items-center border p-3 rounded-md">
          <Text strong>Roli:</Text>
          <Text className="text-gray-700">{role}</Text>
        </div>
        <div className="flex gap-3 items-center border p-3 rounded-md relative">
          <Text strong>Tel:</Text>
          <div className="flex items-center justify-between flex-grow">
            <Text className="text-gray-700">
              {formatPhoneNumber(phone_number)}
            </Text>
          </div>
          <Button
            onClick={handleCopyPhoneNumber}
            type={copyMessage ? "primary" : "default"}
            className="absolute top-1 right-1 "
          >
            {copyMessage ? <CheckOutlined /> : <CopyOutlined />}
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center border p-3 rounded-md">
          <Text strong>Email:</Text>
          <Text className="text-gray-700">{email || "Ma'lumot yo'q"}</Text>
        </div>
        <div className="flex gap-3 items-center border p-3 rounded-md">
          <Text strong>Tug'ilgan sana:</Text>
          <Text className="text-gray-700">
            {date_of_birth || "Ma'lumot yo'q"}
          </Text>
        </div>
      </div>

      {/* Modal rasmni to'liq ko'rsatish */}
      <Modal
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        closeIcon={
          <span className="text-white bg-red-500 w-full rounded">
            <CloseOutlined />
          </span>
        } // Custom close icon
      >
        <img
          src={image_url || "http://via.placeholder.com/128"}
          alt="Profile"
          className="w-full object-cover" // Bir xil o'lcham
        />
      </Modal>
    </Card>
  );
};
