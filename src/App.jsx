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
// import { AdminDelete } from "./pages/super-admin/admin-delete";
// import SingleAdmin from "./pages/super-admin/single-admin";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CreateProduct />} />
          <Route path="create-vacancy" element={<CreateCacansy />} />
        </Route>

        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route path="admin-create" element={<AdminCreate />} />
          <Route path="admin-change" element={<AdminChange />} />
        </Route>

        <Route path="*" element={<h1>lorem...</h1>} />
      </Routes>
    </div>
  );
};

export default App;
