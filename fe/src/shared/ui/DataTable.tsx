import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export default function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  loading,
  meta,
  onChangePage,
}: {
  columns: ColumnsType<T>;
  data: T[];
  rowKey: string | ((record: T) => string);
  loading?: boolean;
  meta?: { page?: number; limit?: number; total?: number };
  onChangePage?: (page: number, limit: number) => void;
}) {
  const page = meta?.page ?? 1;
  const limit = meta?.limit ?? 20;
  const total = meta?.total ?? data.length;

  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      rowKey={rowKey as any}
      loading={loading}
      pagination={{
        current: page,
        pageSize: limit,
        total,
        showSizeChanger: true,
        onChange: (p, ps) => onChangePage?.(p, ps),
      }}
    />
  );
}
