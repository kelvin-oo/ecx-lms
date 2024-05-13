import { Varela_Round, Inter, Poppins } from "next/font/google";
import "./globals.css";


const varela_round = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela-round",
});
const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

export const metadata = {
  title: "ECX 21 DOC",
  description: "21 Days of Code by Engineering Career Expo",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${varela_round.variable}`}>
       {children}
      </body>
    </html>
  );
}
