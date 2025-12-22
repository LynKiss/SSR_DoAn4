import { useQuery } from "@tanstack/react-query";
import { meApi } from "./api/me.api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: meApi.me,
  });
}

export function useMePermissions() {
  return useQuery({
    queryKey: ["me-perms"],
    queryFn: meApi.permissions,
  });
}

export function useMeMenu() {
  return useQuery({
    queryKey: ["me-menu"],
    queryFn: meApi.menu,
  });
}
