import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { PublisherCard } from "./publishers-card";
import { useGetList } from "../../service/query/useGetList";
import { publishersEndPoints } from "../../config/endpoints";

export const PublishersFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetList(publishersEndPoints.list, {
    name: debouncedSearchTerm,
    limit: 1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="w-full space-y-4">
      <Flex wrap justify="end" gap={24}>
        <Flex justify="center" className="w-full max-w-screen-sm">
          <Input
            suffix={<SearchOutlined />}
            type="text"
            placeholder="nashriyotchini va do'konni qidiring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
          />
        </Flex>
      </Flex>

      {isLoading ? (
        <div className="col-span-3 text-center text-gray-500 font-semibold">
          Yuklanmoqda...
        </div>
      ) : debouncedSearchTerm && data?.count > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
          {data.publishers?.map((publisher) => (
            <PublisherCard key={publisher.id} publisher={publisher} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday malumot topilmadi
          </div>
        )
      )}
    </div>
  );
};
