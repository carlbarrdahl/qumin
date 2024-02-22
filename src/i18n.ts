import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { type Locale, locales } from "./navigation";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  console.log({ locale });
  return {
    /* eslint-disable-next-line */
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
