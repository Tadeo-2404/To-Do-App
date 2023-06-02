import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/layout.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Navbar />
      <main className='layout_container'>
        {children}
      </main>
      <Footer />
      </body>
    </html>
  );
}