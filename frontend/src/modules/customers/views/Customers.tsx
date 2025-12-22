import { Button, Input, Space, Table, Typography, message } from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomers } from "../api/get-customers";
import { addCustomer } from "../api/add-customer";
import { updateCustomer } from "../api/update-customer";
import { deleteCustomer } from "../api/delete-customer";
import type { Customer, CustomerUpsertBody } from "../types";
import CustomerFormModal from "../components/CustomerFormModal";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../routes/urls";
import AccessControl from "@/modules/auth/components/AccessControl";
import { PERMS } from "@/constant/roles";

export default function Customers() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  const queryKey = useMemo(
    () => ["customers", { page, limit, q }],
    [page, limit, q]
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await getCustomers({ page, limit, q: q || undefined });
      return res;
    },
  });

  const createMut = useMutation({
    mutationFn: (body: CustomerUpsertBody) => addCustomer(body),
    onSuccess: async () => {
      message.success("Tạo khách hàng thành công");
      await qc.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (e: any) => message.error(e?.message || "Tạo thất bại"),
  });

  const updateMut = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: CustomerUpsertBody;
    }) => updateCustomer(id, body),
    onSuccess: async () => {
      message.success("Cập nhật thành công");
      await qc.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (e: any) => message.error(e?.message || "Cập nhật thất bại"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string | number) => deleteCustomer(id),
    onSuccess: async () => {
      message.success("Đã xóa");
      await qc.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (e: any) => message.error(e?.message || "Xóa thất bại"),
  });

  const rows = data?.data ?? [];
  const meta = data?.meta as any;

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Khách hàng
        </Typography.Title>

        <AccessControl permission={PERMS.CUSTOMER_WRITE}>
          <Button
            type="primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Thêm khách hàng
          </Button>
        </AccessControl>
      </Space>

      <Input.Search
        placeholder="Tìm theo mã / tên..."
        allowClear
        onSearch={(val) => {
          setPage(1);
          setQ(val.trim());
        }}
      />

      <Table<Customer>
        rowKey={(r) => String(r.id)}
        loading={isLoading}
        dataSource={rows}
        pagination={{
          current: meta?.page ?? page,
          pageSize: meta?.limit ?? limit,
          total: meta?.total ?? rows.length,
          onChange: (p) => setPage(p),
        }}
        columns={[
          { title: "Mã", dataIndex: "code" },
          {
            title: "Tên khách hàng",
            dataIndex: "name",
            render: (_, r) => (
              <a onClick={() => nav(URLS.SALES_CUSTOMER_DETAIL(r.id))}>
                {r.name}
              </a>
            ),
          },
          { title: "SĐT", dataIndex: "phone" },
          { title: "Email", dataIndex: "email" },
          { title: "Trạng thái", dataIndex: "status" },
          {
            title: "Thao tác",
            render: (_, r) => (
              <Space>
                <AccessControl permission={PERMS.CUSTOMER_WRITE}>
                  <a
                    onClick={() => {
                      setEditing(r);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </a>
                  <a onClick={() => deleteMut.mutate(r.id)}>Xóa</a>
                </AccessControl>
              </Space>
            ),
          },
        ]}
      />

      <CustomerFormModal
        open={open}
        onClose={() => setOpen(false)}
        initial={editing}
        title={editing ? "Cập nhật khách hàng" : "Tạo mới khách hàng"}
        onSubmit={async (body) => {
          if (editing?.id) {
            await updateMut.mutateAsync({ id: editing.id, body });
          } else {
            await createMut.mutateAsync(body);
          }
        }}
      />
    </Space>
  );
}
