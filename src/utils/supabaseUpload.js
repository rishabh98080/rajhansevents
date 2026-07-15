import { supabase } from "../app/api/supabaseClient";

export const uploadImage = async (file, bucket) => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) {
    console.error(`Error uploading to ${bucket}:`, error);
    throw error;
  }

  const { data: publicURL } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicURL.publicUrl;
};
