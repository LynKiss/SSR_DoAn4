import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const qc = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={qc}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            borderRadius: 10,
            fontSize: 14,
          },
          components: {
            Layout: { headerBg: "#fff", bodyBg: "#f5f7fb" },
            Menu: { itemBorderRadius: 8 },
            Table: { borderRadius: 10 },
          },
        }}
      >
        {children}
      </ConfigProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
