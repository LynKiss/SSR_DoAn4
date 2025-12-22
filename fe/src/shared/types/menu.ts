export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
};
