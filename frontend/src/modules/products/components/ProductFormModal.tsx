import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import type { Product } from "../types";

interface ProductFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  product?: Product | null;
  loading?: boolean;
}

export default function ProductFormModal({
  visible,
  onCancel,
  onOk,
  product,
  loading = false,
}: ProductFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (product) {
        form.setFieldsValue({
          ...product,
          width: product.width ? Number(product.width) : undefined,
          height: product.height ? Number(product.height) : undefined,
          length: product.length ? Number(product.length) : undefined,
          weight: product.weight ? Number(product.weight) : undefined,
          standardCost: product.standardCost ? Number(product.standardCost) : undefined,
          salePrice: product.salePrice ? Number(product.salePrice) : undefined,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, product, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={product ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: "active",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Form.Item
            name="sku"
            label="Mã sản phẩm (SKU)"
            rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
          >
            <Input placeholder="Nhập mã sản phẩm" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item name="unit" label="Đơn vị">
            <Input placeholder="Ví dụ: cái, kg, m, l" />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select
              options={[
                { label: "Hoạt động", value: "active" },
                { label: "Không hoạt động", value: "inactive" },
                { label: "Ngừng sản xuất", value: "discontinued" },
              ]}
            />
          </Form.Item>

          <Form.Item name="width" label="Chiều rộng (cm)">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="height" label="Chiều cao (cm)">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="length" label="Chiều dài (cm)">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="weight" label="Trọng lượng (kg)">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="standardCost" label="Giá vốn (VND)">
            <InputNumber
              placeholder="0"
              min={0}
              step={1000}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="salePrice" label="Giá bán (VND)">
            <InputNumber
              placeholder="0"
              min={0}
              step={1000}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="safetyStock" label="Tồn kho an toàn">
            <InputNumber
              placeholder="0"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
