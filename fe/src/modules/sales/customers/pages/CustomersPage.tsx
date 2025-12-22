import { useMemo, useState } from "react";
import { Button, Input, Space, Tag, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import Page from "../../../../shared/ui/Page";
import DataTable from "../../../../shared/ui/DataTable";
import FormModal from "../../../../shared/ui/FormModal";
import { useCreateCustomer, useCustomers, useDeleteCustomer } from "../customers.queries";
import type { Customer } from "../customers.types";
import AttachUpload from "../../../files/ui/AttachUpload";
import { statusApi } from "../../../status/api/status.api";

export default function CustomersPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [createOpen, setCreateOpen] = useState(false);
  const [code, setCode] = useState("CUST0001");
  const [name, setName] = useState("Cong ty A");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = useCustomers({ q, page, limit });
  const createMut = useCreateCustomer();
  const deleteMut = useDeleteCustomer();

  const rows = list.data?.data ?? [];
  const meta = list.data?.meta ?? { page, limit, total: rows.length };

  const selected = useMemo(
    () => rows.find((x) => x.id === selectedId) ?? null,
    [rows, selectedId]
  );

  const columns: ColumnsType<Customer> = [
    { title: "Code", dataIndex: "code" },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, r) => (
        <a onClick={() => setSelectedId(r.id)}>{r.name}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => <Tag color={v === "active" ? "green" : "red"}>{v}</Tag>,
    },
    {
      title: "Actions",
      render: (_, r) => (
        <Popconfirm
          title="Delete customer?"
          onConfirm={() => deleteMut.mutate(r.id)}
        >
          <Button danger loading={deleteMut.isPending}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const openCreate = () => setCreateOpen(true);

  const submitCreate = async () => {
    try {
      await createMut.mutateAsync({ code, name });
      message.success("Created");
      setCreateOpen(false);
      setPage(1);
    } catch (e: any) {
      message.error(e?.response?.data?.error?.message ?? "Create failed");
    }
  };

  const changeStatus = async (toStatus: "active" | "inactive") => {
    if (!selectedId) return;
    try {
      await statusApi.change({ entityType: "customer", entityId: selectedId, toStatus, note: "Changed from FE" });
      message.success("Status updated");
      list.refetch();
    } catch (e: any) {
      message.error(e?.response?.data?.error?.message ?? "Status change failed");
    }
  };

  return (
    <Page
      title="Customers"
      breadcrumb={[{ label: "Sales" }, { label: "Customers" }]}
      actions={
        <Space>
          <Input.Search
            placeholder="Search code/name..."
            allowClear
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onSearch={() => {
              setPage(1);
              list.refetch();
            }}
            style={{ width: 260 }}
          />
          <Button type="primary" onClick={openCreate}>
            Create
          </Button>
        </Space>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16, padding: 16 }}>
        <div>
          <DataTable<Customer>
            columns={columns}
            data={rows}
            rowKey="id"
            loading={list.isLoading}
            meta={meta}
            onChangePage={(p, ps) => {
              setPage(p);
              setLimit(ps);
            }}
          />
        </div>

        <div style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Detail</h3>
          {selected ? (
            <>
              <div><b>{selected.code}</b> — {selected.name}</div>
              <div style={{ marginTop: 8 }}>
                <Space>
                  <Button onClick={() => changeStatus("active")}>Set Active</Button>
                  <Button danger onClick={() => changeStatus("inactive")}>Set Inactive</Button>
                </Space>
              </div>

              <div style={{ marginTop: 16 }}>
                <AttachUpload entityType="customer" entityId={selected.id} />
              </div>
            </>
          ) : (
            <div style={{ color: "#888" }}>(Select a customer)</div>
          )}
        </div>
      </div>

      <FormModal
        title="Create Customer"
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onOk={submitCreate}
        okText="Create"
        confirmLoading={createMut.isPending}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <div style={{ marginBottom: 6 }}>Code</div>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div>
            <div style={{ marginBottom: 6 }}>Name</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
      </FormModal>
    </Page>
  );
}
