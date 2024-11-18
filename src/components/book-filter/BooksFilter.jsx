import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import { useGetBooks } from "../../service/query/useGetBooks";
import { BookCard } from "../bookCard/BookCard";
import { Select, Input, Form, Button, Checkbox, Spin, Flex } from "antd";
import { useGetPublishersList } from "../../service/query/useGetPublishersList";
import { useGetCategories } from "../../service/query/useGetCategoriesList";
import { useGetTranslatorsList } from "../../service/query/useGetTranslatorList";
import { useGetAuthors } from "../../service/query/useGetAuthors";
import { useGetLanguagesList } from "../../service/query/useGetLanguagesList";
import { useGetCitiesList } from "../../service/query/useGetCitiesList";
import { useGetDistrictsList } from "../../service/query/useGetDistrictsList";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetAllAdmin } from "../../service/query/useGetAllAdmin";

const { Option } = Select;

export const BooksFilter = () => {
  const [filters, setFilters] = useState({
    title: "",
    seller_id: "",
    author_id: "",
    publisher_id: "",
    category_id: "",
    translator_id: "",
    language_id: "",
    city_id: "",
    district_id: "",
    writing_type: "",
    status: "",
    is_new: null,
  });
  const [searchTriggered, setSearchTriggered] = useState(false);

  const debouncedFilters = useDebounce(filters, 500);

  const { data, isLoading, error } = useGetBooks(
    searchTriggered ? debouncedFilters : {}
  );

  console.log(data);

  console.log(filters);

  const { data: users } = useGetAllAdmin("", "", "user");
  const { data: publishers } = useGetPublishersList();
  const { data: categories } = useGetCategories();
  const { data: translators } = useGetTranslatorsList();
  const { data: authors } = useGetAuthors();
  const { data: languages } = useGetLanguagesList();
  const { data: cities } = useGetCitiesList();
  const { data: districts } = useGetDistrictsList();

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleClear = () => {
    setFilters({
      title: "",
      seller_id: "",
      author_id: "",
      publisher_id: "",
      category_id: "",
      translator_id: "",
      language_id: "",
      city_id: "",
      district_id: "",
      writing_type: "",
      status: "",
      is_new: null,
    });
    setSearchTriggered(false);
  };

  if (error) {
    return <div className="text-red-500 text-center">Xatolik yuz berdi</div>;
  }

  return (
    <div className="w-full bg-accent border border-dark rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Kitob qidirish uchun filtrlar
      </h2>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          {/* Title Filter */}

          {/* Author Filter */}
          <Form.Item label="Sotuvchi">
            <Select
              placeholder="Sotuvchini tanlang"
              value={filters.seller_id}
              onChange={(value) => handleChange("seller_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {users?.users?.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.role}: {users.email ? users.email : users.phone_number}
                </Option>
              ))}

              {publishers?.publishers?.map((publisher) => (
                <Option key={publisher.id} value={publisher.id}>
                  publisher: {publisher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Muallif">
            <Select
              placeholder="Muallifni tanlang"
              value={filters.author_id}
              onChange={(value) => handleChange("author_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {authors?.authors?.map((author) => (
                <Option key={author.id} value={author.id}>
                  {author.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Publisher Filter */}
          <Form.Item label="Nashriyot">
            <Select
              placeholder="Nashriyotni tanlang"
              value={filters.publisher_id}
              onChange={(value) => handleChange("publisher_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {publishers?.publishers?.map((publisher) => (
                <Option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Category Filter */}
          <Form.Item label="Kategoriya">
            <Select
              placeholder="Kategoriyani tanlang"
              value={filters.category_id}
              onChange={(value) => handleChange("category_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {categories?.Categories?.categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category?.name?.uz}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Translator Filter */}
          <Form.Item label="Tarjimon">
            <Select
              placeholder="Tarjimoni tanlang"
              value={filters.translator_id}
              onChange={(value) => handleChange("translator_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {translators?.translators?.map((translator) => (
                <Option key={translator.id} value={translator.id}>
                  {translator.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Language Filter */}
          <Form.Item label="Til">
            <Select
              placeholder="Tilni tanlang"
              value={filters.language_id}
              onChange={(value) => handleChange("language_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {languages?.languages?.languages?.map((language) => (
                <Option key={language.id} value={language.id}>
                  {language?.name?.uz}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* City Filter */}
          <Form.Item label="Shahar">
            <Select
              placeholder="Shaharning tanlang"
              value={filters.city_id}
              onChange={(value) => handleChange("city_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {cities?.Cities?.cities.map((city) => (
                <Option key={city.id} value={city.id}>
                  {city?.name?.uz}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* District Filter */}
          <Form.Item label="Tuman">
            <Select
              placeholder="Tumanni tanlang"
              value={filters.district_id}
              onChange={(value) => handleChange("district_id", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              {districts?.Districts?.districts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district?.name?.uz}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Writing Type Filter */}
          <Form.Item label="Yozish turi">
            <Select
              placeholder="Yozish turini tanlang"
              value={filters.writing_type}
              onChange={(value) => handleChange("writing_type", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              <Option value="latin">Latin</Option>
              <Option value="cyrillic">Cyrillic</Option>
            </Select>
          </Form.Item>

          {/* Status Filter */}
          <Form.Item label="Status">
            <Select
              placeholder="Statusni tanlang"
              value={filters.status}
              onChange={(value) => handleChange("status", value)}
              className="rounded-md border border-gray-300"
            >
              <Option value="">Hammasi</Option>
              <Option value="active">Active</Option>
              <Option value="non-active">Non-active</Option>
            </Select>
          </Form.Item>

          {/* Is New Checkbox */}
          <Flex vertical justify="center">
            <Checkbox
              className="border-2 p-[4px] rounded-md mt-1 bg-white"
              checked={filters.is_new}
              onChange={(e) => handleChange("is_new", e.target.checked)}
            >
              Yangi kitob
            </Checkbox>
          </Flex>
        </div>

        <Flex wrap gap={24}>
          <Flex className="max-w-lg w-full">
            <Input
              suffix={<SearchOutlined />}
              size="large"
              placeholder="Kitob nomi bo'yicha qidiring"
              value={filters.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Flex>
          <Button
            size="large"
            type="primary"
            onClick={handleSearch}
            block
            className="max-w-96"
          >
            Qidirish
          </Button>
          {searchTriggered && (
            <Button
              size="large"
              icon={<ClearOutlined />}
              onClick={handleClear}
              className="max-w-md bg-red-500 text-white"
            >
              Tozalash
            </Button>
          )}
        </Flex>
      </Form>

      <div>
        {isLoading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : searchTriggered && data.books?.length > 0 ? (
          <div className="relative grid grid-cols-1 gap-4 min-h-[0px] transition-all duration-1000  max-h-96 overflow-y-scroll overflow-hidden bg-dark p-3 border-2 border-dark">
            <div className="sticky top-0">
              <h1 className="bg-blue-500 text-white font-bold p-1 w-fit  rounded-r">
                Soni: {data?.count}
              </h1>
            </div>
            {data.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          searchTriggered && (
            <div className="mt-8 text-center text-gray-500 font-semibold">
              Kitoblar mavjud emas
            </div>
          )
        )}
      </div>
    </div>
  );
};
