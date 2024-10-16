import React, { useState } from "react";
import { useGetCategories } from "../../service/query/useGetCategoriesList";
import { useDebounce } from "../../hooks/useDebounce/useDebounce"; // Debounce hookni import qilish
import CategoryCard from "../category-card/category-card";

export const CategoriesFilter = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun input qiymati
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 1 soniya debounce qilish

  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategories(debouncedSearchTerm); // Debounced qiymatdan foydalanish

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="">
      {/* Qidiruv inputi */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Kategoriyani qidiring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv qiymatini yangilash
          className="border-2 rounded p-2 mb-4 w-full max-w-lg focus:outline-green-500 border-blue-500"
        />
      </div>

      {/* Kategoriyalar bo'sh bo'lsa ham joy saqlash */}
      <div className="grid grid-cols-3 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden">
        {" "}
        {/* Bo'sh holatda ham 100px balandlik */}
        {isLoading ? (
          <div className="col-span-3 text-center text-gray-500 font-semibold">
            Yuklanmoqda...
          </div>
        ) : debouncedSearchTerm && categories?.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-gray-500 font-semibold">
              Hech qanday kategoriya topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
