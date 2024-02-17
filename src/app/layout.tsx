import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { A } from "./_components/ui/a";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qumin.vercel.app"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <main className="mx-auto flex h-[calc(100dvh)] flex-col">
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <footer className="flex flex-col items-center bg-gray-100 py-8 text-xs text-gray-800">
              <div>
                Qumin is free &{" "}
                <A target="_blank" href={repoURL}>
                  open-sourced
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
        {/* <Analytics /> */}
      </html>
    </ClerkProvider>
  );
}
