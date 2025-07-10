import { SectionType } from "../lib/types/section";

export function buildHierarchy(flatData: SectionType[]): SectionType[] {
  const map = new Map<number, SectionType>();
  const roots: SectionType[] = [];

  flatData.forEach((item) => {
    item.children = [];
    map.set(item.id_section, item);
  });

  flatData.forEach((item) => {
    const node = map.get(item.id_section)!;
    if (item.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children!.push(node);
      }
    }
  });

  const sortSections = (sections: SectionType[]): SectionType[] =>
    sections
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        ...s,
        children: sortSections(s.children ?? []),
      }));

  return sortSections(roots);
}
