import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { mockProducts } from '@/lib/mock-products'
import ProductCard from '../components/ProductCard'

const categories = ['Todos', 'Sofas', 'Cadeiras', 'Puffes', 'Almofadas']

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('categoria')

    if (category && categories.includes(category)) {
      setActiveCategory(category)
    }
  }, [])

  useEffect(() => {
    const nextProducts =
      activeCategory === 'Todos'
        ? mockProducts
        : mockProducts.filter((product) => product.category === activeCategory)

    setProducts(nextProducts)
    setLoading(false)
  }, [activeCategory])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="pt-24 lg:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Colecao completa</p>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">Catalogo</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9 rounded-full bg-secondary border-0 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-muted-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
