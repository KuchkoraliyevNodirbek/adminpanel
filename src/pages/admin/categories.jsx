import React from "react";
import CategoriesList from "../../components/category-List/category-List";
import CreateCategoryForm from "../../components/create-category-form/create-category-form";
import { CategoriesFilter } from "../../components/category-filter/category-filter";
import { Link } from "react-router-dom";
import { loadState } from "../../config/stroge";

export const Categories = () => {
  const role = loadState("user");

  const detailLink =
    role.role === "superadmin"
      ? `/super-admin/create-categories`
      : `/admin/create-categories`;
  return (
    <div className="relative">
      
      <div className="top-0 sticky p-3 bg-white border-2 border-b-blue-500">
        {/* <CreateCategoryForm/> */}

        <Link to={detailLink}>
          <button className="bg-blue-500 hover:bg-green-500 text-white px-2 py-2 border-2 border-blue-500 rounded max-w-96 w-full absolute ">
            Category yaratish
          </button>
        </Link>
        <div className="">
          <CategoriesFilter />
        </div>
      </div>

      <div className="">
        <CategoriesList />
      </div>
    </div>
  );
};
