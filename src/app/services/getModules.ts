export async function fetchModules(id_course: number) {
  const res = await fetch(`/api/moduls?courses=${id_course}`);
  if (!res.ok) throw new Error("Failed to fetch modul");
  const data = await res.json();

  return data;
}
