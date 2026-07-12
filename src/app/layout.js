import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/component/Navbar"; // Ensure this path matches your folder
import Footer from "@/component/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// Metadata is handled here for SEO[cite: 16]
export const metadata = {
  title: "Raj Hansh Event | Premium Event Planning",
  description: "Professional wedding, birthday, and corporate event planning in Ranchi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main> {/* Ensures content is wrapped correctly */}
        <Footer />
      </body>
    </html>
  );
}