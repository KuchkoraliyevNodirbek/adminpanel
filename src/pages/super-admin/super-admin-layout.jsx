import React from "react";
import { Outlet } from "react-router-dom";
import { SuperAdminSideBar } from "./super-admin-sidebar";
import { Layout } from "antd";

const { Sider, Content } = Layout;

export const SuperAdminLayout = () => {
  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider width={256} className="bg-white shadow-lg">
        <SuperAdminSideBar />
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content className="p-8 bg-gray-100">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
