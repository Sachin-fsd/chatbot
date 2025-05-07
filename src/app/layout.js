import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forest AI",
  description: "AI that feels free",
  icons: {
    icon: 'public\logo.png', // Path to your .ico file
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* <meta name="theme-color" content="#020617" /> */}
        {/* Twitter */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://musica-steel.vercel.app/summary_large_image.jpeg" />
        <meta name="twitter:title" content="Musica NextGen Music" /> */}
        <meta name="twitter:description" content="Made with 💖" />

        {/* Open Graph / Facebook*/}
        {/* <meta property="og:image" content="https://musica-steel.vercel.app/summary_large_image.jpeg" />
        <meta property="og:site_name" content="Musica NextGen Music" />
        <meta property="og:title" content="Musica NextGen Music" />
        <meta property="og:description" content="Made with 💖" />
        <meta property="og:url" content="https://musica-steel.vercel.app" /> */}

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
