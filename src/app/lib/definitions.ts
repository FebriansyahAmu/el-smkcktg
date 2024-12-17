import * as yup from "yup";

export const SigninFormSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
});

export interface SessionPayload {
  userId: number;
  fullname: string;
  role: string;
}
