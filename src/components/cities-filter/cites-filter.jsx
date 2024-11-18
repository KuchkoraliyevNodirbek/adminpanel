import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { CitiesCard } from "../cities-card/cities-card";
import { useGetCitiesList } from "../../service/query/useGetCitiesList";
import { SearchOutlined } from "@ant-design/icons";

export const CitiesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetCitiesList(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  const detailLink = `/admin/create-cities`;

  return (
    <div className="w-full space-y-4">
      <Flex wrap justify="space-between" gap={12}>
        <div className="w-full max-w-md">
          <Link to={detailLink}>
            <Button block type="primary" size="large">
              Shahar Yaratish
            </Button>
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Shaharni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <Spin />
      ) : debouncedSearchTerm && data?.Count > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.Cities?.cities.map((category) => (
            <CitiesCard key={category.id} category={category} />
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
