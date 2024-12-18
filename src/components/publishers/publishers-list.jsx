import React, { useState } from "react";
import { Row, Col, Spin, Alert, Pagination, Select, Empty, Flex } from "antd";
import { PublisherCard } from "./publishers-card";
import { useGetList } from "../../service/query/useGetList";
import { publishersEndPoints } from "../../config/endpoints";

const { Option } = Select;

export const PublishersList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("publisher");
  const [status, setStatus] = useState("active");
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useGetList(
    publishersEndPoints.list,
    {
      type,
      status,
      limit,
      offset,
    }
  );

  if (isLoading) {
    return <Spin />;
  }

  const totalCount = data?.count || 0;
  const currentPublishers = data.publishers || [];

  if (isError) {
    return (
      <Alert message="Xato" description={error.message} type="error" showIcon />
    );
  }

  return (
    <>
      <Flex vertical align="center" justify="space-between" gap={24}>
        <Flex justify="center" wrap gap={24}>
          <Select
            defaultValue={type}
            style={{ width: 200 }}
            onChange={(value) => setType(value)}
          >
            <Option value="publisher">Nashriyot</Option>
            <Option value="shop">Do'kon</Option>
          </Select>

          <Select
            defaultValue={status}
            style={{ width: 200 }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="active">Faol</Option>
            <Option value="non-active">Faol emas</Option>
          </Select>
        </Flex>

        <Row className="flex flex-col w-full bg-white" gutter={[16, 16]}>
          <h1 className="p-5 text-dark font-bold">
            {type == "publisher"
              ? "Nashriyotchilar Ro'yxati"
              : "Do'konlar Ro'yxati"}
          </h1>

          {currentPublishers?.map((publisher) => (
            <Col
              className="w-full max-w-full"
              key={publisher.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <PublisherCard publisher={publisher} />
            </Col>
          ))}
        {totalCount == 0 ? <Empty description="Malumotlar yo'q" /> : ""}
        </Row>

      </Flex>

      <Flex justify="center" className="mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger
          pageSizeOptions={[1, 5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size);
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </Flex>
    </>
  );
};
