import * as yup from "yup";

export const assigmentsInputSchema = yup.object({
  id_course: yup.number().required("id kelas wajib diisi"),
  id_instructors: yup.number().required("id Instruktur tidak boleh kosong"),
  title: yup.string().required("Title tugas tidak boleh kosong"),
  description: yup.string().required("Deskripsi tidak boleh kosong"),
  due_date: yup
    .date()
    .min(new Date(), "Tanggal dan waktu harus setelah sekarang")
    .required("Tanggal wajib diisi"),
  file_url: yup.string().nullable(),
});

export type assigmentObj = yup.InferType<typeof assigmentsInputSchema>;

export async function validateAssigmentInput(input: assigmentObj) {
  return await assigmentsInputSchema.validate(input, { abortEarly: false });
}
