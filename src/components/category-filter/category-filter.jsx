import React, { useState } from "react";
import { useGetCategories } from "../../service/query/useGetCategoriesList";
import { useDebounce } from "../../hooks/useDebounce/useDebounce"; // Debounce hookni import qilish
import { CategoryCard } from "../category-card/category-card";
import { loadState } from "../../config/stroge";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const CategoriesFilter = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun input qiymati
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5 soniya debounce qilish

  const {
    data,
    isLoading,
    error,
    // data
  } = useGetCategories(debouncedSearchTerm); // Debounced qiymatdan foydalanish

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);
  

  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-categories`
      : `/admin/create-categories`;

  return (
    <div className="w-full">
      {/* Qidiruv inputi */}
      <div className="flex flex-wrap justify-between gap-10">
        <div className="w-fit">
          <Link to={detailLink}>
            <Button type="primary" className="w-full max-w-96 p-5">
              Kategoriya Yaratish
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <input
            type="text"
            placeholder="Kategoriyani qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv qiymatini yangilash
            className="border-2 rounded p-2 mb-4 w-full max-w-screen-sm focus:outline-dark border-primary"
          />
        </div>
      </div>
      {/* Kategoriyalar bo'sh bo'lsa ham joy saqlash */}
      <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden">
        {" "}
        {/* Bo'sh holatda ham 100px balandlik */}
        {isLoading ? (
          <div className="col-span-3 text-center text-gray-500 font-semibold">
            Yuklanmoqda...
          </div>
        ) : debouncedSearchTerm && data?.Count > 0 ? (
          data.Categories?.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday kategoriya topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
