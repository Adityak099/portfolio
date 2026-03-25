import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kumar Aditya | Full Stack Developer Portfolio",
  description:
    "Professional portfolio showcasing my expertise in web development, software engineering, and modern technologies. Explore my projects, skills, and experience.",
  keywords: [
    "Kumar Aditya",
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "Software Engineer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Kumar Aditya" }],
  creator: "Kumar Aditya",
  publisher: "Kumar Aditya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kumaraditya.dev", // Update with your actual domain
    title: "Kumar Aditya | Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing my expertise in web development, software engineering, and modern technologies.",
    siteName: "Kumar Aditya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar Aditya | Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing my expertise in web development, software engineering, and modern technologies.",
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
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
