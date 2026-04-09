const svgToDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const makePlaceholder = ({ title, subtitle, start, end }) =>
  svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="960" cy="170" r="170" fill="rgba(255,255,255,0.12)" />
      <circle cx="220" cy="720" r="220" fill="rgba(255,255,255,0.08)" />
      <rect x="120" y="170" rx="28" ry="28" width="430" height="420" fill="rgba(255,255,255,0.12)" />
      <rect x="170" y="230" rx="18" ry="18" width="210" height="210" fill="rgba(255,255,255,0.18)" />
      <rect x="170" y="470" rx="10" ry="10" width="220" height="18" fill="rgba(255,255,255,0.22)" />
      <rect x="170" y="505" rx="10" ry="10" width="150" height="18" fill="rgba(255,255,255,0.16)" />
      <text x="640" y="390" fill="white" font-size="72" font-family="Georgia, serif" font-weight="700">${title}</text>
      <text x="640" y="455" fill="rgba(255,255,255,0.85)" font-size="30" font-family="Arial, sans-serif">${subtitle}</text>
    </svg>
  `)

export const placeholderImages = {
  hero: makePlaceholder({
    title: 'Farias Estofados',
    subtitle: 'Conforto, textura e acabamento para cada ambiente',
    start: '#1f3b73',
    end: '#9d6b53',
  }),
  about: makePlaceholder({
    title: 'Feito com cuidado',
    subtitle: 'Base visual temporaria para o catalogo',
    start: '#4c5c68',
    end: '#c28f65',
  }),
  sofas: makePlaceholder({
    title: 'Sofas',
    subtitle: 'Colecao',
    start: '#6d7d8b',
    end: '#c28f65',
  }),
  cadeiras: makePlaceholder({
    title: 'Cadeiras',
    subtitle: 'Colecao',
    start: '#59636f',
    end: '#8e614b',
  }),
  puffes: makePlaceholder({
    title: 'Puffes',
    subtitle: 'Colecao',
    start: '#7b5d52',
    end: '#c9a27e',
  }),
  almofadas: makePlaceholder({
    title: 'Almofadas',
    subtitle: 'Colecao',
    start: '#657b83',
    end: '#b7876d',
  }),
}
