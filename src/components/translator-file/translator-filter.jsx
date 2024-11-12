import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { loadState } from "../../config/stroge";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetTranslatorsList } from "../../service/query/useGetTranslatorList";
import { TranslatorCard } from "../translator-file/translator-card";
import { SearchOutlined } from "@ant-design/icons";

export const TranslatorFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetTranslatorsList(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  console.log(data);

  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-translator`
      : `/admin/create-translator`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="w-fit">
          <Link to={detailLink}>
            <Button type="primary" className="w-full max-w-96 p-5">
              Tarjimon Yaratish
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full max-w-screen-sm justify-end ">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tarjimoni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 rounded p-2 mb-4 w-full max-w-screen-sm focus:outline-dark border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 min-h-[0px] transition-all duration-1000 max-h-96 overflow-y-scroll overflow-hidden">
        {" "}
        {isLoading ? (
          <div className="col-span-3 text-center text-gray-500 font-semibold">
            Yuklanmoqda...
          </div>
        ) : debouncedSearchTerm && data?.translators?.length > 0 ? (
          data.translators.map((translator) => (
            <TranslatorCard key={translator.id} translator={translator} />
          ))
        ) : (
          debouncedSearchTerm && (
            <div className="col-span-3 text-center text-red-500 font-semibold">
              Hech qanday Tarjimon topilmadi
            </div>
          )
        )}
      </div>
    </div>
  );
};
