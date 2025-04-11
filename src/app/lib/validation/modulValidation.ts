import * as yup from "yup";

export const createModulSchema = yup.object({
  title: yup.string().required().min(3),
  description: yup.string().required().min(5),
});
