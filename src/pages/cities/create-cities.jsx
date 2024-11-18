import React from "react";
import { CreateCitiesForm } from "../../components/create-cities-form/create-cities-form";
import { Flex } from "antd";

export const CreateCities = () => {
  return (
    <>
      <Flex justify="center">
        <CreateCitiesForm />
      </Flex>
    </>
  );
};
