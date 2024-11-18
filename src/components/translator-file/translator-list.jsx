import React, { useState } from "react";
import { Pagination, List, message, Flex, Spin } from "antd";
import { useGetTranslatorsList } from "../../service/query/useGetTranslatorList";
import { TranslatorCard } from "../translator-file/translator-card";

export const TranslatorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const offset = (currentPage - 1) * pageSize;

  const { data, isLoading, isError, error } = useGetTranslatorsList(
    "",
    "",
    pageSize,
    offset
  );

  const totalCount = data?.count;

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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

      {/* <List
        grid={{ gutter: 12, column: 1 }}
        dataSource={data?.translators || []}
        renderItem={(translator) => (
          <List.Item>
          </List.Item>
        )}
        locale={{ emptyText: "No translators found" }}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data?.translators.map((translator)=> (
        <TranslatorCard key={translator.id} translator={translator} />

        ))}
      </div>

      <Flex justify="center" className="mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
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
