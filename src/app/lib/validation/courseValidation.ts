import * as yup from "yup";

export const createCourseSchema = yup.object({
  title: yup.string().required().min(3),
  description: yup.string().required().min(10),
  // instructorId: yup.number().required().positive().integer(),
});

export type CreateCourseInput = yup.InferType<typeof createCourseSchema>;

export async function validateCreateCoureseIn(input: CreateCourseInput) {
  return await createCourseSchema.validate(input, { abortEarly: false });
}
