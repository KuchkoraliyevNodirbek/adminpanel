import React from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./pages/auth/login";

import { AdminLayout } from "./pages/admin/admin-layout";
import { SuperAdminLayout } from "./pages/super-admin/super-admin-layout";

import { AdminCreate } from "./pages/super-admin/admin-create";
import { AdminChange } from "./pages/super-admin/admin-change";
import { AdminDetailPage } from "./pages/super-admin/users-detail-page";

import { Profile } from "./pages/profile/profile";
import { ProfileEditPage } from "./pages/profile/update-profile";

import { ProtectedRoute } from "./pages/auth/protected"; // Himoyalangan marshrutlar uchun
import { NotFoundPage } from "./pages/404/404"; // 404 sahifa

import { Categories } from "./pages/categories/categories";
import { CreateCategory } from "./pages/categories/create-category";
import { CategoryDetailPage } from "./pages/categories/category-detail";
import EditCategory from "./pages/categories/update-category";

import { Authors } from "./pages/authors/authors";
import { CreateAuthors } from "./pages/authors/create-authors";
import EditAuthors from "./pages/authors/update-authors";
import { AuthorsDetailPage } from "./pages/authors/authors-detail";
import { Cities } from "./pages/cities/cities";
import { CreateCities } from "./pages/cities/create-cities";
import { EditCities } from "./pages/cities/update-cities";
import { CitiesDetail } from "./pages/cities/cities-detail";
import { CreateDistrict } from "./pages/districts/create-district";
import { UpdateDistrict } from "./pages/districts/update-district";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Login sahifasi */}
        <Route path="/" element={<Login />} />

        {/* Admin yo'nalishlari */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="create-categories" element={<CreateCategory />} />
            <Route path="categories-update/:id" element={<EditCategory />} />
            <Route
              path="categories-detail/:id"
              element={<CategoryDetailPage />}
            />
            {/* Move Authors route inside SuperAdminLayout */}
            <Route path="authors" element={<Authors />} />
            <Route path="create-authors" element={<CreateAuthors />} />
            <Route path="authors-update/:id" element={<EditAuthors />} />
            <Route path="authors-detail/:id" element={<AuthorsDetailPage />} />

            <Route path="cities" element={<Cities />} />
            <Route path="create-cities" element={<CreateCities />} />
            <Route path="cities-update/:id" element={<EditCities />} />
            <Route path="cities-detail/:id" element={<CitiesDetail />} />

            <Route path="create-district/:id" element={<CreateDistrict />} />
            <Route path="update-district/:id" element={<UpdateDistrict />} />
          </Route>
        </Route>

        {/* Super-admin yo'nalishlari */}
        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route path="admin-create" element={<AdminCreate />} />
            <Route path="admin-change" element={<AdminChange />} />
            <Route path="detail-page/:id" element={<AdminDetailPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="create-categories" element={<CreateCategory />} />
            <Route path="categories-update/:id" element={<EditCategory />} />
            <Route
              path="categories-detail/:id"
              element={<CategoryDetailPage />}
            />
            {/* Move Authors route inside SuperAdminLayout */}
            <Route path="authors" element={<Authors />} />
            <Route path="create-authors" element={<CreateAuthors />} />
            <Route path="authors-update/:id" element={<EditAuthors />} />
            <Route path="authors-detail/:id" element={<AuthorsDetailPage />} />

            <Route path="cities" element={<Cities />} />
            <Route path="create-cities" element={<CreateCities />} />
            <Route path="cities-update/:id" element={<EditCities />} />
            <Route path="cities-detail/:id" element={<CitiesDetail />} />

            <Route path="create-district/:id" element={<CreateDistrict />} />
            <Route path="update-district/:id" element={<UpdateDistrict />} />
          </Route>
        </Route>

        {/* 404 sahifa */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
