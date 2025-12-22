import { Modal, Form } from "antd";
import type { PropsWithChildren } from "react";

export default function FormModal({
  title,
  open,
  onCancel,
  onOk,
  okText,
  confirmLoading,
  children,
}: PropsWithChildren<{
  title: string;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  okText?: string;
  confirmLoading?: boolean;
}>) {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText ?? "Save"}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form layout="vertical">{children}</Form>
    </Modal>
  );
}
