import React, { useState } from "react";
import { Pagination, List, Flex, Spin } from "antd";
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin";
import { UserCard } from "./userCard";

export const AllUsers = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;
  const { data, isLoading, isError, error } = useGetAllAdmin(
    limit,
    offset,
    "user"
  );

  if (isLoading) return <Spin />;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  const totalCount = data?.count || 0;

  return (
    <div className="p-4 max-w-full mx-auto">
      <Flex justify="space-between" wrap gap={12} className="p-3">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Userlar Ro'yxati
        </h2>
        <p className="text-lg">
          <span className="text-xl font-bold">Jami: </span> {totalCount}
        </p>
      </Flex>
      <List
        grid={{ gutter: 10, xs: 1, sm: 1, md: 1, lg: 1, column: 1 }}
        dataSource={data.users}
        renderItem={(user) => (
          <List.Item>
            <UserCard user={user} />
          </List.Item>
        )}
      />

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
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </Flex>
    </div>
  );
};
