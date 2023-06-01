import React, { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/layout.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className='layout_container'>
        {children}
      </main>
      <Footer />
    </>
  );
}
