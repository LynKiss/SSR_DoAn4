import { PropsWithChildren } from "react";
import { useMePermissions } from "../modules/me/me.queries";
import Loading from "../shared/ui/Loading";

export function RequirePerm({
  anyOf,
  children,
}: PropsWithChildren<{ anyOf: string[] }>) {
  const { data, isLoading } = useMePermissions();

  if (isLoading) return <Loading />;
  const perms = new Set(data ?? []);
  const ok = anyOf.length === 0 || anyOf.some((p) => perms.has(p));

  if (!ok) return <div style={{ padding: 16 }}>403 - No permission</div>;
  return <>{children}</>;
}
