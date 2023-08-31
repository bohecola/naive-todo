export interface TextNavItem {
  type: "text";
  title: string;
  path: string;
}

export interface IconNavItem {
  type: "icon";
  icon: string;
  link: string;
  isExternalLink: boolean;
}

export type NavItem = TextNavItem | IconNavItem

export interface Todo {
  id: string
  content: string
  date: string
  completed: boolean
}
