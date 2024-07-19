import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

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
};

const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calSans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${calSans.variable} ${inter.className}`}>
        <main className="absolute inset-0 -z-10 h-max w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div className="flex min-h-screen w-full flex-col space-y-6 p-4 md:p-8">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
