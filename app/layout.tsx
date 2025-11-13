import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";

const CommissionerSans = Commissioner({
  variable: "--font-commisioner-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Configurator",
  description: "Created by f4G0Ld",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${CommissionerSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}