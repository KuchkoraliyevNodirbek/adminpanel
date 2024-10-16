import React from "react";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

const CategoryCard = ({ category }) => {
  const { mutate: deleteCategory, isLoading } = useDeleteCategory();

  // LocalStorage'dan ro'lni olish
  const role = loadState("user");

  const handleDelete = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        toast.success(`${category.name || "Kategoriya"} o'chirildi`);
      },
      onError: () => {
        toast.error(`Kategoriya o'chirishda xato yuz berdi!`);
      },
    });
  };

  // Tahrirlash linki manzilini rolega qarab aniqlash
  const updateLink =
    role.role === "superadmin"
      ? `/super-admin/categories-update/${category.id}`
      : `/admin/categories-update/${category.id}`;
  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/categories-detail/${category.id}`
      : `/admin/categories-detail/${category.id}`;

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-500">
      <Link to={detailLink}>
        <h3 className="text-xl font-bold mb-2 text-blue-500 underline text-end p-2 bg-blue-300 w-fit">
          detail
        </h3>
      </Link>
      <h3 className="text-xl font-bold mb-2">{category.name.uz || "N/A"}</h3>
      <h3 className="text-xl font-bold mb-2">{category.name.en || "N/A"}</h3>
      <h3 className="text-xl font-bold mb-2">{category.name.ru || "N/A"}</h3>

      <div className="mt-4">
        <p>
          <strong>ID:</strong> {category.id}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <Link
          to={updateLink} // Rolga qarab linkni aniqlash
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-200"
        >
          Tahrirlash
        </Link>
        <button
          onClick={handleDelete}
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "O'chirilyapti..." : "O'chirish"}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
