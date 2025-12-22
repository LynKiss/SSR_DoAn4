import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/routes/urls";

export default function ForbiddenPage() {
  const nav = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập chức năng này."
      extra={<Button onClick={() => nav(URLS.DASHBOARD)}>Về Dashboard</Button>}
    />
  );
}
