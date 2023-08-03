"use server";

import { redirect } from "next/navigation";
import Video from "./mux";

export async function saveVideoToDb(formData: FormData) {
  const title = formData.get("title");
  const uploadId = formData.get("uploadId");

  if (typeof title !== "string" || title.length === 0)
    return { error: "Title is required" };
  if (typeof uploadId !== "string" || uploadId.length === 0)
    return { error: "UploadId is required" };

  const upload = await Video.Uploads.get(uploadId);
  const assetId = upload.asset_id;

  if (assetId) {
    // Passthrough has a limit of 255 characters.
    // In production, we should save this title/assetID to a database
    try {
      await Video.Assets.update(assetId, { passthrough: title });
    } catch (e) {
      console.error(e);
      return { error: "Failed to update asset" };
    }
    redirect(`/video/${assetId}`);
    // we can totally redirect to the asset, here, demonstrating a server mutation
  } else {
    return { error: "Asset not found, please try again" };
  }
}
