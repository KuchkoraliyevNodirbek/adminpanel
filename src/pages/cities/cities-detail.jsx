import React from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/loading";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { Districts } from "../districts/districts";

export const CitiesDetail = () => {
  const { id } = useParams(); // URL dan id ni olish
  const { data: category, isLoading, error } = useGetCitiesById(id);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-screen-lg w-full mx-auto p-0 md:p-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Batafsil Sahifa
      </h1>

      <div className="border rounded-lg p-6 shadow-primary shadow-md transition-shadow duration-300 bg-white">
        <div className="grid md:grid-cols-3 justify-center ">
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.uz || "N/A"} {/* O'zbekcha nomni ko'rsatish */}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.en || "N/A"} {/* O'zbekcha nomni ko'rsatish */}
          </h3>
          <h3 className="text-base md:text-2xl font-semibold text-gray-800 mb-4">
            {category.name.ru || "N/A"} {/* O'zbekcha nomni ko'rsatish */}
          </h3>
        </div>

        <Districts cityId={id} />
      </div>
    </div>
  );
};
