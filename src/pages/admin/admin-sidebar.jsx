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
} from "@ant-design/icons"; // Ant Design ikonalarini import qilamiz
import { Menu } from "antd";

import { LogoIcon } from "../../assets/LogoIcon";

export const AdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer(); // Close the drawer/modal
  };
  const location = useLocation();
  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]} // Aktiv menyu elementini yo'l bo'yicha tanlash
      defaultSelectedKeys={[location.pathname]} // Sahifa yangilanganda aktiv bo'lib turishi uchun
      // theme="dark"
      className="bg-primary"
      style={{
        height: "100%",
      }}
    >
      <div className="hidden p-1 py-3 md:flex justify-center static top-0">
        <LogoIcon />
      </div>
      <Menu.Item
        key="/admin/categories"
        icon={<AppstoreOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/categories">Kategoriyalar</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/authors"
        icon={<ReadOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="authors">Authors</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/cities"
        icon={<EnvironmentOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="cities">Cities</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/languages"
        icon={<GlobalOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="languages">Languages</Link>
      </Menu.Item>

      <Menu.Item
        key={"/admin/publishers"}
        icon={<BankOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="publishers">Publishers</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/books"
        icon={<BookOutlined />} // New icon for books
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/books">
          <span className="menu-text">Books</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/profile"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/profile">Profil</Link>
      </Menu.Item>

      <Menu.Item
        key="/admin/vacancies"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/admin/vacancies">Vacanciesa</Link>
      </Menu.Item>
    </Menu>
  );
};
