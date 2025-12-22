import { Modal, Form, Input, Select } from "antd";
import type { Customer, CustomerUpsertBody } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: CustomerUpsertBody) => Promise<void>;
  initial?: Partial<Customer> | null;
  title: string;
};

export default function CustomerFormModal({
  open,
  onClose,
  onSubmit,
  initial,
  title,
}: Props) {
  const [form] = Form.useForm<CustomerUpsertBody>();

  return (
    <Modal
      open={open}
      title={title}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={onClose}
      onOk={async () => {
        const v = await form.validateFields();
        await onSubmit(v);
        onClose();
        form.resetFields();
      }}
      afterOpenChange={(o) => {
        if (o) form.setFieldsValue({ ...(initial as any) });
      }}
    >
      <Form form={form} layout="vertical" initialValues={{ status: "active" }}>
        <Form.Item
          label="Mã khách hàng"
          name="code"
          rules={[{ required: true, message: "Nhập mã" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên khách hàng"
          name="name"
          rules={[{ required: true, message: "Nhập tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Select
            options={[
              { label: "Hoạt động", value: "active" },
              { label: "Ngưng", value: "inactive" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
