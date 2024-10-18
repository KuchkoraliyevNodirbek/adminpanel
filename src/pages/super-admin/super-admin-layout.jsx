import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SuperAdminSideBar } from "./super-admin-sidebar";
import { Layout, Button, Drawer, Tooltip } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { loadState } from "../../config/stroge";
import { toast } from "react-toastify";

const { Header, Sider, Content } = Layout;

export const SuperAdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

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
    toast.info("Kirish uchun qayta login qilishingiz kerak", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });

    // Foydalanuvchini login sahifasiga qayta yo'naltirish
    navigate("/", { replace: true });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        className="hidden lg:block"
      >
        <SuperAdminSideBar collapsed={collapsed} closeDrawer={closeDrawer} />
      </Sider>

      <Layout className="site-layout">
        <Header className="flex justify-between items-center shadow-md p-2 bg-[#CDCDCD]">
          <Button
            type="primary"
            onClick={drawerVisible ? closeDrawer : showDrawer}
            className="lg:hidden"
            icon={drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className="hidden lg:flex ml-4"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <h1 className={`text-lg font-bold text-center flex-1 text-dark`}>
            Super Administrator Paneli
          </h1>

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
          title="Super Admin Menu"
          placement="left"
          onClose={closeDrawer}
          visible={drawerVisible}
          className="lg:hidden"
          bodyStyle={{ padding: 0 }}
          headerStyle={{ backgroundColor: "#001529", color: "white" }}
        >
          <SuperAdminSideBar collapsed={false} closeDrawer={closeDrawer} />
        </Drawer>
      </Layout>
    </Layout>
  );
};
