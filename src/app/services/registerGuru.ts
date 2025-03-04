export const registerGuru = async (userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await fetch("/api/register/guru", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal mendaftar akun, silahkan coba lagi nanti"
      );
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.Message || "Terjadi kesalahan");
  }
};
