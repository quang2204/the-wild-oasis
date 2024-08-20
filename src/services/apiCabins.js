import supabase, { supabaseUrl } from "./supabase";
export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins not found");
  }
  return data;
};
export const addEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1 Ceate new Cabin

  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be add");
  }
  if (hasImagePath) return data;
  const { errorStorage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (errorStorage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could not upload image");
  }
  return data;
};
export const DeleteCabin = async (id, img) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  let { data: cabins } = await supabase.from("cabins").select("image");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  function getFileNameFromUrl(url) {
    return url.substring(url.lastIndexOf("/") + 1);
  }
  const fileNames = cabins.map((item) => getFileNameFromUrl(item.image));
  const imgcheck = fileNames.includes(img);
  if (imgcheck === false) {
    const { error: errorStorage } = await supabase.storage
      .from("cabin-images")
      .remove([img]);
    if (errorStorage) {
      console.log(errorStorage);
      throw new Error("Could not delete image");
    }
  }
  return data;
};
