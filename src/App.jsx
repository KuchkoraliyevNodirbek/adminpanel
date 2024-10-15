import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { AdminLayout } from "./pages/admin/admin-layout";
import { CreateProduct } from "./pages/admin/create-product";
import { CreateCacansy } from "./pages/admin/create-vacansy";
import { SuperAdminLayout } from "./pages/super-admin/super-admin-layout";
import { AdminChange } from "./pages/super-admin/admin-change";
import { AdminCreate } from "./pages/super-admin/admin-create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/super-admin/profile";
import { ProfileEditPage } from "./pages/super-admin/update-profile";
import { AdminProfile } from "./pages/admin/admin-profile";
import { AdminDetailPage } from "./pages/super-admin/users-detail-page";
import { ProtectedRoute } from "./pages/auth/protected"; // Himoyalangan marshrutlar uchun
import { NotFoundPage } from "./pages/404/404"; // 404 sahifa
import { Categories } from "./pages/admin/categories";

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
            <Route index element={<CreateProduct />} />
            <Route path="create-vacancy" element={<CreateCacansy />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
            <Route path="Categories" element={<Categories/>} />

          </Route>
        </Route>

        {/* Super-admin yo'nalishlari */}
        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route path="admin-create" element={<AdminCreate />} />
            <Route path="admin-change" element={<AdminChange />} />
            <Route
              path="/super-admin/detail-page/:id"
              element={<AdminDetailPage />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileEditPage />} />
          </Route>
        </Route>

        {/* 404 sahifa */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
