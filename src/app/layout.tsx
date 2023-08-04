import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/layout.css'
import '../styles/main.css'
import { NewTask } from '../components/NewTask';
import ContextProvider from '../context/TaskContext';

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
        <ContextProvider>
          {children}
        </ContextProvider>
      </main>
      <Footer />
      <NewTask />
      </body>
    </html>
  );
}