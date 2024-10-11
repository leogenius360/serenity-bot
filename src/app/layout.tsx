import { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import { siteConfig, siteFooter } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background relative font-sans antialiased flex flex-col justify-between",
        )}
      >
        <Providers enableSystem attribute="class" defaultTheme="system">
          <Navbar />
          <div className="max-w-screen-2xl mx-auto min-h-[28rem] p-4 lg:p-6">
            {children}
          </div>
        </Providers>

        <footer className="card border-0 border-t-1 border-primary py-3 px-4 mt-auto">
          <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-center lg:justify-between gap-x-16 gap-y-2 text-sm">
            <div className="inline-flex flex-nowrap gap-x-4">
              {siteFooter.termsAndConditions.map((item) => (
                <Link
                  key={item.href}
                  target="blank"
                  className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
                  href={item.href}
                  title={item.label}
                >
                  <small className="font-bold"> {item.label} </small>
                </Link>
              ))}
            </div>

            <div className="inline-flex flex-nowrap gap-x-4">
              {siteFooter.socialLinks.map((item) => (
                <Link
                  key={item.href}
                  target="blank"
                  className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
                  href={item.href}
                  title={item.label}
                >
                  <small className="font-bold"> {item.label} </small>
                </Link>
              ))}
            </div>

            <Link
              target="blank"
              className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
              href={siteFooter.developer.href}
              title={siteFooter.developer.label}
            >
              <small className="font-bold">
                {" "}
                {siteFooter.developer.label}{" "}
              </small>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
