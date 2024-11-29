import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { LanguagesCard } from "./languages-card";
import { SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { languagesEndPoints } from "../../config/endpoints";

export const LanguagesFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetList(languagesEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  const createLink = `/admin/create-languages`;

  return (
    <div className="w-full space-y-4">
      <Flex wrap justify="space-between" gap={12}>
        <div className="w-full max-w-md">
          <Link to={createLink}>
            <Button block type="primary" size="large">
              Til Yaratish
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tilni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Flex>{" "}
      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.Count > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.languages?.languages.map((category) => (
            <LanguagesCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday Til topilmadi
          </div>
        )
      )}
    </div>
  );
};
