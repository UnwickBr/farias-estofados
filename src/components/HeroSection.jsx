import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { placeholderImages } from '@/lib/placeholder-images'
import { applyFallbackImage } from '@/lib/image-fallbacks'

export default function HeroSection({ image }) {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px]">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Interior moderno com moveis elegantes"
          onError={(event) => applyFallbackImage(event, placeholderImages.hero)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-xs tracking-[0.3em] uppercase mb-4"
          >
            Colecao 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6"
          >
            Design que transforma espacos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/70 text-base leading-relaxed mb-8 max-w-md"
          >
            Pecas exclusivas com acabamento artesanal. Elegancia e conforto para cada ambiente do seu lar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
              <Link to="/catalogo">
                Explorar catalogo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
