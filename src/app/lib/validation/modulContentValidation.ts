import * as yup from "yup";

export const modulContentSchema = yup.object({
  id_section: yup.number().optional().nullable(),
  id_modules: yup.number().required("Module ID wajib diisi"),
  parent_id: yup.number().nullable(),
  title: yup.string().required().min(5, "Judul minimal 5 karakter"),
  order: yup.number().min(0, "Urutan tidak boleh kurang dari 0").default(0),
  content: yup
    .string()
    .required("Konten wajib diisi")
    .min(10, "Konten minimal 10 karakter"),
});

export type ModulContent = yup.InferType<typeof modulContentSchema>;

export async function validateModulContent(input: ModulContent) {
  return await modulContentSchema.validate(input, { abortEarly: false });
}
