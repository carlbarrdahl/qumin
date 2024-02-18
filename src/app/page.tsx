import { Button } from "./_components/ui/button";
import { metadata } from "./layout";

export default function Home() {
  console.log(metadata.metadataBase);
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
              <span className="font-semibold text-primary-600">Qumin</span> är
              en mikroapp för
            </div>
            <div>digital köer</div>
          </h1>

          <p className="py-4 text-center text-xl sm:py-16 sm:text-2xl">
            Skapa en kö, dela länken, och låt dina kunde slippa köandet.
          </p>

          <div className="flex justify-center gap-2">
            <Button as="a" href={"/dashboard/new"} size="lg" variant="primary">
              Kom igång
            </Button>
            <Button disabled size="lg">
              Det är gratis
            </Button>
          </div>
        </div>

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/queue/clsqhsjsd0000dbffdt0a2av9`}
            width={"100%"}
            height={300}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
