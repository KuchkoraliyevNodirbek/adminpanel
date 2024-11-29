import React from "react";
import { Button, Tooltip } from "antd";
import {
  DollarOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetById } from "../../service/query/useGetById";

export const VacancyCard = ({ vacancy }) => {
  const vacancyId = vacancy.id;
  const detailLink = `/admin/vacancies-detail/${vacancyId}`;

  const { data: cityData } = useGetById(
    "/cities/get",
    vacancy.location?.city_id
  );
  const { data: districtData } = useGetById(
    "/districts/get",
    vacancy.location?.district_id
  );

  return (
    <div className="border-2 w-full rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="vacancy-card w-full p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex gap-3 items-center">
          <h2 className="text-lg font-semibold">
            {vacancy.title || "No title"}
          </h2>
        </div>

        <p className="text-blue-600 font-medium">
          <DollarOutlined /> {vacancy.salary_from || "N/A"} -{" "}
          {vacancy.salary_to || "N/A"} UZS
        </p>

        <p className="border border-primary p-1 rounded-md font-medium">
          {vacancy.working_types || "N/A"}
        </p>

        <p className="flex items-center gap-2">
          <PhoneOutlined /> {vacancy.phone_number || "No contact"}
        </p>

        <p className="text-gray-500">
          {cityData ? cityData.name.en : "City N/A"},{" "}
          {districtData ? districtData.name.en : "District N/A"}
        </p>

        <div className="flex gap-2">
          <Tooltip title="Batafsil ko'rish">
            <Link to={detailLink}>
              <Button
                className="bg-blue-500 text-white"
                icon={<InfoCircleOutlined />}
                type="primary"
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
