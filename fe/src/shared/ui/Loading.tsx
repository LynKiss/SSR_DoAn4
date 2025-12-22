import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Spin />
    </div>
  );
}
