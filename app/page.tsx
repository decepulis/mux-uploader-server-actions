import Video from "./mux";
import Form from "./form";

export default async function Upload() {
  const data = await Video.Uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policy: "public",
    },
  });

  return <Form uploadId={data.id} endpoint={data.url} />;
}
