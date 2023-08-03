import MuxPlayerReact from "./player";
import Video from "../../mux";
import { notFound } from "next/navigation";
import { cache } from "react";

const getAssetForId = cache(async function (assetId: string) {
  return await Video.Assets.get(assetId);
});

type VideoPageProps = {
  params: {
    assetId?: string;
  };
};
export default async function VideoPage({ params }: VideoPageProps) {
  const { assetId } = params;
  if (!assetId) notFound();

  const asset = await getAssetForId(assetId);
  const playbackId = asset?.playback_ids?.[0]?.id;
  if (!playbackId) notFound();

  return (
    <>
      <MuxPlayerReact playbackId={playbackId} streamType="on-demand" />
      <h1>{asset.passthrough ?? "No Title Found"}</h1>
    </>
  );
}
