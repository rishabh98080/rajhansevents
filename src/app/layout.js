import { 
  Playfair_Display, 
  Cormorant_Garamond, 
  Nunito_Sans, 
  Poppins 
} from 'next/font/google';
import { lazy, Suspense } from "react";
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';
import AutoLogout from '@/app/admin/AutoLogout';

// --- HEADING FONTS ---
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

// --- BODY / VERSATILE FONTS ---
const nunito = Nunito_Sans({ 
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Raj Hansh",
  description: "Professional wedding, birthday, and corporate event planning in Ranchi.", //[cite: 3]
};
const ChatWidget = lazy(() => import('@/component/WhatsAppWidget'));
export default function RootLayout({ children }) {
  
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${cormorant.variable} ${nunito.variable} ${poppins.variable}`}
    >
      <body>
        <Navbar /> 
        <main>{children}</main> {/* Ensures content is wrapped correctly[cite: 3] */}
        <Footer /> 

        

        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
        <AutoLogout />
      </body>
    </html>
  );
}