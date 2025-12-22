import type { ReactNode } from "react";
import { useAuthStore } from "@/modules/auth/store/auth.store";

type Props = {
  permission?: string;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function AccessControl({
  permission,
  children,
  fallback = null,
}: Props) {
  const perms = useAuthStore((s) => s.permissions);

  if (!permission) return <>{children}</>;
  const ok = perms?.includes(permission);
  if (!ok) return <>{fallback}</>;
  return <>{children}</>;
}
