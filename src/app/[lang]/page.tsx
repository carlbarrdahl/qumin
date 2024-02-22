import { useTranslations } from "next-intl";
import { Button } from "~/app/_components/ui/button";
import { metadata } from "./layout";
import { type Locale } from "~/navigation";

type Props = { params: { lang: Locale } };
export default function Home({ params: { lang } }: Props) {
  const t = useTranslations("LandingPage");

  console.log(t);
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
              {t("intro")}
            </div>
            <div>{t("intro2")}</div>
          </h1>

          <p className="py-4 text-center text-xl sm:py-16 sm:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex justify-center gap-2">
            <Button as="a" href={"/dashboard/new"} size="lg" variant="primary">
              {t("cta")}
            </Button>
            <Button disabled size="lg">
              {t("cta_secondary")}
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
