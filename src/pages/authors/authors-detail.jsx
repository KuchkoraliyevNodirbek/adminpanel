import React from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { Button, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { authorsBackLink, authorsUpdateLink } from "../../routes/paths";
import { useGetById } from "../../service/query/useGetById";
import { authorsEndPoints } from "../../config/endpoints";

export const AuthorsDetailPage = () => {
  const { id } = useParams();
  const {
    data: author,
    isLoading,
    error,
  } = useGetById(authorsEndPoints.get, id);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex vertical justify="center" align="center" gap={24} className="w-full">
      <Flex className="w-full">
        <Link to={authorsBackLink}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            ortga
          </Button>
        </Link>
      </Flex>

      <Flex
        vertical
        gap={24}
        className="border-2 rounded-lg p-4 shadow-dark shadow-md  bg-white w-full max-w-screen-lg mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Muallif Batafsil Sahifa
        </h1>
        <Flex
          className="flex-wrap md:flex-nowrap"
          justify="space-between"
          gap={24}
        >
          <h3 className="p-3 rounded-md border-2 w-full text-2xl font-semibold text-gray-800">
            <span className="text-xl font-bold text-gray-900">Ism:</span>{" "}
            {author.name || "Ism mavjud emas"}
          </h3>
          <h3 className="p-3 rounded-md border-2  w-full text-2xl font-semibold text-gray-800">
            <span className="text-xl font-bold text-gray-900">Familiya: </span>{" "}
            {author.surname || "Familiya mavjud emas"}
          </h3>
        </Flex>

        <Flex vertical gap={12} className="border-2 p-3 rounded-md">
          <h2 className="text-xl font-bold text-gray-900">Biografiya:</h2>
          <p className="text-gray-700">
            {author.biography || "Biografiya mavjud emas"}
          </p>
        </Flex>

        <Flex justify="center">
          <Link to={authorsUpdateLink(author.id)} className="">
            <Button size="large" type="primary">
              Tahrirlash
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
