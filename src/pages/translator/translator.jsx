import React from "react";
import { TranslatorList } from "../../components/translator-file/translator-list";
import { TranslatorFilter } from "../../components/translator-file/translator-filter";
import { Row } from "antd";

export const Translator = () => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-b-2 border-b-dark z-50">
        <Row justify="space-between" align="middle">
          <TranslatorFilter />
        </Row>
      </div>
      <div className="mt-5">
        <TranslatorList />
      </div>
    </div>
  );
};
