import React from "react";
import { Button, Tooltip, Typography, Modal, Flex } from "antd";
import { useDeleteBook } from "../../service/mutation/useDeleteBook";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const BookCard = ({ book }) => {
  const { mutate: deleteBook, isPending } = useDeleteBook();

  const confirmDelete = () => {
    Modal.confirm({
      title: "Kitobni o'chirishni tasdiqlaysizmi?",
      content: `${book.title} kitobini o'chirishga ishonchingiz komilmi?`,
      okText: "Ha, o'chirish",
      okType: "danger",
      cancelText: "Bekor qilish",
      onOk: handleDelete,
    });
  };

  const handleDelete = () => {
    deleteBook(book.id, {
      onSuccess: () => {
        toast.success(`${book.title || "Kitob"} muvaffaqiyatli o'chirildi`);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Kitobni o'chirishda xato yuz berdi!"
        );
      },
    });
  };

  const detailLink = `/admin/books-detail/${book.id}`;

  return (
    <div className="p-4 bg-accent rounded-lg border shadow-sm shadow-dark flex flex-col md:flex-row items-center justify-between w-full">
      <div className="w-full md:flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <img
            src={book.image_url}
            alt=""
            className="md:w-16 w-32 h-32 border-2 md:h-16 rounded-md object-center object-cover"
          />
          <Text className="text-lg text-start">{book.title || "N/A"}</Text>

          <Text className="text-lg text-start">{book.price} UZS</Text>
          <Text className="text-lg text-start">
            {book.published_year || "N/A"}
          </Text>
        </div>
      </div>

      <Flex gap={24} className="mt-4 md:mt-0">
        <Tooltip title="Batafsil ko'rish">
          <Link to={detailLink}>
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              className="bg-blue-500 text-white"
            />
          </Link>
        </Tooltip>

        <Tooltip title="O'chirish">
          <Button
            type="link"
            loading={isPending}
            onClick={confirmDelete}
            disabled={isPending}
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white"
          />
        </Tooltip>
      </Flex>
    </div>
  );
};
