import { useState } from "react";
import { Button, Divider, List, Space, Upload, message, Tag } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { filesApi } from "../api/files.api";

export default function AttachUpload({ entityType, entityId }: { entityType: string; entityId: string }) {
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const filesQ = useQuery({
    queryKey: ["files", entityType, entityId],
    queryFn: async () => filesApi.listByEntity({ entityType, entityId }),
  });

  const uploadProps: UploadProps = {
    beforeUpload: (f) => {
      setFile(f as any);
      return false; // prevent auto upload
    },
    maxCount: 1,
  };

  const doUploadAttach = async () => {
    if (!file) return message.warning("Choose a file first");
    setLoading(true);
    try {
      const up = await filesApi.upload(file);
      await filesApi.attach({ entityType, entityId, fileId: up.id, tag: "contract" });
      message.success("Uploaded & attached");
      setFile(null);
      await qc.invalidateQueries({ queryKey: ["files", entityType, entityId] });
    } catch (e: any) {
      message.error(e?.response?.data?.error?.message ?? "Upload/attach failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 style={{ marginBottom: 8 }}>Files</h4>

      <Space>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Choose file</Button>
        </Upload>
        <Button type="primary" onClick={doUploadAttach} loading={loading} disabled={!file}>
          Upload & Attach
        </Button>
      </Space>

      <Divider style={{ margin: "12px 0" }} />

      <List
        loading={filesQ.isLoading}
        dataSource={filesQ.data ?? []}
        locale={{ emptyText: "No files" }}
        renderItem={(x: any) => {
          const url = filesApi.publicUrl(x.file?.url);
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <span>{x.file?.originalName ?? "file"}</span>
                    {x.tag ? <Tag>{x.tag}</Tag> : null}
                  </Space>
                }
                description={url ? <a href={url} target="_blank" rel="noreferrer">{url}</a> : "No public url"}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
