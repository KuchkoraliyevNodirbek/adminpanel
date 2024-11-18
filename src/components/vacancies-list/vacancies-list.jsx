import React, { useState } from "react";
import { Spin, Pagination, List, message, Flex } from "antd";
import { useGetVacancies } from "../../service/query/useGetVacancies";
import { VacancyCard } from "../vacancies-card/vacancies-card";

export const VacanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const offset = (currentPage - 1) * pageSize;

  const { data, isLoading, isError, error } = useGetVacancies({
    limit: pageSize,
    offset,
  });

  const totalCount = data?.count;

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (isError) {
    message.error("Failed to load vacancies. Please try again.");
    console.error("Error fetching vacancies:", error);
  }

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        wrap
        className="font-bold text-lg p-3 mb-5"
      >
        <h1>Vakansiyalar Ro'yxati</h1>
        <p>
          <span className="text-xl">Jami:</span> {totalCount}
        </p>
      </Flex>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading vacancies..." />
        </div>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data?.vacancies || []}
            renderItem={(vacancy) => (
              <List.Item>
                <VacancyCard vacancy={vacancy} />
              </List.Item>
            )}
            locale={{ emptyText: "No vacancies found" }}
          />
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
        </>
      )}
    </div>
  );
};
