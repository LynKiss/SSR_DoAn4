import {
  DashboardOutlined,
  TeamOutlined,
  FileOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { URLS } from "@/routes/urls";
import { PERMS } from "./roles";

export type AppMenuItem = Required<MenuProps>["items"][number] & {
  path?: string;
  permission?: string;
  children?: AppMenuItem[];
};

export const MENU_VI: AppMenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: URLS.DASHBOARD,
  },
  {
    key: "sales",
    icon: <TeamOutlined />,
    label: "Bán hàng",
    children: [
      {
        key: "customers",
        label: "Khách hàng",
        path: URLS.SALES_CUSTOMERS,
        permission: PERMS.CUSTOMER_READ,
      },
      {
        key: "orders",
        label: "Đơn hàng (sắp có)",
        path: URLS.SALES_ORDERS,
      },
      {
        key: "quotations",
        label: "Báo giá (sắp có)",
        path: URLS.SALES_QUOTATIONS,
      },
    ],
  },
  {
    key: "files",
    icon: <FileOutlined />,
    label: "Tệp tin",
    path: URLS.FILES,
    permission: PERMS.FILES_READ,
  },
  {
    key: "system",
    icon: <SafetyCertificateOutlined />,
    label: "Hệ thống",
    children: [
      {
        key: "audit",
        label: "Nhật ký hoạt động",
        path: URLS.AUDIT_LOGS,
        permission: PERMS.AUDIT_READ,
      },
      {
        key: "status",
        icon: <SwapOutlined />,
        label: "Trạng thái & Lịch sử",
        path: URLS.STATUS,
        permission: PERMS.STATUS_READ,
      },
    ],
  },
];
