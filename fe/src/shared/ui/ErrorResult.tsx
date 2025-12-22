import { Result } from "antd";

export default function ErrorResult({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return <Result status="error" title={title} subTitle={subTitle} />;
}
