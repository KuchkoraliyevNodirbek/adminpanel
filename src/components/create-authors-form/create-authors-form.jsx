import React, { useState } from "react";
import { Form, Input, Button, notification, Flex, Typography } from "antd";
import { useCreateAuthors } from "../../service/mutation/useCreateAuthors"; // Hook for creating authors
import { useNavigate } from "react-router-dom";

export const CreateAuthorsForm = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreateAuthors();
  const navigate = useNavigate();

  const backLink = `/admin/authors`;

  const onFinish = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate(backLink);
        notification.success({
          message: "Muvaffaqiyat",
          description: "Muallif qo'shildi!",
        });
      },
      onError: () => {
        notification.error({
          message: "Xatolik",
          description: "Muallif yaratishda xatolik yuz berdi.",
        });
      },
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="p-6 bg-accent shadow-md shadow-dark rounded-lg max-w-4xl w-full"
    >
      <Typography.Title
        level={2}
        className="text-2xl font-bold text-center mb-6"
      >
        Muallif Yaratish
      </Typography.Title>
      <Flex
        className="flex-wrap md:flex-nowrap gap-0 md:gap-5"
        justify="space-between"
      >
        <Form.Item
          className="w-full"
          label="Ism:"
          name="name"
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Muallif ismini kiriting" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Familiya:"
          name="surname"
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Muallif familiyasini kiriting" />
        </Form.Item>
      </Flex>

      <Form.Item
        label="Biografiya:"
        name="biography"
        rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
      >
        <Input.TextArea
          placeholder="Muallif biografiyasini kiriting"
          rows={4}
        />
      </Form.Item>
      <Flex>
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="max-w-md mx-auto"
        >
          {isPending ? "Yaratilmoqda..." : "Muallifni Yaratish"}
        </Button>
      </Flex>
    </Form>
  );
};
