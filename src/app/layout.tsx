import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientLayout from "@/components/client-layout";

// Primary font for body text - clean and readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Modern sans-serif for headings - professional and impactful
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Elegant serif for hero and key sections - authoritative
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Monospace for technical content and metrics
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Modern geometric sans-serif for navigation and UI elements
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Manager Portfolio | Building Digital Products That Solve Real Problems",
  description: "Experienced Product Manager with 6+ years in product strategy, roadmap planning, and team leadership. Delivered 12+ products with ₹30 Cr+ revenue impact.",
  keywords: ["Product Manager", "Product Strategy", "Roadmap Planning", "Agile", "Scrum", "UX Research", "Analytics"],
  authors: [{ name: "Product Manager Portfolio" }],
  creator: "Product Manager",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pm-portfolio.vercel.app",
    title: "Product Manager Portfolio | Building Digital Products That Solve Real Problems",
    description: "Experienced Product Manager with 6+ years in product strategy, roadmap planning, and team leadership. Delivered 12+ products with ₹30 Cr+ revenue impact.",
    siteName: "PM Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Portfolio | Building Digital Products That Solve Real Problems",
    description: "Experienced Product Manager with 6+ years in product strategy, roadmap planning, and team leadership. Delivered 12+ products with ₹30 Cr+ revenue impact.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${jetbrains.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="pm-portfolio-theme">
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
