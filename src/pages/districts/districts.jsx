import React from "react";
import { Row } from "antd";
import { DistrictFilter } from "../../components/district-filter/district-filter";
import { DistrictsList } from "../../components/districts-list/districts-list";

export const Districts = ({ cityId }) => {
  return (
    <div className="relative">
      <div className="top-0 sticky p-3 z-50 bg-accent border-b-2 border-dark">
        <Row justify="space-between" align="middle">
          <DistrictFilter cityId={cityId} />
        </Row>
      </div>
      <div className="mt-5">
        <DistrictsList cityId={cityId} />
      </div>
    </div>
  );
};
