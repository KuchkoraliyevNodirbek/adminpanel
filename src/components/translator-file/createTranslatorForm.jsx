import React from "react";
import { Form, Input, Button, notification, Typography } from "antd";
import { useCreateTranslator } from "../../service/mutation/useCreateTranslator";
import { useNavigate } from "react-router-dom";

export const CreateTranslatorForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateTranslator();

  const onFinish = async (values) => {
    mutate(values, {
      onSuccess: () => {
        notification.success({
          message: "Tarjimon qo'shildi",
        });
        navigate(-1);
      },
    });
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6 p-6 bg-accent shadow-md shadow-dark rounded-lg max-w-4xl mx-auto text-center"
    >
      <Typography.Title level={3}>Tarjimon Yaratish</Typography.Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input size="large" placeholder="Enter surname" />
        </Form.Item>
      </div>

      <Form.Item className="text-center">
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-md"
        >
          {isPending ? "Creating..." : "Create Translator"}
        </Button>
      </Form.Item>
    </Form>
  );
};
