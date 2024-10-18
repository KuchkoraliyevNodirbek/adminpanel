import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Layout, Button, Drawer, Tooltip, Space } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { AdminSideBar } from "./admin-sidebar";
import { toast } from "react-toastify";
import { loadState } from "../../config/stroge"; // loadState to'g'ri yo'ldan chaqirilganiga ishonch hosil qiling

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate(); // React Router navigate hook

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // user objectni loadState orqali olish
  const user = loadState("user");
  const role = user?.role; // role olish

  const handleLogout = () => {
    // Tokenlarni va role'ni o'chirish
    localStorage.removeItem("user"); // butun user obyekti o'chiriladi

    // Kirish uchun qayta login qilish xabari
    toast.info("Kirish Uchun Qayta Login Qiling!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });

    // Foydalanuvchini login sahifasiga qayta yo'naltirish
    navigate("/", { replace: true });
  };

  if (role === "admin") {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="hidden lg:block bg-primary"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <AdminSideBar collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header className="p-0 flex justify-between items-center shadow-md bg-primary">
            <Button
              type="primary"
              onClick={showDrawer}
              className="lg:hidden"
              icon={<MenuUnfoldOutlined />}
            />
            <Button
              type="primary"
              onClick={toggleCollapsed}
              className="hidden lg:flex ml-4"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <Space>
              <h1 className={`text-lg font-bold text-center flex-1 text-dark`}>
                Administrator Paneli
              </h1>
            </Space>

            {/* Logout tugmasi */}
            <Tooltip title="Tizimdan chiqish">
              <Button
                type="primary"
                className="mr-5"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              ></Button>
            </Tooltip>
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              backgroundColor: "#fff",
            }}
          >
            <Outlet />
          </Content>

          <Drawer
            title="Admin Menu"
            placement="left"
            onClose={closeDrawer}
            visible={drawerVisible}
            className="lg:hidden"
            bodyStyle={{padding:0}}
            headerStyle={{background:"#001529", color:"white"}}
          >
            <AdminSideBar collapsed={false} />
          </Drawer>
        </Layout>
      </Layout>
    );
  }
  return <Navigate to="/" />;
};
