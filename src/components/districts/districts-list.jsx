import React, { useState } from "react";
import { Flex, Pagination } from "antd";
import { Loading } from "../loading/loading";
import { DistrictsCard } from "./districts-card";
import { useGetList } from "../../service/query/useGetList";
import { districtsEndPoints } from "../../config/endpoints";

export const DistrictsList = ({ city_id }) => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(districtsEndPoints.list, {
    city_id,
    limit,
    offset,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;
  const currentCategories = data.Districts?.districts || [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Flex justify="space-between" wrap gap={12} className="p-3">
        <h2 className="text-2xl font-bold mb-4">Tumanlar Ro'yxati</h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>

      <Flex vertical gap={12}>
        {currentCategories.map((category) => (
          <DistrictsCard key={category.id} category={category} />
        ))}
      </Flex>

      <Flex justify="center" align="center" className="mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size);
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </Flex>
    </div>
  );
};
