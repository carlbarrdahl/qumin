import { ImageResponse } from "next/og";

export const runtime = "edge";

const title = "Qumin";
const description = "Digital queuing simplified";
export const alt = title;
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image() {
  const fontData = await loadGoogleFont(fontFamily);

  return new ImageResponse(
    (
      <div tw="bg-orange-600 w-full h-full flex flex-col justify-center items-center">
        <div tw="text-[140px] font-bold text-orange-100">{title as string}</div>
        <div tw="text-4xl text-orange-200">{description}</div>
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

export const fontFamily = "Fredoka";
export async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@600&display=swap`;

  const css = await (await fetch(url)).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource?.[1]) {
    const res = await fetch(resource[1]);
    if (res.status == 200) {
      return await res.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
