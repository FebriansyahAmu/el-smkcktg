import * as yup from "yup";

export const createModulSchema = yup.object({
  title: yup.string().required().min(3),
  description: yup.string().required().min(5),
  id_course: yup.number().required(),
});

export type CreateModulInput = yup.InferType<typeof createModulSchema>;

export async function validateModulInput(input: CreateModulInput) {
  return await createModulSchema.validate(input, { abortEarly: false });
}
