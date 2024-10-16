import React from "react";
import CategoriesList from "../../components/category-List/category-List";
import { CategoriesFilter } from "../../components/category-filter/category-filter";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";
import { Button, Row, Col } from "antd";

export const Categories = () => {
  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-categories`
      : `/admin/create-categories`;

  return (
    <div className="relative">
      <div className="top-0 sticky p-3 bg-white border-2 border-b-blue-500">
        <Row justify="space-between" align="middle">
          <Col>
            <Link to={detailLink}>
              <Button
                type="primary"
                style={{ width: "100%", borderColor: "#3b82f6" }}
              >
                Category yaratish
              </Button>
            </Link>
          </Col>
          <Col>
            <CategoriesFilter />
          </Col>
        </Row>
      </div>

      <div>
        <CategoriesList />
      </div>
    </div>
  );
};
