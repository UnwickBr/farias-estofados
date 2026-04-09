const ORDERS_STORAGE_KEY = 'farias_estofados_orders'

const readOrders = () => {
  try {
    return JSON.parse(window.localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const writeOrders = (orders) => {
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  window.dispatchEvent(new Event('orders-updated'))
}

export const getOrdersByUser = (userLogin) => {
  if (!userLogin) return []
  return readOrders().filter((order) => order.userLogin === userLogin)
}

export const createOrderFromCart = ({ cartItems, total, userLogin }) => {
  const orderNumber = `FE-${Math.floor(1000 + Math.random() * 9000)}`
  const createdAt = new Date()

  const order = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    code: `#${orderNumber}`,
    status: 'Em preparo',
    date: createdAt.toLocaleDateString('pt-BR'),
    total: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total),
    items: cartItems,
    userLogin,
  }

  writeOrders([order, ...readOrders()])
  return order
}
