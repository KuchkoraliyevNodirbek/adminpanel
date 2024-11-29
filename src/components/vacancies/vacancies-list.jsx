import React, { useState } from "react";
import { Spin, Pagination, List, message, Flex } from "antd";
import { VacancyCard } from "./vacancies-card";
import { useGetList } from "../../service/query/useGetList";
import { vacanciesEndPoints } from "../../config/endpoints";

export const VacanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    vacanciesEndPoints.list,
    {
      limit: limit,
      offset,
    }
  );

  const totalCount = data?.count;

  const handlePageChange = (page, limit) => {
    setCurrentPage(page);
    setLimit(limit);
  };

  if (isError) {
    message.error("Failed to load vacancies. Please try again.");
    console.error("Error fetching vacancies:", error);
  }

  return (
    <Flex vertical gap={24}>
      <Flex
        justify="space-between"
        align="center"
        wrap
        className="font-bold text-lg mt-4"
      >
        <h1>Vakansiyalar Ro'yxati</h1>
        <p>
          <span className="text-xl">Jami:</span> {totalCount}
        </p>
      </Flex>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
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
              pageSize={limit}
              total={totalCount}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["5", "10", "20", "50", "100"]}
              showQuickJumper
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
