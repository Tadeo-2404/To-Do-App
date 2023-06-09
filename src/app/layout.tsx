import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/layout.css'
import { NewTask } from '../components/NewTask';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='body_container'>
      <Navbar />
      <main className='layout_container'>
        {children}
      </main>
      <Footer />
      <NewTask />
      </body>
    </html>
  );
}