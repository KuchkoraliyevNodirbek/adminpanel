import React, { useState } from "react";
import { useGetAuthors } from "../../service/query/useGetAuthors";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { AuthorsCard } from "../authors-card/authors-card";
import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { authorsCreateLink } from "../../routes/paths";

export const AuthorsFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetAuthors(debouncedSearchTerm);

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex wrap justify="space-between" gap={12} className="py-2">
        <div className="w-full max-w-96">
          <Link to={authorsCreateLink}>
            <Button block size="large" type="primary">
              Muallif Yaratish
            </Button>
          </Link>
        </div>
        <Flex justify="end" className="w-full max-w-screen-sm">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Muallifni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>
      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data.authors?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.authors.map((author) => (
            <AuthorsCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday muallif topilmadi
          </div>
        )
      )}
    </div>
  );
};
