import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { applyFallbackImage, getCategoryFallbackImage } from '@/lib/image-fallbacks'

export default function ProductCard({ product }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to={`/produto/${product.id}`} className="group block">
        <div className="aspect-[4/5] bg-secondary rounded-lg overflow-hidden mb-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onError={(event) => applyFallbackImage(event, getCategoryFallbackImage(product.category))}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
              <span className="text-sm">Sem imagem</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground tracking-wide uppercase">{product.category}</p>
          <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/70 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
