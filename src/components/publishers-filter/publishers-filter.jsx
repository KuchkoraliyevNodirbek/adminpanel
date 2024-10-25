import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce"; // Debounce hookni import qilish
import { loadState } from "../../config/stroge";
import { Button } from "antd";
import { Link } from "react-router-dom";
// import { useGetDistrictsList } from "../../service/query/useGetDistrictsList";
import { DistrictsCard } from "../districts-card/districts-card";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useGetPublishersList } from "../../service/query/useGetPublishersList";
import { PublisherCard } from "../publishers-card/publishers-card";

export const PublishersFilter = ({ cityId }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv uchun input qiymati
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5 soniya debounce qilish

  const { data, isLoading, error } = useGetPublishersList(debouncedSearchTerm); // Debounced qiymatdan foydalanish

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  const user = loadState("user");

  const addDistrictsLink =
    user.role === "superadmin"
      ? `/super-admin/create-district/${cityId}`
      : `/admin/create-district/${cityId}`;

  return (
    <div className="w-full">
      {/* Qidiruv inputi */}
      <div className="flex flex-wrap justify-end gap-10">
        <div className="flex items-center w-full max-w-screen-sm justify-center ">
          <input
            type="text"
            placeholder="nashriyotchini qidiring"
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
        ) : debouncedSearchTerm && data?.count > 0 ? (
          data.publishers?.map((publisher) => (
            // <DistrictsCard key={category.id} category={category} />
            <PublisherCard key={publisher.id} publisher={publisher} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday malumot topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
