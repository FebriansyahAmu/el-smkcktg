export type SectionType = {
  id_section: number;
  id_module: number;
  parent_id: number | null;
  title: string;
  content: string;
  order: number;
  children?: SectionType[];
};
