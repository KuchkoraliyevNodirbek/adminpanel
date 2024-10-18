import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons"; // Ant Design ikonalarini import qilamiz
import { Menu } from "antd";

import { LogoIcon } from "../../assets/LogoIcon";

export const AdminSideBar = ({ collapsed }) => {
  const location = useLocation();
  return (
    <div className="py-2 pt-0 text-white">
      <Menu
         selectedKeys={[location.pathname]} // Aktiv menyu elementini yo'l bo'yicha tanlash
         defaultSelectedKeys={[location.pathname]} // Sahifa yangilanganda aktiv bo'lib turishi uchun
        // theme="dark"
        mode="inline"
        className="bg-primary h-full"
      >
        <div className="hidden p-1 py-3 md:flex justify-center static top-0">
          <LogoIcon />
        </div>
        <Menu.Item key="/admin/categories" icon={<AppstoreOutlined />}>
          <Link to="/admin/categories">
            Kategoriyalar
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/profile" icon={<UserOutlined />}>
          <Link to="/admin/profile">Profil</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
