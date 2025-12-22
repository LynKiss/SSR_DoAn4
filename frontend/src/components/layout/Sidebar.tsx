import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MENU_VI, type AppMenuItem } from "@/constant/menu.vi";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useMemo } from "react";

const { Sider } = Layout;

function filterByPerm(items: AppMenuItem[], perms: string[]): AppMenuItem[] {
  return (items || [])
    .map((it) => {
      if (!it) return it;
      const item = it as AppMenuItem;
      const children = item.children
        ? filterByPerm(item.children, perms)
        : undefined;
      const allowed = !item.permission || perms.includes(item.permission);

      // group item: show if any child
      if (children && children.length > 0) return { ...item, children };
      if (item.children && (!children || children.length === 0))
        return null as any;
      return allowed ? { ...item, children } : (null as any);
    })
    .filter(Boolean) as AppMenuItem[];
}

function findSelectedKey(
  items: AppMenuItem[],
  pathname: string
): string | undefined {
  for (const it of items) {
    const item = it as AppMenuItem;
    if (item.path && pathname === item.path) return String(item.key);
    if (item.path && pathname.startsWith(item.path + "/"))
      return String(item.key);
    if (item.children) {
      const k = findSelectedKey(item.children, pathname);
      if (k) return k;
    }
  }
  return undefined;
}

export default function Sidebar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const perms = useAuthStore((s) => s.permissions);

  const items = useMemo(() => filterByPerm(MENU_VI, perms), [perms]);
  const selected = useMemo(
    () => findSelectedKey(items, pathname),
    [items, pathname]
  );

  const onClick = (info: any) => {
    const keyPath = info.keyPath?.[0];
    const clicked = findItemByKey(items, keyPath);
    if (clicked?.path) nav(clicked.path);
  };

  return (
    <Sider
      width={260}
      theme="light"
      style={{ borderRight: "1px solid #f0f0f0" }}
    >
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontWeight: 700,
        }}
      >
        ERP
      </div>
      <Menu
        mode="inline"
        items={items as any}
        selectedKeys={selected ? [selected] : []}
        onClick={onClick}
      />
    </Sider>
  );
}

function findItemByKey(
  items: AppMenuItem[],
  key: string
): AppMenuItem | undefined {
  for (const it of items) {
    const item = it as AppMenuItem;
    if (String(item.key) === String(key)) return item;
    if (item.children) {
      const found = findItemByKey(item.children, key);
      if (found) return found;
    }
  }
  return undefined;
}
