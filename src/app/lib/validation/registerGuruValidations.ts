import * as yup from "yup";

interface RegisterGuruInput {
  name: string;
  email: string;
  password: string;
  konsentrasiKeahlian: string;
}

export const registerGuruSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, "Password Password must be at least 6 characters")
    .required(),
  konsentrasiKeahlian: yup.string().required(),
});

export async function validationRegisterGuru(input: RegisterGuruInput) {
  return await registerGuruSchema.validate(input, { abortEarly: false });
}
