import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: "Brainbox Research Institute",
};

export function generateStaticParams({}: { params: { slug: string } }) {
  return [
    { slug: "leo" },
    { slug: "genius" },
    { slug: "bbri" },
    { slug: "no-name" },
  ];
}

export default function AccountSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <section>
      {slug}
      {children}
    </section>
  );
}
