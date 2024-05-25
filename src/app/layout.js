import { Varela_Round, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/Provider";



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

export default async function RootLayout({ children }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={`${inter.variable} ${varela_round.variable}`}>
       <Provider>
        {children}
       </Provider>
      </body>
    </html>
    </SessionProvider>
  );
}
