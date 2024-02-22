import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "sv"],
  defaultLocale: "en",
  localePrefix: "never",
});

export default authMiddleware({
  beforeAuth: (req) => (req.url.includes("api") ? null : intlMiddleware(req)),
  publicRoutes: (req) => !req.url.includes("/dashboard"),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
