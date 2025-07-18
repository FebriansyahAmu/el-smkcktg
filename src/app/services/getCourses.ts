export async function fetchCourses() {
  const res = await fetch("/api/instructors/courses");
  if (!res.ok) throw new Error("Failed to fetch courses");
  const data = await res.json();

  return data;
}
