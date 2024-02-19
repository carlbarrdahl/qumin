import { Button } from "~/app/_components/ui/button";
import { metadata } from "./layout";
import { getDictionary } from "~/get-dictionary";
import { Locale } from "~/i18n-config";

type Props = { params: { lang: Locale } };
export default async function Home({ params: { lang } }: Props) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-screen-xl flex-1">
      <div className="flex flex-1 flex-col space-y-4 px-8 py-6">
        <div className="py-8 sm:py-24">
          <h1
            className={
              "text-center text-4xl leading-snug tracking-wide sm:text-6xl"
            }
          >
            <div>
              <span className="font-semibold text-primary-600">Qumin</span>{" "}
              {dictionary.landing.intro}
            </div>
            <div>{dictionary.landing.intro2}</div>
          </h1>

          <p className="py-4 text-center text-xl sm:py-16 sm:text-2xl">
            {dictionary.landing.subtitle}
          </p>

          <div className="flex justify-center gap-2">
            <Button as="a" href={"/dashboard/new"} size="lg" variant="primary">
              {dictionary.landing.cta}
            </Button>
            <Button disabled size="lg">
              {dictionary.landing.cta_secondary}
            </Button>
          </div>
        </div>

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/queue/clsrcjg2q0000c5zmhp3mqxyc`}
            width={"100%"}
            height={300}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
