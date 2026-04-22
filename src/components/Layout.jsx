import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
