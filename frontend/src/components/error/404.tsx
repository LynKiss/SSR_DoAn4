import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/routes/urls";

export default function NotFoundPage() {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy trang."
      extra={<Button onClick={() => nav(URLS.DASHBOARD)}>Về Dashboard</Button>}
    />
  );
}
