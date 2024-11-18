import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Flex, notification, Spin } from "antd";
import { useUpdateCategory } from "../../service/mutation/useUpdateCategory";
import { useGetCategoryById } from "../../service/query/useGetCAtegoryById";

export const EditCategory = () => {
  const { id } = useParams();
  const { data: category, isLoading } = useGetCategoryById(id);
  const { mutate, isPending } = useUpdateCategory();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const backLink = `/admin/categories`;

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  const onFinish = async (data) => {
    mutate(
      { id, ...data },
      {
        onSuccess: () => {
          navigate(backLink);
          notification.success({
            message: "Muvaffaqiyat",
            description: "Kategoriya yangilandi!",
          });
        },
        onError: () => {
          notification.error({
            message: "Xatolik",
            description: "Kategoriya yangilanmadi...",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-accent shadow-dark shadow-md border border-gray-200 rounded-lg mt-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Kategoriyani Tahrirlash
      </h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label="Nom (O'zbek):"
            name={["name", "uz"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Nom (Ingliz):"
            name={["name", "en"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Nom (Rus):"
            name={["name", "ru"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>

        <Form.Item
          label="Tavsif (O'zbek):"
          name={["description", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tavsif (Ingliz):"
          name={["description", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tavsif (Rus):"
          name={["description", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Flex>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="w-full max-w-lg mx-auto"
          >
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </Flex>
      </Form>
    </div>
  );
};
