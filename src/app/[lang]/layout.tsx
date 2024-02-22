import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Fredoka } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { A } from "~/app/_components/ui/a";
import { type Locale } from "~/navigation";

const inter = Fredoka({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qumin.app"),
  title: "Qumin",
  description: "Digital queueing simplified",
  applicationName: "Qumin",
  referrer: "origin-when-cross-origin",
  keywords: ["Qumin", "Queues", "API", "Zapier", "Open-source", "Typescript"],
  creator: "Carl Barrdahl",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const repoURL = "https://github.com/carlbarrdahl/qumin";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <ClerkProvider signInUrl="/sign-in">
      <html lang={locale}>
        <body className={`font-sans ${inter.variable}`}>
          <main className="mx-auto flex h-[calc(100dvh)] flex-col text-lg">
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <footer className="mt-24 flex flex-col items-center bg-gray-100 py-8 text-xs text-gray-800">
              <div>
                Qumin is free &{" "}
                <A target="_blank" href={repoURL}>
                  open-source
                </A>
              </div>
              <div>
                by:{" "}
                <A target="_blank" href="https://github.com/carlbarrdahl">
                  zephyr valley
                </A>
              </div>
            </footer>
          </main>
        </body>
        <Analytics />
      </html>
    </ClerkProvider>
  );
}
