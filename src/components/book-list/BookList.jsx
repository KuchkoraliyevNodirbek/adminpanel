import React, { useState } from "react";
import { Pagination } from "antd";
import { BookCard } from "../bookCard/BookCard"; // Adjust the import path as needed
import { useGetBooks } from "../../service/query/useGetBooks"; // Adjust the import path as needed
import { Loading } from "../loading/loading";

export const BookList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * limit; // Calculate offset based on page and limit

  const { data, error, isLoading } = useGetBooks("", limit, offset); // Fetching books data

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // Total count of books and current page books
  const totalCount = data?.count || 0;
  const currentBooks = data?.books || [];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Update the current page
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20, 100]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Change page size and reset to page 1
            setCurrentPage(1);
          }}
          showQuickJumper // Quick jump to specific page
        />
      </div>
    </div>
  );
};
