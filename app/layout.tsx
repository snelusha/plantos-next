import "@/styles/globals.css";

import { geistMono, geistSans } from "@/styles/fonts";

import { GlobalProviders } from "@/providers/global-providers";

import { cn } from "@/styles/utils";

import type { Metadata } from "next";

const title = "plantos";
const description = "nothing yet!";

export const metadata: Metadata = {
  title: title,
  description: description,
  creator: "@snelusha",
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: "@snelusha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
