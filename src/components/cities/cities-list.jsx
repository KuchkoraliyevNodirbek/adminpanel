import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin } from "antd";
import { CitiesCard } from "./cities-card";
import { useGetList } from "../../service/query/useGetList";
import { citiesEndPoints } from "../../config/endpoints";

export const CitiesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(citiesEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading) return <Spin />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;
  const currentCategories = data.Cities?.cities || [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Flex justify="space-between">
        <h2 className="text-2xl font-bold mb-4">Shaharlar</h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>

      <Flex vertical gap={12}>
        {currentCategories?.map((category) => (
          <CitiesCard key={category.id} category={category} />
        ))}
        {totalCount == 0 || undefined ? (
          <Empty description="Malumotlar yo'q" />
        ) : (
          ""
        )}
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
