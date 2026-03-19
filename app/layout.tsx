import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LED見積作成ツール",
  description: "LEDパネルの見積書を自動作成",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
