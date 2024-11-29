import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { DistrictsCard } from "./districts-card";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetList } from "../../service/query/useGetList";
import { districtsEndPoints } from "../../config/endpoints";

export const DistrictFilter = ({ city_id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useGetList(districtsEndPoints.list, {
    name: debouncedSearchTerm,
    city_id,
    limit:1000000,
  });

  if (error) return <div>Xatolik yuz berdi</div>;

  const addDistrictsLink = `/admin/create-district/${city_id}`;

  return (
    <Flex vertical className="w-full space-y-4">
      <Flex justify="space-between" wrap gap={24}>
        <div className="w-full max-w-sm">
          <Link to={addDistrictsLink}>
            <Button
              size="large"
              block
              icon={<PlusCircleOutlined />}
              type="primary"
            >
              Tuman Qo'shish
            </Button>
          </Link>
        </div>
        <Flex justify="end" align="center" className="w-full max-w-lg">
          <Input
            size="large"
            suffix={<SearchOutlined />}
            type="text"
            placeholder="Tumanni qidiring"
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
          {data.Districts?.districts.map((category) => (
            <DistrictsCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        debouncedSearchTerm && (
          <div className="col-span-3 text-center text-red-500 font-semibold">
            Hech qanday tuman topilmadi
          </div>
        )
      )}
    </Flex>
  );
};
