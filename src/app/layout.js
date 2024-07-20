// import { Inter } from "next/font/google";
// import "./globals.css";

// import localFont from "next/font/local";
// import Header from "@/components/Header";

// const inter = Inter({ subsets: ["latin"] });

// const calSans = localFont({
//   src: "../../public/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-calSans",
// });

// export const metadata = {
//   title: "MetaScraper - Website Metadata Extractor",
//   description:
//     "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
//   keywords: [
//     "metadata",
//     "web scraping",
//     "OG image",
//     "description",
//     "title",
//     "SEO",
//   ],
//   iconLight: "/favicon-light.ico",
//   iconDark: "/favicon-dark.ico",
//   "og:image": "/openGraph.png",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta name="description" content={metadata.description} />
//         <meta name="keywords" content={metadata.keywords.join(", ")} />
//         <meta property="og:title" content={metadata.title} />
//         <meta property="og:description" content={metadata.description} />
//         <meta property="og:image" content={metadata["og:image"]} />
//         <link rel="icon" id="favicon" href={metadata.iconLight} />
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//           (function() {
//             function updateFavicon() {
//               const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
//               const favicon = document.getElementById('favicon');
//               favicon.href = isDarkMode ? '${metadata.iconLight}' : '${metadata.iconDark}';
//             }
//             window.matchMedia('(prefers-color-scheme: dark)').addListener(updateFavicon);
//             updateFavicon();
//           })();
//         `,
//           }}
//         />
//       </head>

//       <body className={`${calSans.variable} ${inter.className}`}>
//         <main className="absolute inset-0 -z-10 h-max w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
//           <div className="flex min-h-screen w-full flex-col space-y-6 p-4 md:p-8">
//             <Header />
//             {children}
//           </div>
//         </main>
//       </body>
//     </html>
//   );
// }


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
  ],
  iconLight: "/favicon-light.ico",
  iconDark: "/favicon-dark.ico",
  "og:image": "/openGraph.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata["og:image"]} />
        <link rel="icon" href={metadata.iconLight} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function updateFavicon() {
                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const favicon = document.getElementById('favicon');
                favicon.href = isDarkMode ? '${metadata.iconLight}' : '${metadata.iconDark}';
              }
              window.matchMedia('(prefers-color-scheme: dark)').addListener(updateFavicon);
              updateFavicon();
            })();
            `,
          }}
        />
      </head>

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
