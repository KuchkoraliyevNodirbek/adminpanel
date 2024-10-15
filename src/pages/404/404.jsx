import React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge"; // Foydalanuvchi ma'lumotlarini olish uchun

export const NotFoundPage = () => {
  const user = loadState("user"); // localStorage-dan foydalanuvchini olish
  const userRole = user?.role;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500 p-4">
      <h1 className="text-8xl font-extrabold text-white mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl font-semibold text-white mb-8">Sahifa topilmadi</p>
      <p className="text-lg text-white mb-8 text-center">Siz qidirayotgan sahifa mavjud emas.</p>

      {userRole === 'admin' ? (
        <Link to="/admin" className="text-blue-200 underline text-lg hover:text-blue-400 transition-all py-2 px-4 bg-gray-800 rounded-md">
          Admin paneliga o'tish
        </Link>
      ) : userRole === 'superadmin' ? (
        <Link to="/super-admin" className="text-blue-200 underline text-lg hover:text-blue-400 transition-all py-2 px-4 bg-gray-800 rounded-md">
          Super Admin paneliga o'tish
        </Link>
      ) : (
        <Link to="/" className="text-blue-200 underline text-lg hover:text-blue-400 transition-all py-2 px-4 bg-gray-800 rounded-md">
          Kirish sahifasiga o'tish
        </Link>
      )}
    </div>
  );
};

