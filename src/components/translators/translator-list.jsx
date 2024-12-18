import React, { useState } from "react";
import { Pagination, message, Flex, Spin, Empty } from "antd";
import { TranslatorCard } from "../translators/translator-card";
import { useGetList } from "../../service/query/useGetList";
import { tarnslatorsEndPoints } from "../../config/endpoints";

export const TranslatorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    tarnslatorsEndPoints.list,
    {
      limit,
      offset,
    }
  );

  const totalCount = data?.count;

  console.log(totalCount);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize);
  };

  if (isError) {
    message.error("Failed to load translators. Please try again.");
    console.error("Error fetching translators:", error);
  }
  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="md:p-4 bg-white rounded shadow-md">
      <Flex
        justify="space-between"
        align="center"
        wrap
        gap={12}
        className="p-3"
      >
        <h2 className="text-2xl font-bold mb-4">Tarjimonlar Ro'yxati</h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data?.translators?.map((translator) => (
          <TranslatorCard key={translator.id} translator={translator} />
        ))}
      </div>
      {totalCount == undefined || 0 ? <Empty description="Malumotlar yo'q" /> : ""}

      <Flex justify="center" className="mt-4">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalCount}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "50", "100"]}
          showQuickJumper
        />
      </Flex>
    </div>
  );
};
