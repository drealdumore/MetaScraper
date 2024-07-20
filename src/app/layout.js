import { Inter } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calSans",
});

export const metadata = {
  title: "MetaScraper - Website Metadata Extractor",
  description:
    "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
  keywords: [
    "metadata",
    "web scraping",
    "OG image",
    "description",
    "title",
    "SEO",
    "Next.js",
  ],
  icon: "/favicon.ico",
  "og:image": "/openGraph.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <link rel="icon" href={metadata.icon} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata["og:image"]} />
        {/* Add other OG tags as necessary */}
      </head>

      <body className={`${calSans.variable} ${inter.className}`}>
        {/* <main className="absolute inset-0 -z-10 h-max w-full md:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] md:[background-size:16px_16px] md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"> */}
        <main className="absolute inset-0 -z-10 h-max w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="flex min-h-screen w-full flex-col space-y-6 p-4 md:p-8">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
