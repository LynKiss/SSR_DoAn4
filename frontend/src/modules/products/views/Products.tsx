import { Button, Input, Space, Table, Typography, message } from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.api";
import type { Product, CreateProductInput } from "../types";
import ProductFormModal from "../components/ProductFormModal";
import AccessControl from "@/modules/auth/components/AccessControl";
import { PERMS } from "@/constant/roles";

export default function Products() {
  const qc = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const queryKey = useMemo(
    () => ["products", { page, limit, q, status }],
    [page, limit, q, status]
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await getProducts({ page, limit, q: q || undefined, status });
      return res;
    },
  });

  const createMut = useMutation({
    mutationFn: (body: CreateProductInput) => createProduct(body),
    onSuccess: async () => {
      message.success("Tạo sản phẩm thành công");
      await qc.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: (e: any) => message.error(e?.message || "Tạo thất bại"),
  });

  const updateMut = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<CreateProductInput>;
    }) => updateProduct(id, body),
    onSuccess: async () => {
      message.success("Cập nhật thành công");
      await qc.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: (e: any) => message.error(e?.message || "Cập nhật thất bại"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: async () => {
      message.success("Đã xóa");
      await qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e: any) => message.error(e?.message || "Xóa thất bại"),
  });

  const rows = data?.data ?? [];
  const meta = data?.meta;

  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Sản phẩm
        </Typography.Title>

        <AccessControl permission={PERMS.PRODUCT_WRITE}>
          <Button
            type="primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Thêm sản phẩm
          </Button>
        </AccessControl>
      </Space>

      <Space>
        <Input.Search
          placeholder="Tìm theo SKU / tên..."
          allowClear
          onSearch={(val) => {
            setPage(1);
            setQ(val.trim());
          }}
          style={{ width: 300 }}
        />

        <Input
          placeholder="Lọc theo trạng thái..."
          allowClear
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value || undefined);
          }}
          style={{ width: 200 }}
        />
      </Space>

      <Table<Product>
        rowKey="id"
        loading={isLoading}
        dataSource={rows}
        pagination={{
          current: meta?.page ?? page,
          pageSize: meta?.limit ?? limit,
          total: meta?.total ?? rows.length,
          onChange: (p) => setPage(p),
        }}
        columns={[
          { title: "SKU", dataIndex: "sku", width: 120 },
          {
            title: "Tên sản phẩm",
            dataIndex: "name",
            render: (_, r) => (
              <div>
                <div style={{ fontWeight: 500 }}>{r.name}</div>
                {r.unit && (
                  <div style={{ color: "#666", fontSize: 12 }}>
                    Đơn vị: {r.unit}
                  </div>
                )}
              </div>
            ),
          },
          {
            title: "Kích thước (DxRxC)",
            render: (_, r) => {
              const { length, width, height } = r;
              if (!length && !width && !height) return "-";
              return (
                <div style={{ fontSize: 12 }}>
                  {length || 0} × {width || 0} × {height || 0} cm
                </div>
              );
            },
            width: 150,
          },
          {
            title: "Trọng lượng",
            dataIndex: "weight",
            render: (weight) => weight ? `${weight} kg` : "-",
            width: 100,
          },
          {
            title: "Giá vốn",
            dataIndex: "standardCost",
            render: (cost) => cost ? new Intl.NumberFormat('vi-VN').format(Number(cost)) + ' ₫' : "-",
            width: 120,
          },
          {
            title: "Giá bán",
            dataIndex: "salePrice",
            render: (price) => price ? new Intl.NumberFormat('vi-VN').format(Number(price)) + ' ₫' : "-",
            width: 120,
          },
          {
            title: "Tồn kho an toàn",
            dataIndex: "safetyStock",
            render: (stock) => stock || "-",
            width: 120,
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) => {
              const statusMap: Record<string, { color: string; text: string }> = {
                active: { color: "green", text: "Hoạt động" },
                inactive: { color: "red", text: "Không hoạt động" },
                discontinued: { color: "orange", text: "Ngừng sản xuất" },
              };
              const config = statusMap[status] || { color: "default", text: status };
              return <span style={{ color: config.color }}>{config.text}</span>;
            },
            width: 120,
          },
          {
            title: "Thao tác",
            render: (_, r) => (
              <Space>
                <AccessControl permission={PERMS.PRODUCT_WRITE}>
                  <a
                    onClick={() => {
                      setEditing(r);
                      setOpen(true);
                    }}
                  >
                    Sửa
                  </a>
                  <a onClick={() => deleteMut.mutate(String(r.id))}>Xóa</a>
                </AccessControl>
              </Space>
            ),
            width: 120,
          },
        ]}
        scroll={{ x: 1000 }}
      />

      <ProductFormModal
        visible={open}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onOk={(values) => {
          if (editing?.id) {
            updateMut.mutate({ id: String(editing.id), body: values });
          } else {
            createMut.mutate(values);
          }
        }}
        product={editing}
        loading={createMut.isPending || updateMut.isPending}
      />
    </Space>
  );
}
