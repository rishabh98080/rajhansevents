import { Inter, Cinzel, Pinyon_Script } from 'next/font/google';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';
import WhatsAppWidget from '@/component/WidgetLoader'; 

// Define the fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const pinyon = Pinyon_Script({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
});

export const metadata = {
  title: "Raj Hansh",
  description: "Professional wedding, birthday, and corporate event planning in Ranchi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${pinyon.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main> {/* Ensures content is wrapped correctly */}
        <Footer />
        <WhatsAppWidget/>
      </body>
    </html>
  );
}