// Cloudinary client-side upload config
// Uses Unsigned Upload Preset — no server signature needed
// Setup: Cloudinary Dashboard → Settings → Upload → Add Upload Preset → set Signing Mode to "Unsigned"

export const CLOUDINARY_CONFIG = {
  cloudName: "dos962cgw",
  uploadPreset: "anyhave_unsigned", // Create this in Cloudinary Dashboard (Unsigned)
  apiUrl: "https://api.cloudinary.com/v1_1",
};

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  formData.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

  const res = await fetch(
    `${CLOUDINARY_CONFIG.apiUrl}/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Upload failed: ${res.status}`);
  }

  return res.json();
}
