import React from "react";
import { Routes, Route } from "react-router-dom";

// import { NotFound } from "./pages/notFound/notFound";
import { Login } from "./pages/auth/login";
import { AdminLayout } from "./pages/admin/admin-layout";
import { CreateProduct } from "./pages/admin/create-product";
import { CreateCacansy } from "./pages/admin/create-vacansy";
import { SuperAdminLayout } from "./pages/super-admin/super-admin-layout";
import { AdminChange } from "./pages/super-admin/admin-change";
import { AdminCreate } from "./pages/super-admin/admin-create";
import { SuperAdminSideBar } from "./pages/super-admin/super-admin-sidebar";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CreateProduct />} />
          <Route path="create-vacancy" element={<CreateCacansy />} />
        </Route>

        <Route path="/super-admin" element={<SuperAdminLayout />}>
          {/* <Route index element={<SuperAdminSideBar />} /> */}
          <Route path="admin-create" element={<AdminCreate />} />
          <Route path="admin-change" element={<AdminChange />} />
        </Route>

        <Route path="*" element={<h1>lorem...</h1>} />
      </Routes>
    </div>
  );
};

export default App;
