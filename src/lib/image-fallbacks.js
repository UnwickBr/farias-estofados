import { placeholderImages } from './placeholder-images'

export const getCategoryFallbackImage = (category) => {
  switch (category) {
    case 'Sofas':
      return placeholderImages.sofas
    case 'Cadeiras':
      return placeholderImages.cadeiras
    case 'Puffes':
      return placeholderImages.puffes
    case 'Almofadas':
      return placeholderImages.almofadas
    default:
      return placeholderImages.about
  }
}

export const applyFallbackImage = (event, fallbackSrc) => {
  if (event.currentTarget.dataset.fallbackApplied === 'true') {
    return
  }

  event.currentTarget.dataset.fallbackApplied = 'true'
  event.currentTarget.src = fallbackSrc
}
