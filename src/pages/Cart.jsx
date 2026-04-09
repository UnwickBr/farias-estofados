import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { getCart, updateCartQty, removeFromCart, clearCart } from "../lib/cart";
import { createOrderFromCart } from "../lib/orders";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const update = () => setCart(getCart());
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/usuario" } } });
      return;
    }

    createOrderFromCart({
      cartItems: cart,
      total,
      userLogin: user?.login,
    });

    clearCart();
    navigate("/usuario");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 text-center px-6">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-6" />
          <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
            Seu carrinho está vazio
          </h2>
          <p className="text-muted-foreground mb-8">
            Explore nosso catálogo e encontre peças incríveis para o seu espaço.
          </p>
          <Button asChild className="rounded-full px-8">
            <Link to="/catalogo">Explorar Catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Continuar comprando
        </Link>

        <h1 className="font-display text-3xl font-semibold text-foreground mb-10">
          Carrinho
        </h1>

        <div className="space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-5 pb-6 border-b border-border"
              >
                <Link to={`/produto/${item.id}`} className="shrink-0">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 bg-secondary rounded-lg overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground/30">
                        Sem imagem
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => updateCartQty(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="mt-10 bg-secondary rounded-lg p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-lg font-semibold text-foreground">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Frete calculado no fechamento do pedido.
          </p>
          <Button onClick={handleCheckout} className="w-full rounded-full h-12 text-sm font-medium">
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
