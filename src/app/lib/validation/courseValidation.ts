import * as yup from "yup";

export const createCourseSchema = yup.object({
  title: yup.string().required().min(3),
  description: yup.string().required().min(10),
  instructorId: yup.number().required().positive().integer(),
});

export async function validateCreateCoureseIn(input: any) {
  return await createCourseSchema.validate(input, { abortEarly: false });
}
