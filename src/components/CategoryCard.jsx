import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryCard({ name, image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/catalogo?categoria=${encodeURIComponent(name)}`}
        className="group relative block aspect-[4/5] rounded-lg overflow-hidden"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <h3 className="text-white font-display text-lg font-medium">{name}</h3>
          <ArrowRight className="h-4 w-4 text-white/70 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}