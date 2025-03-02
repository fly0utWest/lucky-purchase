import { AuthenticatedUserSchema, AuthenticatedUser } from "@/shared/models";
import { env } from "@/env.mjs";

export const fetchUserWithJWT = async (
  token: string
): Promise<AuthenticatedUser | null> => {

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from the server.");
    }

    const data = await response.json();

    const user = AuthenticatedUserSchema.safeParse(data);

    if (!user.success) {
      console.error("Validation error:", user.error.format());
      throw new Error("Validation error occurred during user data parsing.");
    }

    return user.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch User Error:", error.message);
    }
    return null;
  }
};
