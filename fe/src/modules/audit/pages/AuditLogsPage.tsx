import { useState } from "react";
import { Input, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Page from "../../../shared/ui/Page";
import DataTable from "../../../shared/ui/DataTable";
import { useQuery } from "@tanstack/react-query";
import { auditApi } from "../api/audit.api";

type Row = {
  id: string;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  createdAt: string;
};

export default function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [action, setAction] = useState("");

  const q = useQuery({
    queryKey: ["audit-logs", { page, limit, action }],
    queryFn: async () => auditApi.list({ page, limit, action: action || undefined }),
  });

  const rows: Row[] = (q.data?.data ?? []) as any;
  const meta = q.data?.meta ?? { page, limit, total: rows.length };

  const columns: ColumnsType<Row> = [
    { title: "Action", dataIndex: "action" },
    {
      title: "Entity",
      render: (_, r) =>
        r.entityType ? (
          <Space>
            <Tag>{r.entityType}</Tag>
            <span>{r.entityId}</span>
          </Space>
        ) : (
          "-"
        ),
    },
    {
      title: "At",
      dataIndex: "createdAt",
      render: (v) => new Date(v).toLocaleString(),
    },
  ];

  return (
    <Page
      title="Audit Logs"
      breadcrumb={[{ label: "Audit" }]}
      actions={
        <Space>
          <Input
            placeholder="Filter action..."
            value={action}
            onChange={(e) => setAction(e.target.value)}
            style={{ width: 260 }}
          />
        </Space>
      }
    >
      <div style={{ padding: 16 }}>
        <DataTable<Row>
          columns={columns}
          data={rows}
          rowKey="id"
          loading={q.isLoading}
          meta={meta}
          onChangePage={(p, ps) => {
            setPage(p);
            setLimit(ps);
          }}
        />
      </div>
    </Page>
  );
}
