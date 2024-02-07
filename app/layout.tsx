import "./globals.css";
import type { Metadata } from "next";

import "cal-sans";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import RootProvider from "./components/providers/root-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://XO.ai"),
  title: "XO",
  description: "2nd Brain Ai",

  icons: [{ url: "/favicon.svg" }],
  twitter: {
    card: "summary_large_image",
    site: "@zugbob",
    creator: "@zugbob",
  },
  openGraph: {
    title: "XO",
    description: "2nd Brain Ai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full font-sans" lang="en">
      <body className="flex flex-col h-full">
        <main className="h-full">
          <RootProvider>{children}</RootProvider>
          {/* {children} */}
        </main>
      </body>
    </html>
  );
}
