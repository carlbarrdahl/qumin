import { ImageResponse } from "next/og";
import { QRCodeSVG } from "qrcode.react";
import { headers } from "next/headers";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { fontFamily, loadGoogleFont } from "~/app/opengraph-image";

const title = "Qumin";
export const alt = title;
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image(props: { params: { queueId: string } }) {
  const { queueId } = props.params;
  const fontData = await loadGoogleFont(fontFamily);

  const host = headers().get("host");
  const queueUrl = `https://${host}/queue/${queueId}`;

  const queue = await api.queue.get.query({ id: queueId });
  if (!queue) return notFound();

  return new ImageResponse(
    (
      <div tw="bg-orange-600 w-full h-full flex flex-col justify-center items-center">
        <div tw="text-4xl font-bold text-orange-300 absolute top-8 left-8">
          {title}
        </div>
        <div tw="flex flex-col">
          <div tw="text-[64px] mb-2 text-white">{queue.name}</div>
        </div>
        <div tw="flex bg-white p-4 rounded-lg">
          <QRCodeSVG size={300} value={queueUrl} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: fontFamily,
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
