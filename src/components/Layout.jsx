import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("maison_cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    };
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar cartCount={cartCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}