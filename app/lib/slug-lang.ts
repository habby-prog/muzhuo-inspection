const ES_PREFIXES = [
  'inspeccion', 'como', 'cuanto', 'diferencia', 'requisitos', 'normas',
  'proceso', 'prevista', 'supervision', 'verificacion', 'guia',
  'importar', 'materiales', 'control',
]

// Slugs whose Spanish title does not start with one of the prefixes above.
// Checked against the Sanity post list on 2026-11-19; append new Spanish
// slugs here instead of widening the prefix list (prefixes are risky: e.g.
// "control" / "proceso" also show up in English slugs).
export const ES_SLUGS = [
  'auditoria-fabrica-china-12-preguntas-antes-anticipo',
  'que-es-previo-de-origen-importar-mexico',
  'contenedor-rechazado-origen-causas',
  'errores-comunes-importar-china-verificacion-previa',
  'verificar-proveedor-chino-sin-viajar',
]

export function isSpanishSlug(slug: string): boolean {
  if (!slug) return false
  if (ES_SLUGS.indexOf(slug) > -1) return true
  return ES_PREFIXES.some((p) => slug.startsWith(p + '-') || slug === p)
}

// Root layout ships <html lang="en"> because a Next.js root layout cannot vary
// the lang attribute per route while staying static. This inline script runs in
// <head> (before first paint) and corrects the attribute for Spanish pages, so
// rendered HTML and Googlebot see lang="es". Keep the data in sync with the
// helpers above.
export const LANG_SIGNAL_SCRIPT =
  '(function(){try{' +
  'var p=(location.pathname||"/").replace(/\\/+$/,"");' +
  'var es=' + JSON.stringify(ES_SLUGS) + ';' +
  'var pe=' + JSON.stringify(ES_PREFIXES) + ';' +
  'var m=p.match(/^\\/blog\\/([^\\/]+)/);' +
  'var isEs=false;' +
  'if(p==="/es"||p.indexOf("/es/")===0){isEs=true}' +
  'else if(m){var s=decodeURIComponent(m[1]);' +
  'isEs=es.indexOf(s)>-1||pe.some(function(x){return s===x||s.indexOf(x+"-")===0})}' +
  'document.documentElement.lang=isEs?"es":"en";' +
  '}catch(e){}})();'
