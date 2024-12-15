import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plant Schedule",
  description: "Nosotros te ayudamos a cuidar tus plantas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="flex min-h-screen w-full flex-col">{children}</body>
        </html>
    );
}
