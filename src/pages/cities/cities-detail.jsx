import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { Districts } from "../districts/districts";
import { Button, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { citiesBackLink } from "../../routes/paths";

export const CitiesDetail = () => {
  const { id } = useParams();
  const { data: category, isLoading, error } = useGetCitiesById(id);

  if (isLoading) return <Spin />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-screen-xl w-full mx-auto p-0 md:p-3">
      <div className="mb-5">
        <Link to={citiesBackLink}>
          <Button className="" type="primary" icon={<ArrowLeftOutlined />}>
            ortga
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Batafsil Sahifa
      </h1>

      <div className=" bg-white">
        <div className="grid md:grid-cols-3 justify-center ">
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.uz || "N/A"}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.en || "N/A"}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.ru || "N/A"}
          </h3>
        </div>

        <Districts cityId={id} />
      </div>
    </div>
  );
};
