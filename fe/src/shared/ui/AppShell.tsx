import { useState } from "react";
import {
  Layout,
  Menu,
  Switch,
  Typography,
  Avatar,
  Dropdown,
  Button,
  Badge,
} from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  BankOutlined,
  TruckOutlined,
  DollarOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  BulbOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export default function AppShell({ children, user, onLogout }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "production",
      icon: <BankOutlined />,
      label: "Sản xuất",
    },
    {
      key: "warehouse",
      icon: <ShopOutlined />,
      label: "Kho hàng",
    },
    {
      key: "sales",
      icon: <ShoppingCartOutlined />,
      label: "Bán hàng",
    },
    {
      key: "shipping",
      icon: <TruckOutlined />,
      label: "Giao hàng",
    },
    {
      key: "finance",
      icon: <DollarOutlined />,
      label: "Tài chính",
    },
    {
      key: "hr",
      icon: <UserOutlined />,
      label: "Nhân sự",
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: onLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: darkMode ? "#001529" : "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
        width={256}
        collapsedWidth={80}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: "linear-gradient(45deg, #1890ff, #722ed1)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: collapsed ? 16 : 18,
            boxShadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
          }}
        >
          {collapsed ? "ERP" : "SSR ERP System"}
        </div>
        <Menu
          theme={darkMode ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          style={{
            borderRight: 0,
            background: "transparent",
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: darkMode ? "#001529" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${darkMode ? "#303030" : "#f0f0f0"}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
            position: "sticky",
            top: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 40,
                height: 40,
                color: darkMode ? "#fff" : "#000",
              }}
            />

            <div style={{ marginLeft: 16 }}>
              <Text
                strong
                style={{ color: darkMode ? "#fff" : "#000", fontSize: 16 }}
              >
                Chào mừng đến với hệ thống ERP
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Quản lý doanh nghiệp thông minh và hiệu quả
              </Text>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BulbOutlined
                style={{ color: darkMode ? "#fff" : "#000", fontSize: 16 }}
              />
              <Switch size="small" checked={darkMode} onChange={setDarkMode} />
            </div>

            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{
                  color: darkMode ? "#fff" : "#000",
                  fontSize: 16,
                }}
              />
            </Badge>

            {user && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: 8,
                    transition: "all 0.3s",
                    border: `1px solid ${darkMode ? "#303030" : "#f0f0f0"}`,
                  }}
                >
                  <Avatar
                    size="small"
                    icon={<UserOutlined />}
                    src={user.avatar}
                    style={{ marginRight: 8, backgroundColor: "#1890ff" }}
                  />
                  <div style={{ textAlign: "left" }}>
                    <Text
                      strong
                      style={{
                        color: darkMode ? "#fff" : "#000",
                        fontSize: 12,
                      }}
                    >
                      {user.name}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 10 }}>
                      {user.email}
                    </Text>
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
        </Header>

        <Content
          style={{
            margin: "24px",
            padding: "24px",
            minHeight: "calc(100vh - 112px)",
            background: darkMode ? "#141414" : "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
