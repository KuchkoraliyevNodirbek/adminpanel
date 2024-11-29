import React, { useState } from "react";
import { Flex, Pagination, Spin } from "antd";
import { LanguagesCard } from "./languages-card";
import { useGetList } from "../../service/query/useGetList";
import { languagesEndPoints } from "../../config/endpoints";

export const LanguagesList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(languagesEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading) return <Spin />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.Count || 0;

  const currentlanguages = data.languages?.languages || [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Flex
        justify="space-between"
        align="center"
        wrap
        gap={12}
        className="p-3"
      >
        <h2 className="text-2xl font-bold">Tillar Ro'yxati</h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>

      <Flex vertical gap={12}>
        {currentlanguages.map((category) => (
          <LanguagesCard key={category.id} category={category} />
        ))}
      </Flex>

      <Flex justify="center" className="mt-4">
        <Pagination
          align="start"
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
