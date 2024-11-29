import React from "react";
import { VacanciesList } from "../../components/vacancies/vacancies-list";
import { Flex } from "antd";

export const Vacancies = () => {
  return (
    <Flex className="w-fit">
      <VacanciesList />
    </Flex>
  );
};
