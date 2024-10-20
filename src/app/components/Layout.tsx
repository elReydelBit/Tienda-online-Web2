import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Aquí el navbar común a todas las páginas */}
      <main className="container mx-auto flex-grow p-6">{children}</main> {/* Aquí va el contenido específico de cada página */}
      <Footer /> {/* Aquí el footer común a todas las páginas */}
    </div>
  );
};

export default Layout;
