import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./pages/auth/login";
import { AdminLayout } from "./pages/admin/admin-layout";
import { ProtectedRoute } from "./pages/auth/protected";
import { NotFoundPage } from "./pages/404/404";

import { SendSmsCode } from "./pages/auth/sendSMS";
import { ResetPasswordByEmail } from "./pages/auth/resetByEmail";
import { ResetPasswordByPhone } from "./pages/auth/resetByPhone";

import { adminRoutes, superAdminRoutes } from "./routes/routes";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<SendSmsCode />} />
        <Route
          path="/reset-password-by-email"
          element={<ResetPasswordByEmail />}
        />
        <Route
          path="/reset-password-by-phone"
          element={<ResetPasswordByPhone />}
        />

        <Route path="*" element={<NotFoundPage />} />

        <Route
          element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
              {superAdminRoutes?.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Route>

            {adminRoutes?.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
