export async function fetchModules() {
  const res = await fetch("api/moduls");
  if (!res.ok) throw new Error("Failed to fetch modul");
  const data = await res.json();

  return data;
}
