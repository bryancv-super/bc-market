import { put } from "@vercel/blob";
import { getAuthUser, updateUserProfile } from "@/lib/server/auth";
import { createHttpError, handleRouteError, success } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const authUser = getAuthUser(request);
    const formData = await request.formData();
    const avatar = formData.get("avatar");

    if (!(avatar instanceof File)) {
      throw createHttpError(400, "Avatar file is required");
    }

    const safeName = avatar.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const blob = await put(`avatars/${authUser.id}-${Date.now()}-${safeName}`, avatar, {
      access: "public",
    });
    const user = await updateUserProfile(authUser.id, { profileImage: blob.url });

    return success({ user, avatarUrl: blob.url });
  } catch (error) {
    return handleRouteError(error);
  }
}
