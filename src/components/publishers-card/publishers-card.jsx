import React from "react";
import { Card, Button, Row, Col, Tooltip } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  InfoCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

export const PublisherCard = ({ publisher }) => {
  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/publishers-detail/${publisher.id}`
      : `/admin/publishers-detail/${publisher.id}`;
  return (
    <>
      <div className="border-2 rounded-md">
        <div className="publisher-card w-full p-3 flex justify-between items-center flex-wrap gap-5">
          <div className="">
            <img
              alt={publisher.name}
              src={publisher.image_url}
              style={{ maxHeight: "200px", objectFit: "cover" }}
              className="w-20 rounded-md object-cover border-2"
            />
          </div>
          <h2>{publisher.name}</h2>
          <p>
            <PhoneOutlined /> {publisher.phone_number}
          </p>
          <p className="border p-1 rounded border-primary font-medium">{publisher.type}</p>
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
    </> 
  );
};
