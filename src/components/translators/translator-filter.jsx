import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { TranslatorCard } from "../translators/translator-card";
import { SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetList(tarnslatorsEndPoints.list, {
    name: debouncedSearchTerm,
    limit:1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  const detailLink = `/admin/create-translator`;

  return (
    <div className="w-full space-y-4">
      <Flex justify="space-between" wrap gap={24}>
        <div className="w-full max-w-md">
          <Link to={detailLink}>
            <Button size="large" block type="primary">
              Tarjimon Yaratish
            </Button>
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tarjimoni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.translators?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.translators.map((translator) => (
            <TranslatorCard key={translator.id} translator={translator} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday Tarjimon topilmadi
          </div>
        )
      )}
    </div>
  );
};
