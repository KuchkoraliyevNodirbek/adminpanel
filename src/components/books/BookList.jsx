import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin } from "antd";
import { BookCard } from "./BookCard";
import { useGetList } from "../../service/query/useGetList";
import { booksEndPoints } from "../../config/endpoints";

export const BookList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading } = useGetList(booksEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading) return <Spin />;
  if (error) return <p>Error: {error.message}</p>;

  const totalCount = data?.count || 0;
  const currentBooks = data?.books || [];

  return (
    <div className="bg-white p-4 rounded shadow-md shadow-dark">
      <Flex align="center" justify="space-between" wrap className="p-3">
        <h2 className="text-2xl font-bold">Kitoblar Ro'yxati</h2>
        <p className="text-lg font-medium">
          <span className="font-bold text-lg">Jami:</span> {totalCount}
        </p>
      </Flex>

      <Flex vertical gap={12}>
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
        {totalCount == 0 ? <Empty description="Malumotlar yo'q" /> : ""}
      </Flex>

      <Flex justify="center" className="mt-4">
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
            setCurrentPage(current);
          }}
          showQuickJumper
        />
      </Flex>
    </div>
  );
};
