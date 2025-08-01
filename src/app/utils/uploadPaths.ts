import path from "path";

export function getUploadPath() {
  const baseDir = process.cwd();

  //developments
  //   if (process.env.NODE_ENV === "development") {
  //     return path.join(baseDir, "public", "uploads", "assigments");
  //   }
  return path.join(baseDir, "public", "uploads", "assigments");
  //productions
  // return path.join(baseDir, "", "")
}
