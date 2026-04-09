const CART_KEY = "maison_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((i) => i.id === product.id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  } else {
    const idx = cart.findIndex((i) => i.id === productId);
    if (idx >= 0) cart[idx].qty = qty;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function clearCart() {
  localStorage.setItem(CART_KEY, "[]");
  window.dispatchEvent(new Event("cart-updated"));
}