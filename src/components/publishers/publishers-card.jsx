import React, { useState } from "react";
import { Button, Tooltip, Switch, message, Modal, Flex } from "antd";
import {
  PhoneOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useChangeStatus } from "../../service/mutation/publishers/useChangePublisherStatus";
import { useDeleteById } from "../../service/mutation/useDeleteById";
import { publishersEndPoints } from "../../config/endpoints";

export const PublisherCard = ({ publisher }) => {
  const [status, setStatus] = useState(publisher.status === "true");
  const { mutate, isPending: changeLoading } = useChangeStatus();

  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    mutate: deltePublisher,
    error: deleteError,
    isPending,
  } = useDeleteById(
    publishersEndPoints.delete,
    publishersEndPoints.list,
    false
  );

  const detailLink = `/admin/publishers-detail/${publisher.id}`;

  const handleStatusChange = (checked) => {
    setStatus(checked);
    mutate(
      { id: publisher.id, status: checked },
      {
        onSuccess: () => {
          message.success("Status muvaffaqiyatli o'zgartirildi!");
        },
        onError: () => {
          message.error("Xatolik yuz berdi, qayta urinib ko'ring!");
          setStatus(!checked);
        },
      }
    );
  };

  const handleDelete = () => {
    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    deltePublisher(publisher.id, {
      onSuccess: () => {
        message.success("Nashriyot muvaffaqiyatli o'chirildi!");
        setConfirmVisible(false);
      },
      onError: () => {
        message.error(deleteError?.message);
        setConfirmVisible(false);
      },
    });
  };

  return (
    <div className="border-2 rounded-md bg-accent shadow-sm shadow-dark">
      <Flex
        justify="space-between"
        align="center"
        wrap
        gap={24}
        className="p-3"
      >
        <Flex wrap justify="center" align="center" gap={24}>
          <img
            alt={publisher.name}
            src={publisher.image_url}
            style={{ maxHeight: "200px", objectFit: "cover" }}
            className="w-20 max-h-20 h-full rounded-md object-cover border-2"
          />
          <h2 className="max-w-40 w-full min-w-40">{publisher.name}</h2>
        </Flex>
        <p>
          <PhoneOutlined /> {publisher.phone_number}
        </p>

        <p className="border p-1 rounded border-primary font-medium">
          {publisher.type}
        </p>

        <Flex gap={24} justify="center" align="center">
          <Tooltip title="status o'zgartirish">
            <div className="flex items-center gap-2">
              <Switch
                checked={status}
                onChange={handleStatusChange}
                loading={changeLoading}
              />
            </div>
          </Tooltip>

          <Tooltip title="Batafsil ko'rish">
            <Link to={detailLink}>
              <Button
                className="bg-blue-500 text-white"
                icon={<InfoCircleOutlined />}
                type="primary"
              ></Button>
            </Link>
          </Tooltip>

          <Tooltip title="O'chirish">
            <Button
              type="default"
              loading={isPending}
              onClick={handleDelete}
              disabled={isPending}
              icon={<DeleteOutlined />}
              className="bg-red-500 text-white"
            />
          </Tooltip>
        </Flex>
      </Flex>

      <Modal
        title="O'chirishni tasdiqlang"
        open={confirmVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        okText="O'chirish"
        cancelText="Bekor qilish"
      >
        <p>Nashriyotchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};
