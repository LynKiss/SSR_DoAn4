import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Page not found"
      extra={<Button onClick={() => nav("/")}>Back Home</Button>}
    />
  );
}
