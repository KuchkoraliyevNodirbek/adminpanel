import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Flex, Typography } from "antd";
import { Loading } from "../../components/loading/loading";
import { useUpdatelanguage } from "../../service/mutation/useUpdateLanguage";
import { useGetLanguagesById } from "../../service/query/useGetLanguagesById";

export const EditLanguages = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetLanguagesById(id);
  const { mutate, isPending } = useUpdatelanguage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: {
          uz: data?.uz,
          en: data?.en,
          ru: data?.ru,
        },
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    mutate(
      { id, ...values },
      {
        onSuccess: () => {
          navigate(-1);
          message.success("Til yangilandi!");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="max-w-5xl mx-auto p-6 bg-accent shadow-dark shadow-md border rounded-lg mt-6 text-center"
    >
      <Typography.Title level={3}>Tilni Tahrirlash</Typography.Title>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <Form.Item
          label="Nom (O'zbek)"
          name={["name", "uz"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="nomini kiriting" />
        </Form.Item>

        <Form.Item
          label="Nom (Ingliz)"
          name={["name", "en"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="name" />
        </Form.Item>

        <Form.Item
          label="Nom (Rus)"
          name={["name", "ru"]}
          rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
        >
          <Input size="large" placeholder="Название" />
        </Form.Item>
      </div>

      <Flex justify="center" className="w-full text-center">
        <Button
          block
          className="max-w-md"
          size="large"
          type="primary"
          htmlType="submit"
          loading={isPending}
        >
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </Flex>
    </Form>
  );
};
