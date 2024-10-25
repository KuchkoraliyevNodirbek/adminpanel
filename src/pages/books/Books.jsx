import React, { useState } from "react";
import { Pagination, Alert } from "antd"; // Import Alert from Ant Design
import { useGetBooks } from "../../service/query/useGetBooks";
import { BooksFilter } from "../../components/book-filter/BooksFilter"; // Filtr komponenti
import { Loading } from "../../components/loading/loading"; // Yuklanish indikator

const Books = () => {
  // Pagination uchun state'lar
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Filtrlarni saqlash uchun state

  const offset = (currentPage - 1) * limit;

  // API dan kitoblarni olish
  const { data, error, isLoading } = useGetBooks(filters, limit, offset);

  // Kelgan kitoblar va umumiy ma'lumot
  const totalCount = data?.count || 0;
  const currentBooks = data?.books || [];

  // Yuklanish holati
  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-red-600 text-center">Error: {error.message}</p>;

  // Filtr o'zgarganda chaqiriladi
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Filtr qo'llanganda sahifa birinchi bo'ladi
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Books</h2>

      {/* Filtr komponenti */}
      <BooksFilter onFilterChange={handleFilterChange} />

      {/* Kitoblar ro'yxati */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div
              key={book.id}
              className="book-card p-4 border border-gray-300 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author_id}</p>
              <p className="text-gray-800 font-semibold">
                Price: ${book.price}
              </p>
              <p className="text-gray-500 mt-2">{book.description}</p>
            </div>
          ))
        ) : (
          <Alert
            message="Hozircha kitoblar yo'q"
            type="info"
            showIcon
            className="w-full"
            style={{ textAlign: "center" }} // Center the alert
          />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={limit}
          onChange={(page) => {
            setCurrentPage(page); // Sahifa o'zgarganda
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20]}
          onShowSizeChange={(current, size) => {
            setLimit(size); // Limit o'zgarganda
            setCurrentPage(1);
          }}
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default Books;
