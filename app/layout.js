import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title:       'Earth & Essence Co. — Organic Handmade Skincare',
  description: 'Pure, handcrafted soaps and face creams made with botanical ingredients. No sulphates. No parabens. Just nature.',
  keywords:    'organic soap, handmade skincare, natural face cream, hair soap, ayurvedic',
  openGraph: { title: 'Earth & Essence Co.', description: 'Organic handmade soaps & face creams.', type: 'website' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
