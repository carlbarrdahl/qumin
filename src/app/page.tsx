import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl flex-1">
      <div className="flex flex-1 flex-col space-y-4 px-8 py-6">
        <div className="py-8 sm:py-24">
          <h1
            className={
              "mb-4 text-center text-4xl font-semibold leading-snug tracking-wide sm:text-6xl"
            }
          >
            <div>
              <span className="text-primary-600">Qumin</span> är en mikroapp för
            </div>
            <div>digital köer</div>
          </h1>

          <p className="my-16 text-center text-xl sm:text-2xl">
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
      </div>
    </div>
  );
}
