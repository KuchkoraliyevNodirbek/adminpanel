import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Typography, Flex } from "antd";
import { Loading } from "../../components/loading/loading";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { useUpdateCities } from "../../service/mutation/useUpdateCities";
import { citiesBackLink } from "../../routes/paths";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const EditCities = () => {
  const { id } = useParams();
  const { data: city, isLoading } = useGetCitiesById(id);
  const { mutate, isPending } = useUpdateCities();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (city) {
      form.setFieldsValue(city);
    }
  }, [city, form]);

  const onFinish = async (values) => {
    mutate(
      { id, ...values },
      {
        onSuccess: () => {
          navigate(citiesBackLink);
          message.success("shahar yangilani!");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex vertical justify="center" align="center">
      <Flex className="w-full">
        <Link to={citiesBackLink}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            ortga
          </Button>
        </Link>
      </Flex>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6 border-2 max-w-5xl p-6 bg-accent shadow-dark shadow-md text-center rounded-lg mt-6 "
      >
        <Typography.Title level={3}>Shaharni Tahrirlash</Typography.Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label="Nom (O'zbek)"
            name={["name", "uz"]}
            rules={[{ required: true, message: "Bu maydon talab qilinadi" }]}
          >
            <Input size="large" placeholder="nom" />
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

        <Form.Item className="text-center">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="mx-auto font-bold py-3 w-full max-w-lg"
          >
            {isPending ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
