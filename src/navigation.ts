import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "sv"] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale = "en" as const;

// Use the default: `always`
export const localePrefix = undefined;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  });
