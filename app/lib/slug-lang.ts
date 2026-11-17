const ES_PREFIXES = [
  'inspeccion', 'como', 'cuanto', 'diferencia', 'requisitos', 'normas',
  'proceso', 'prevista', 'supervision', 'verificacion', 'guia',
  'importar', 'materiales', 'control',
]

export function isSpanishSlug(slug: string): boolean {
  return ES_PREFIXES.some((p) => slug.startsWith(p + '-') || slug === p)
}
