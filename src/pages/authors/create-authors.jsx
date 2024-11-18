import React from "react";
import { CreateAuthorsForm } from "../../components/create-authors-form/create-authors-form";
import { Flex } from "antd";

export const CreateAuthors = () => {
  return (
    <>
      <Flex justify="center" className="w-full">
        <CreateAuthorsForm />
      </Flex>
    </>
  );
};
