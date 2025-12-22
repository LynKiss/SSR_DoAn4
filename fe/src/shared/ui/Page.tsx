import type { PropsWithChildren } from "react";
import { Breadcrumb, Space, Typography } from "antd";

export default function Page({
  title,
  actions,
  breadcrumb,
  children,
}: PropsWithChildren<{
  title: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string }[];
}>) {
  return (
    <div style={{ padding: 16 }}>
      {breadcrumb?.length ? (
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={breadcrumb.map((b) => ({ title: b.label }))}
        />
      ) : null}

      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {actions}
      </Space>

      {children}
    </div>
  );
}
