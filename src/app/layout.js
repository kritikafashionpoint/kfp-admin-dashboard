import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "./common/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard Panel | Kritika Fashion Point",
  description: "Admin Dashboard Panel For Website Management | Kritika Fashion Point Jodhpur",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Cinzel:wght@400..900&family=Cormorant:ital,wght@0,300..700;1,300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Saira+Stencil:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body >
         <MainLayout>
            {children}
          </MainLayout>
      </body>
    </html>
  );
}
