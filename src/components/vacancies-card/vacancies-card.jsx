import React from "react";
import { Card, Button, Tooltip } from "antd";
import {
  DollarOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

export const VacancyCard = ({ vacancy }) => {
  const role = loadState("user");
  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/vacancies/${vacancy.id}`
      : `/admin/vacancies/${vacancy.id}`;

  return (
    <div className="border-2 rounded-md">
      <div className="vacancy-card w-full p-3 flex justify-between items-center flex-wrap gap-5">
        {/* Vacancy Title */}
        <div className="flex gap-5 items-center justify-center">
          <h2 className="text-lg font-semibold">
            {vacancy.title || "No title"}
          </h2>
        </div>

        {/* Salary Range */}
        <p>
          <DollarOutlined /> {vacancy.salary_from} - {vacancy.salary_to} UZS
        </p>

        {/* Working Types */}
        <p className="border p-1 rounded border-primary font-medium">
          {vacancy.working_types || "N/A"}
        </p>

        {/* Phone Number */}
        <p className="flex items-center gap-2">
          <PhoneOutlined /> {vacancy.phone_number || "No contact"}
        </p>

        {/* Location */}
        <p className="text-gray-500">
          City ID: {vacancy.location.city_id}, District ID:{" "}
          {vacancy.location.district_id}
        </p>

        {/* Detail Link */}
        <div className="flex gap-16 justify-center items-center">
          <Tooltip title="Batafsil ko'rish">
            <Link to={detailLink}>
              <Button
                className="bg-blue-500 text-white"
                icon={<InfoCircleOutlined />}
                type="primary"
              ></Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
