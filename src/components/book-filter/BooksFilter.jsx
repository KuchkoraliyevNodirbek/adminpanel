import React, { useState } from "react";
import { Input, Button, Form } from "antd"; // Importing Ant Design components
import { loadState } from "../../config/stroge"; // Import to access user role
import { useDebounce } from "../../hooks/useDebounce/useDebounce"; // Import the debounce hook

export const BooksFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price_from: "",
    price_to: "",
    publisher_id: "",
    category_id: "",
    translator_id: "",
    author_id: "",
    language_id: "",
    city_id: "",
    district_id: "",
    title: "",
    writing_type: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters); // State for debounced filters
  const role = loadState("user"); // Load user role

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-books`
      : `/admin/create-books`; // Change this to your book creation route

  // Debounce filters on change
  const debouncedFilterChange = useDebounce((updatedFilters) => {
    setDebouncedFilters(updatedFilters); // Update the debounced filters
    onFilterChange(updatedFilters); // Notify the parent of the filter change
  }, 500); // 500ms debounce

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters); // Update local filters state
    debouncedFilterChange(updatedFilters); // Call debounced function
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters); // Send filter parameters
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="bg-white p-4 rounded shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold">Filter Books</h2>
      <Form.Item>
        <Input
          name="title"
          value={filters.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex gap-4">
          <Input
            type="number"
            name="price_from"
            value={filters.price_from}
            onChange={handleInputChange}
            placeholder="Price From"
            className="flex-1"
          />
          <Input
            type="number"
            name="price_to"
            value={filters.price_to}
            onChange={handleInputChange}
            placeholder="Price To"
            className="flex-1"
          />
        </div>
      </Form.Item>

      {/* Conditional fields based on role */}
      {role.role === "superadmin" && (
        <Form.Item>
          <Input
            name="category_id"
            value={filters.category_id}
            onChange={handleInputChange}
            placeholder="Category ID"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>
      )}

      {role.role === "admin" && (
        <Form.Item>
          <Input
            name="publisher_id"
            value={filters.publisher_id}
            onChange={handleInputChange}
            placeholder="Publisher ID"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>
      )}

      {/* Add more conditional fields as needed */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Apply Filters
        </Button>
      </Form.Item>
    </Form>
  );
};
