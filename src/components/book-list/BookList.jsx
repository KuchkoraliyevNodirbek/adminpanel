import React, { useState } from "react";
import { Pagination } from "antd";
import { BooksFilter } from "../../components/book-filter/BooksFilter"; // Filtr komponenti
import { useGetBooks } from "../../service/query/useGetBooks";
import { Loading } from "../loading/loading"; // Yuklanish indikatori

export const BooksList = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Filtrlarni ushlab turish

  const offset = (currentPage - 1) * limit;

  const { data, error, isLoading } = useGetBooks(filters, limit, offset);

  const totalCount = data?.count || 0;
  const currentBooks = data?.books || [];

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Filtr o'zgartirilganda sahifani 1 ga qaytarish
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

      <BooksFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p>Author: {book.author_id}</p>
              <p>Price: ${book.price}</p>
              <p>{book.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">Hozircha kitoblar yo'q</p> // Message when no books are available
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Sahifa o'zgarishi
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Sahifa hajmi o'zgarishi
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </div>
    </div>
  );
};
