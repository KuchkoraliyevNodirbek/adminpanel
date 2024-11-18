import React from "react";
import { CreateCategoryForm } from "../../components/create-category-form/create-category-form";
import { Flex } from "antd";

export const CreateCategory = () => {
  return (
    <>
      <Flex justify="center">
        <CreateCategoryForm />
      </Flex>
    </>
  );
};
