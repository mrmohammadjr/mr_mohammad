import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mr Mohammad",
  description: "Mohammad Javad Rasooli — Front-End Developer",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en" className={``}>
      <body className="min-h-full flex flex-col">

          {children}

          {modal}

      </body>
    </html>
  );
}
