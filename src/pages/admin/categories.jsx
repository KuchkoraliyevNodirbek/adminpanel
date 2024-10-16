import React from "react";
import CategoriesList from "../../components/category-List/category-List";
import CreateCategoryForm from "../../components/create-category-form/create-category-form";
import { CategoriesFilter } from "../../components/category-filter/category-filter";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

export const Categories = () => {

  const role = loadState("user")

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-categories`
      : `/admin/create-categories`;
  return (
    <>
      <div>Categories</div>
      <div className="">{/* <CategoriesFilter/> */}</div>

      <div className="">
        {/* <CreateCategoryForm/> */}

        <Link to={detailLink}>
          <button className="bg-blue-500 text-white p-2 rounded">
            Category yaratish
          </button>
        </Link>
      </div>

      <div className="">
        <CategoriesList />
      </div>
    </>
  );
};
