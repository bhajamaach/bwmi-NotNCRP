import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { LocaleProvider } from "@/components/LocaleProvider";
import { MockDataProvider } from "@/components/MockDataProvider";
import { PwaRegister } from "@/components/PwaRegister";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "NotNCRP",
  description: "Report cybercrime with urgency-first triage, proportional fund liens, and a transparent case timeline.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png"
  }
};

export const viewport = {
  themeColor: "#0B3D91"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`} lang="en">
      <body className="font-sans" suppressHydrationWarning>
        <PwaRegister />
        <LocaleProvider>
          <MockDataProvider>
            <AppShell>{children}</AppShell>
          </MockDataProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
