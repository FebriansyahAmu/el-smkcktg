export interface getModulSectionsDTO {
  id_section: number;
  id_module: number;
  parent_id: number | null;
  title: string;
  content: string;
  order: number;
  created_at: Date;
}
