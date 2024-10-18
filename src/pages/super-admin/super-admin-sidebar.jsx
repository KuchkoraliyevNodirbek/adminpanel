import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LogoIcon } from "../../assets/LogoIcon";

export const SuperAdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer(); // Modalni yopish
  };

  const location = useLocation();

  return (
    <Menu
      // theme="light"
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]} // Aktiv menyu elementini yo'l bo'yicha tanlash
      defaultSelectedKeys={[location.pathname]} // Sahifa yangilanganda aktiv bo'lib turishi uchun
      style={{
        backgroundColor: "#CDCDCD",
        color: "#e0e0e0",
        height: "100%",
      }}
    >
      <div className="hidden p-1 py-3 md:flex justify-center static top-0">
        <LogoIcon />
      </div>
      <Menu.Item
        className=""
        key="/super-admin/admin-create"
        icon={<UserAddOutlined />}
        onClick={handleMenuItemClick}
      >
        <span className="menu-text ">Admin Yaratish</span>
        <Link to="/super-admin/admin-create" />
      </Menu.Item>

      <Menu.Item
        key="/super-admin/admin-change"
        icon={<TeamOutlined />}
        onClick={handleMenuItemClick}
      >
        <span className="menu-text ">Hamma Adminlar</span>
        <Link to="/super-admin/admin-change" />
      </Menu.Item>

      <Menu.Item
        key="/super-admin/categories"
        icon={<AppstoreOutlined />}
        onClick={handleMenuItemClick}
      >
        <span className="menu-text ">Kategoriyalar</span>
        <Link to="/super-admin/categories" />
      </Menu.Item>

      <Menu.Item
        key="/super-admin/profile"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <span className="menu-text ">Profil</span>
        <Link to="/super-admin/profile" />
      </Menu.Item>
    </Menu>
  );
};
