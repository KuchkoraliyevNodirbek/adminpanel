import React, { useState } from "react";
import { useGetCategories } from "../../service/query/useGetCategoriesList";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { CategoryCard } from "../category-card/category-card";
import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

export const CategoriesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetCategories(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  const detailLink = `/admin/create-categories`;

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" wrap gap={12} className="py-2">
        <div className="w-full max-w-md">
          <Link to={detailLink}>
            <Button block size="large" type="primary">
              Kategoriya Yaratish
            </Button>
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Kategoriyani qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>
      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.Count > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.Categories?.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday kategoriya topilmadi
          </div>
        )
      )}
    </div>
  );
};
