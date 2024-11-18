import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetVacanciesById } from "../../service/query/useGetVacanciesById";
import { useGetPublisherById } from "../../service/query/useGetPublisherById";
import { useGetCitiesById } from "../../service/query/useGetCitiesById";
import { useGetDistrictsById } from "../../service/query/useGetDistrictsById";
import { Card, Spin, Typography, Divider, Button } from "antd";

const { Title, Text } = Typography;

export const VacanciesDetail = () => {
  const navigate = useNavigate();
  const { id: vacancyId } = useParams();

  const {
    data: vacancy,
    isLoading: loadingVacancy,
    isError: errorVacancy,
  } = useGetVacanciesById(vacancyId);

  const {
    data: publisher,
    isLoading: loadingPublisher,
    isError: errorPublisher,
  } = useGetPublisherById(vacancy?.publisher_id || null);

  const {
    data: city,
    isLoading: loadingCity,
    isError: errorCity,
  } = useGetCitiesById(vacancy?.location?.city_id || null);

  const {
    data: district,
    isLoading: loadingDistrict,
    isError: errorDistrict,
  } = useGetDistrictsById(vacancy?.location?.district_id || null);

  if (loadingVacancy || loadingPublisher || loadingCity || loadingDistrict) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorVacancy || errorPublisher || errorCity || errorDistrict) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text type="danger">
          Tafsilotlarni yuklashda xatolik yuz berdi. Keyinroq qayta urinib
          ko'ring.
        </Text>
      </div>
    );
  }

  return (
    <Card
      title={<Title level={3}>{vacancy?.title || "Mavjud emas"}</Title>}
      className="p-6 max-w-lg mx-auto shadow-md shadow-dark"
      bordered={true}
    >
      <Text strong>Ta'rif: </Text>
      <Text>{vacancy?.description || "Mavjud emas"}</Text>
      <Divider />
      <Text strong>Oylik: </Text>
      <Text>{`${vacancy.salary_from || 0} - ${
        vacancy.salary_to || 0
      } UZS`}</Text>
      <Divider />
      <Text strong>Joylashuv: </Text>
      <Text>
        {city?.name?.uz || "Mavjud emas"}, {district?.name?.uz || "Mavjud emas"}
      </Text>
      <Divider />
      <Text strong>Telefon: </Text>
      <Text>{vacancy.phone_number || "Aloqa ma'lumoti yo'q"}</Text>
      <Divider />
      <Text strong>Ish turi: </Text>
      <Text>{vacancy.working_styles || "Mavjud emas"}</Text>
      <Divider />
      <Text strong>Ish sharoitlari: </Text>
      <Text>{vacancy.working_types || "Mavjud emas"}</Text>
      <Divider />
      <Text strong>Ko'rishlar soni: </Text>
      <Text>{vacancy.view_count || 0}</Text>
      <Divider />
      <Text strong>Holat: </Text>
      <Text>{vacancy.status || "Mavjud emas"}</Text>
      <Divider />
      <Text strong>Chop etuvchi: </Text>
      <Text>{publisher?.name || "Mavjud emas"}</Text>
      <Divider />
      <Text strong>Yaratilgan vaqti: </Text>
      <Text>{vacancy.created_at || "Mavjud emas"}</Text>

      <div>
        <Button onClick={() => navigate(-1)} type="primary" className="mt-4">
          Orqaga
        </Button>
      </div>
    </Card>
  );
};
