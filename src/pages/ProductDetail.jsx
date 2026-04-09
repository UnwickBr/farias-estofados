import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { applyFallbackImage, getCategoryFallbackImage } from '@/lib/image-fallbacks'
import { mockProducts } from '@/lib/mock-products'
import { addToCart } from '../lib/cart'
import { motion } from 'framer-motion'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const selectedProduct = mockProducts.find((item) => item.id === id) || null
    setProduct(selectedProduct)
    setLoading(false)
  }, [id])

  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  const handleAdd = () => {
    if (!product) return

    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="pt-28 flex justify-center">
        <div className="w-6 h-6 border-2 border-muted-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-28 text-center px-6">
        <p className="text-muted-foreground mb-4">Produto nao encontrado.</p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/catalogo">Voltar ao catalogo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-square bg-secondary rounded-lg overflow-hidden"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => applyFallbackImage(event, getCategoryFallbackImage(product.category))}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">Sem imagem</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">{product.category}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-foreground mb-6">{formatPrice(product.price)}</p>

            {product.description && <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>}

            {(product.material || product.dimensions) && (
              <div className="border-t border-border pt-6 mb-8 space-y-3">
                {product.material && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Material</span>
                    <span className="text-foreground font-medium">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dimensoes</span>
                    <span className="text-foreground font-medium">{product.dimensions}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button onClick={handleAdd} className="flex-1 rounded-full gap-2 h-11" disabled={!product.in_stock}>
                  {added ? (
                    <>
                      <Check className="h-4 w-4" />
                      Adicionado
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      {product.in_stock ? 'Adicionar ao carrinho' : 'Fora de estoque'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
