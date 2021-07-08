export interface MenuItem {
  link: string;
  label: string;
  iconName?: string;
}

export const exampleMenuListItems: MenuItem[] = [
  { link: '/examples/go-diagram', label: 'GoJs Diagram', iconName: 'scatter_plot' },
  { link: '/examples/dx-diagram', label: 'DevEx Diagram', iconName: 'pivot_table_chart' },
  { link: '/examples/ngx-diagram', label: 'Ngx Diagram', iconName: 'assessment' },
  { link: '/examples/ngx-org-tree', label: 'Ngx Org Tree', iconName: 'account_tree' },
];

export const playgroundMenuListItems: MenuItem[] = [
  { link: '/playground/svg-crash-course', label: 'SVG Crash Course', iconName: 'code' },
  { link: '/playground/d3-crash-course', label: 'D3 Crash Course', iconName: 'scatter_plot' },
  { link: '/playground/flowchart', label: 'Flow Chart', iconName: 'pivot_table_chart' },
];
