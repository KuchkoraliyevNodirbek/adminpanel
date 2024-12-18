import React, { useState } from "react";
import { Empty, Flex, Pagination, Spin } from "antd";
import { AuthorsCard } from "./authors-card";
import { useGetList } from "../../service/query/useGetList";
import { authorsEndPoints } from "../../config/endpoints";

export const AuthorsList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, error, isLoading } = useGetList(authorsEndPoints.list, {
    limit,
    offset,
  });

  if (isLoading) return <Spin />;
  if (error) return <p>Xatolik: {error.message}</p>;

  const totalCount = data?.count || 0;
  const currentAuthors = data?.authors || [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <Flex
        className="p-3"
        align="center"
        gap={12}
        wrap
        justify="space-between"
      >
        <h2 className="text-2xl font-bold">Mualliflar Ro'yxati</h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentAuthors.map((author) => (
          <AuthorsCard key={author.id} author={author} />
        ))}
      </div>
      
      {totalCount == 0 || undefined ? (
        <Empty description="Malumotlar yo'q" />
      ) : (
        ""
      )}

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
