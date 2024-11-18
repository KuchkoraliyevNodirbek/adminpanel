import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  BookOutlined,
  BankOutlined,
  ReadOutlined,
  SolutionOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { LogoIcon } from "../../assets/LogoIcon";
import { loadState } from "../../config/stroge";

export const AdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer();
  };
  const location = useLocation();

  const superMenuItems = [
    {
      key: "/admin/admin-create",
      icon: <UserAddOutlined />,
      label: "Admin Yaratish",
    },
    {
      key: "/admin/admin-change",
      icon: <TeamOutlined />,
      label: "Adminlar",
    },
    {
      key: "/admin/all-users",
      icon: <TeamOutlined />,
      label: "Foydalanuvchilar",
    },
  ];

  const menuItems = [
    {
      key: "/admin/categories",
      icon: <AppstoreOutlined />,
      label: "Kategoriyalar",
    },
    { key: "/admin/authors", icon: <ReadOutlined />, label: "Mualliflar" },
    { key: "/admin/cities", icon: <EnvironmentOutlined />, label: "Shaharlar" },
    { key: "/admin/languages", icon: <GlobalOutlined />, label: "Tillar" },
    {
      key: "/admin/publishers",
      icon: <BankOutlined />,
      label: "Nashriyotchilar",
    },
    { key: "/admin/books", icon: <BookOutlined />, label: "Kitoblar" },
    {
      key: "/admin/vacancies",
      icon: <SolutionOutlined />,
      label: "Vakansiyalar",
    },
    { key: "/admin/translator", icon: <UserOutlined />, label: "Tarjimonlar" },
    { key: "/admin/profile", icon: <UserOutlined />, label: "Profil" },
  ];

  const user = loadState("user"); // localStorage-dan foydalanuvchi ma'lumotini olish

  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={[location.pathname]}
      className="bg-primary"
      style={{ height: "100%" }}
    >
      <div className="hidden p-1 py-3 md:flex justify-center static top-0">
        <LogoIcon />
      </div>

      {user?.role === "superadmin" && (
        <>
          {superMenuItems.map(({ key, icon, label }) => (
            <Menu.Item key={key} icon={icon} onClick={handleMenuItemClick}>
              <Link to={key}>{label}</Link>
            </Menu.Item>
          ))}
        </>
      )}

      {menuItems.map(({ key, icon, label }) => (
        <Menu.Item key={key} icon={icon} onClick={handleMenuItemClick}>
          <Link to={key}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
