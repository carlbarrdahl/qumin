import { QRCodeSVG } from "qrcode.react";
import { headers } from "next/headers";

type Props = {
  params: { queueId: string };
};

export default async function QueueQRPage({ params }: Props) {
  const host = headers().get("host");
  const queueURL = `https://${host}/queue/${params.queueId}`;

  return (
    <a href={queueURL} target="_blank">
      <QRCodeSVG className="rounded" size={300} value={queueURL} />
    </a>
  );
}
