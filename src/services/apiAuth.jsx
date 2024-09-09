import supabase, { supabaseUrl } from "./supabase";
export const apiSingup = async ({ full_name, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, avatar_url: "" },
    },
  });
  if (error) throw new Error(error.message);

  return data;
};
async function apiAuth({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
export const apiAuthGg_Git = async (value) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: value === "gg" ? "google" : "github",
  });

  if (error) throw new Error(error.message);

  return data;
};

export async function getUsers() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}
export const apiLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Cập nhật mật khẩu hoặc FullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Tải lên hình ảnh Avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Cập nhật Avatar trong người dùng
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
export default apiAuth;
