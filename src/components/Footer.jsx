import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4"><span className="text-blue-400">Farias</span> Estofados</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Móveis de design contemporâneo que transformam espaços em experiências. Qualidade artesanal para o seu lar.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5 text-primary-foreground/50">
              Navegação
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Início
              </Link>
              <Link to="/catalogo" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Catálogo
              </Link>
              <Link to="/contato" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Contato
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5 text-primary-foreground/50">
              Contato
            </h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>contato@maison.com.br</p>
              <p>(11) 99999-0000</p>
              <p>São Paulo, SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-14 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Farias Estofados. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}