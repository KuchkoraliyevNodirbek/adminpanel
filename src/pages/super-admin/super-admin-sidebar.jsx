import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  UserAddOutlined, // For adding an admin
  TeamOutlined, // For listing all admins
  AppstoreAddOutlined, // For categories (changed from AppstoreOutlined)
  UserOutlined, // For profile
  BookOutlined, // For books (new icon)
  ReadOutlined, // For authors (new icon)
  EnvironmentOutlined, // For cities
} from "@ant-design/icons";
import { LogoIcon } from "../../assets/LogoIcon";

export const SuperAdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer(); // Close the drawer/modal
  };

  const location = useLocation();

  return (
    <Menu
      mode={collapsed ? "vertical" : "inline"}
      selectedKeys={[location.pathname]} // Highlight active menu item
      defaultSelectedKeys={[location.pathname]} // Keep active on refresh
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
        key="/super-admin/admin-create"
        icon={<UserAddOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/admin-create">
          <span className="menu-text">Admin Yaratish</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/admin-change"
        icon={<TeamOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/admin-change">
          <span className="menu-text">Hamma Adminlar</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/categories"
        icon={<AppstoreAddOutlined />} // Changed icon for categories
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/categories">
          <span className="menu-text">Kategoriyalar</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/cities"
        icon={<EnvironmentOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/cities">
          <span className="menu-text">Cities</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/profile"
        icon={<UserOutlined />}
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/profile">
          <span className="menu-text">Profil</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/authors"
        icon={<ReadOutlined />} // New icon for authors
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/authors">
          <span className="menu-text">Authors</span>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="/super-admin/books"
        icon={<BookOutlined />} // New icon for books
        onClick={handleMenuItemClick}
      >
        <Link to="/super-admin/books">
          <span className="menu-text">Books</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
