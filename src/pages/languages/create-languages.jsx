import React from "react";
import { CreateLanguagesForm } from "../../components/create-languages-form/create-languages-form";
import { Flex } from "antd";

export const CreateLanguages = () => {
  return (
    <>
      <Flex justify="center" className=" border">
        <CreateLanguagesForm/>
      </Flex>
    </>
  );
};
