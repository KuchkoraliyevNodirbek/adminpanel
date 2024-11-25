import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { LogoIcon } from "../../assets/LogoIcon";
import { loadState } from "../../config/stroge";
import { menuItems, superMenuItems } from "../../routes/routes";

export const AdminSideBar = ({ collapsed, closeDrawer }) => {
  const handleMenuItemClick = () => {
    if (closeDrawer) closeDrawer();
  };
  const location = useLocation();
  const user = loadState("user");

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
            <Menu.Item
              style={{
                color: location.pathname === key && "white",
                backgroundColor: location.pathname === key && "#2c3033",
              }}
              key={key}
              icon={icon}
              onClick={handleMenuItemClick}
            >
              <Link to={key}>{label}</Link>
            </Menu.Item>
          ))}
        </>
      )}

      {menuItems.map(({ key, icon, label }) => (
        <Menu.Item
          style={{
            color: location.pathname === key && "white",
            backgroundColor: location.pathname === key && "#2c3033",
          }}
          key={key}
          icon={icon}
          onClick={handleMenuItemClick}
        >
          <Link to={key}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
