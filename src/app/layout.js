import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { sharedMetadata } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });
const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calSans",
});

export const metadata = {
  metadataBase: new URL(sharedMetadata.url),

  title: sharedMetadata.title,
  description: sharedMetadata.description,
  keywords: [
    "metadata",
    "web scraping",
    "OG image",
    "description",
    "title",
    "SEO",
  ],
  icon: "/favicon.ico",
  openGraph: {
    title: sharedMetadata.title,
    description: sharedMetadata.description,
    type: "website",
    url: sharedMetadata.url,
    siteName: sharedMetadata.title,
    images: [
      {
        url: sharedMetadata.image,
        width: sharedMetadata.ogImage.width,
        height: sharedMetadata.ogImage.height,
        type: sharedMetadata.ogImage.type,
      },
    ],
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    site: "@drealdumore",
    creator: "@drealdumore",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${calSans.variable} ${inter.className}`}>
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
