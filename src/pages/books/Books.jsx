import React from "react";
import { BookList } from "../../components/book-list/BookList";
import { BooksFilter } from "../../components/book-filter/BooksFilter";

export const Books = () => {
  return (
    <div className="space-y-5">
      <BooksFilter />
      <BookList />
    </div>
  );
};
