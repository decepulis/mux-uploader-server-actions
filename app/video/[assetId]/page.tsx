import MuxPlayerReact from "./player";
import Video from "../../mux";
import { notFound } from "next/navigation";

type VideoPageProps = {
  params: {
    assetId?: string;
  };
};
export default async function VideoPage({ params }: VideoPageProps) {
  const { assetId } = params;
  if (!assetId) notFound();

  const asset = await Video.Assets.get(assetId);
  const playbackId = asset?.playback_ids?.[0]?.id;
  if (!playbackId) notFound();

  const passthrough = asset.passthrough ? JSON.parse(asset.passthrough) : {};

  return (
    <>
      <MuxPlayerReact playbackId={playbackId} />
      <h1>{passthrough.title}</h1>
      <p>{passthrough.description}</p>
    </>
  );
}
