import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryById } from "../../service/query/useGetCAtegoryById"; // Kategoriyani ID bo'yicha olish uchun hook
import { Loading } from "../../components/loading/loading";
import { loadState } from "../../config/stroge";

export const CategoryDetailPage = () => {
  const { id } = useParams(); // URL dan id ni olish
  const { data: category, isLoading, error } = useGetCategoryById(id); // ID orqali kategoriya ma'lumotini olish

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  console.log(category);

  const user = loadState("user");

  const updateLink =
    user.role === "superadmin"
      ? `/super-admin/categories-update/${category.id}`
      : `/admin/categories-update/${category.id}`;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">
        {category.name.uz} batafsil sahifasi
      </h1>
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-xl font-bold mb-2">
          {category.name.uz || "N/A"} {/* O'zbekcha nomni ko'rsatish */}
        </h3>
        <p className="text-gray-600">
          {category.description?.uz || "No description available"}
        </p>
        <p className="text-gray-600">
          {category.description?.en || "No description available"}
        </p>
        <p className="text-gray-900 bg-red-500">
          {category.description?.ru || "No description available"}
        </p>
        <div className="mt-4">
          <p>{/* <strong>ID:</strong> {category.id} */}</p>
        </div>
        <div className="flex justify-between mt-4">
          {" "}
          {/* Tugmalar orasini kengaytirish */}
          <Link
            to={updateLink} // Tahrirlash sahifasiga yo'naltirish
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200"
          >
            Tahrirlash
          </Link>
        </div>
      </div>
    </>
  );
};
