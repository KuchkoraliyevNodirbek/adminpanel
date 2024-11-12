import React, { useState } from "react";
import { Spin, Pagination, List, message } from "antd";
import { useGetTranslatorsList } from "../../service/query/useGetTranslatorList";
import { TranslatorCard } from "../translator-file/translator-card";

export const TranslatorList = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Default page size
  const offset = (currentPage - 1) * pageSize; // Calculate the offset

  // Fetch the translators data with limit and offset
  const { data, isLoading, isError, error } = useGetTranslatorsList(
    "", // Filter or search term, modify if needed
    "", // Another filter, modify as per your logic
    pageSize, // Limit (page size)
    offset // Offset for pagination
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize); // Updates page size if changed
  };

  // Handle errors
  if (isError) {
    message.error("Failed to load translators. Please try again.");
    console.error("Error fetching translators:", error);
  }

  return (
    <div className="translator-list-container bg-white p-4 rounded shadow-md">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading translators..." />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Translators</h2>

          {/* List of Translators */}
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data?.translators || []}
            renderItem={(translator) => (
              <List.Item>
                <TranslatorCard key={translator.id} translator={translator} />
              </List.Item>
            )}
            locale={{ emptyText: "No translators found" }}
          />

          {/* Pagination */}
          <div className="pagination-controls mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.count || 0}
              onChange={handlePageChange}
              showSizeChanger // Allows selection of page size
              pageSizeOptions={["10", "20", "50", "100"]} // Page size options
              showQuickJumper // Allows "Go to page" input
            />
          </div>
        </>
      )}
    </div>
  );
};
