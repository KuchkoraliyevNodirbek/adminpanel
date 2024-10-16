import React, { useState } from "react";
import { PhoneNumberInput } from "../phone-number-card/phone-number-card"; // Telefon raqami input komponentini import qilish

export const EditProfileCard = ({
  formData,
  handleFileChange,
  handleChange,
  handleSubmit,
  uploading,
}) => {
  const [previewImage, setPreviewImage] = useState(null); // Tanlangan rasmni oldindan ko'rish uchun state

  // Fayl o'zgarishini kuzatish va oldindan ko'rish
  const onFileChange = (e) => {
    handleFileChange(e); // Original fayl o'zgarishi funksiya chaqiriladi
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Tanlangan rasmning URL-ni saqlash
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-1">Profilni Yangilash</h1>
      <div className="max-w-2xl mx-auto p-3 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tanlangan rasmni oldindan ko'rish */}
          {previewImage ? (
            <div className="flex justify-center mb-3">
              <img
                src={previewImage}
                alt="Tanlangan rasm"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
            </div>
          ) : (
            formData.image_url && (
              <div className="flex justify-center mb-3">
                <img
                  src={formData.image_url}
                  alt="Profil rasmi"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                />
              </div>
            )
          )}
          <div>
            <label className="font-medium">Profil rasmi yuklash:</label>
            <input
              type="file"
              name="image"
              onChange={onFileChange} // Fayl o'zgarishini kuzatish
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label className="font-medium">Ism:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Familiya:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label className="font-medium">Tug'ilgan sana:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          {/* Telefon raqami inputini joylashtirish */}
          <PhoneNumberInput
            value={formData.phone_number}
            onChange={(newValue) =>
              handleChange({ target: { name: "phone_number", value: newValue } })
            }
          />
          <div>
            <label className="font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-3"
              required
            />
          </div>

          {uploading && <div>Rasm yuklanmoqda...</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 w-1/2"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
