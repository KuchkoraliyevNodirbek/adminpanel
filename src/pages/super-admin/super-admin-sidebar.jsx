import React from "react";
import { Link } from "react-router-dom";
import { Menu, Typography, Layout } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Sider } = Layout;

export const SuperAdminSideBar = () => {
  return (
    <Sider
      width={256}
      className="h-full shadow-lg"
      style={{
        backgroundColor: "#2A2D3E", // Updated blue-gray background for sidebar
      }}
    >
      <div className="p-6 text-center">
        <Title
          level={2}
          style={{
            color: "#e0e0e0", // Softer light color for the title
            marginBottom: "24px",
            fontWeight: "bold",
          }}
        >
          Super Admin
        </Title>
        <Menu
          mode="inline"
          defaultSelectedKeys={["/super-admin/admin-create"]}
          style={{
            backgroundColor: "transparent",
            color: "#e0e0e0", // Softer light color for menu items
          }}
        >
          <Menu.Item
            key="/super-admin/admin-create"
            icon={<UserAddOutlined style={{ color: "#5CB85C" }} />} // Slightly muted green icon
            style={{
              color: "#e0e0e0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4A4F63")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Link to="/super-admin/admin-create" style={{ color: "#e0e0e0" }}>
              Admin Create
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/super-admin/admin-change"
            icon={<TeamOutlined style={{ color: "#FFA726" }} />} // Muted orange icon
            style={{
              color: "#e0e0e0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4A4F63")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Link to="/super-admin/admin-change" style={{ color: "#e0e0e0" }}>
              All Admin
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/super-admin/categories"
            icon={<AppstoreOutlined style={{ color: "#42A5F5" }} />} // Softer blue icon
            style={{
              color: "#e0e0e0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4A4F63")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Link to="/super-admin/categories" style={{ color: "#e0e0e0" }}>
              Categories
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/super-admin/profile"
            icon={<UserOutlined style={{ color: "#EC407A" }} />} // Softer pink icon
            style={{
              color: "#e0e0e0",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#4A4F63")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Link to="/super-admin/profile" style={{ color: "#e0e0e0" }}>
              Profile
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};
