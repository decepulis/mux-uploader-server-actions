"use server";

import { redirect } from "next/navigation";
import Video from "./mux";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addDataToUpload(uploadId: string, formData: FormData) {
  await wait(2000);

  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || title.length === 0)
    return { error: "Title is required" };
  if (typeof description !== "string" || description.length === 0)
    return { error: "Description is required" };

  // what happens if upload is complete but asset isn't ready?
  const upload = await Video.Uploads.get(uploadId);
  const assetId = upload.asset_id;

  if (assetId) {
    // Passthrough has a limit of 255 characters.
    // In production, we should save this title/description/assetID to a database
    const passthrough = JSON.stringify({ title, description });
    await Video.Assets.update(assetId, { passthrough });
    redirect(`/video/${assetId}`);
    // we can totally redirect to the asset, here, demonstrating a server mutation
  } else {
    return { error: "Asset not found, please try again" };
  }
}
