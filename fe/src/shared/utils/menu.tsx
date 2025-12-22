import type { MenuProps } from "antd";
import type { MenuItem } from "../types/menu";

import {
  DashboardOutlined,
  ShoppingCartOutlined,
  SafetyOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <DashboardOutlined />,
  ShoppingCart: <ShoppingCartOutlined />,
  Shield: <SafetyOutlined />,
  ScrollText: <FileSearchOutlined />,
};

export function toAntdMenuItems(menu: MenuItem[]): MenuProps["items"] {
  const walk = (items: MenuItem[]): MenuProps["items"] =>
    items.map((m) => {
      const children = m.children?.length ? walk(m.children) : undefined;
      return {
        key: m.path ?? m.key,
        label: m.label,
        icon: m.icon ? iconMap[m.icon] : undefined,
        children,
      };
    });

  return walk(menu);
}
