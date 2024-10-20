export const registerUser = async (userData: {
  nisn: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendaftarkan akun");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan");
  }
};
