import React from "react";
import { CreateAuthorsForm } from "../../components/authors/create-authors-form";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { authorsBackLink } from "../../routes/paths";

export const CreateAuthors = () => {
  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        gap={24}
        className="w-full"
      >
        <CreateAuthorsForm />
        <Link to={authorsBackLink}>
          <Button icon={<ArrowLeftOutlined />} type="primary">
            ortga
          </Button>
        </Link>
      </Flex>
    </>
  );
};
