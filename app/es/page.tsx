import type { Metadata } from 'next'
import { SITE_URL } from '../lib/site'
import { OG_DEFAULT, OG_DEFAULT_IMAGES } from '../lib/og'

export const metadata: Metadata = {
  title: 'Inspección de calidad en China | MUZHUO Inspection',
  description:
    'Inspección pre-embarque, auditoría de fábrica y supervisión de carga en China. Informe con fotos en 24 horas, en chino, inglés o español.',
  alternates: {
    canonical: SITE_URL + '/es',
    languages: { es: SITE_URL + '/es', en: SITE_URL, 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Inspección de calidad en China | MUZHUO Inspection',
    description:
      'Inspección pre-embarque, auditoría de fábrica y supervisión de carga en China. Informe con fotos en 24 horas.',
    url: SITE_URL + '/es',
    locale: 'es_MX',
    type: 'website',
    images: OG_DEFAULT_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspección de calidad en China | MUZHUO Inspection',
    description:
      'Inspección pre-embarque, auditoría de fábrica y supervisión de carga en China. Informe con fotos en 24 horas.',
    images: [OG_DEFAULT.url],
  },
}

const FAQS = [
  {
    q: '¿En qué idioma recibo el informe?',
    a: 'En chino, en inglés o en los dos idiomas en el mismo documento. Para compradores en México y Sudamérica recomendamos inglés con resumen en español, o bilingüe si el proveedor necesita leerlo.',
  },
  {
    q: '¿Cuánto tarda el informe?',
    a: 'Normalmente dentro de 24 horas después de la inspección, con fotos fechadas y la conclusión sobre el lote.',
  },
  {
    q: '¿Trabajan fuera de China?',
    a: 'No. Actualmente solo inspeccionamos en China continental, en cualquier provincia.',
  },
]

const services = [
  {
    title: 'Inspección pre-embarque (PSI)',
    text: 'Muestreo AQL, cantidad, acabados, función, medidas, etiquetas y embalaje. Se realiza cuando la producción está terminada y al menos el 80% está embalado.',
    href: '/blog/como-contratar-inspeccion-calidad-china-empresa-mexicana',
    cta: 'Cómo contratar una inspección',
  },
  {
    title: 'Auditoría de fábrica',
    text: 'Entidad legal, capacidad real, equipo, sistema de calidad y condiciones de trabajo. Antes de pagar el anticipo, no después.',
    href: '/blog/como-verificar-proveedor-china-cumple-normas-mexicanas',
    cta: 'Verificar un proveedor',
  },
  {
    title: 'Supervisión de carga',
    text: 'Cantidad y cajas contra el packing list, condición del contenedor, secuencia de carga, trincaje y precinto, con fotos de cada paso.',
    href: '/blog/supervision-carga-bobinas-acero-contenedores',
    cta: 'Supervisión de contenedor',
  },
]

export default function SpanishHome() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="bg-white">
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='es'" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-primary-300 mb-4">Inspección en China · Para importadores</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
            Inspección de calidad en China, antes de que el contenedor salga
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
            Verificamos lo que realmente compras: cantidad, acabados, función, etiquetas y embalaje.
            Informe con fotos fechadas, normalmente en 24 horas, en chino, inglés o español.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="https://wa.me/8616621704642?text=Hola%2C%20necesito%20una%20inspecci%C3%B3n%20en%20China" className="rounded-full bg-[#25D366] px-8 py-4 font-black uppercase tracking-widest text-sm text-slate-900 hover:brightness-95 text-center">
              WhatsApp
            </a>
            <a href="/sample-report" className="rounded-full border border-white/40 px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white/10 text-center">
              Ver informes de muestra
            </a>
          </div>
        </div>
      </section>

      <section className="border-b bg-slate-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div><p className="font-bold">24 h</p><p className="text-slate-500">Informe con fotos</p></div>
          <div><p className="font-bold">AQL</p><p className="text-slate-500">ISO 2859-1 / Z1.4</p></div>
          <div><p className="font-bold">Toda China</p><p className="text-slate-500">Cualquier provincia</p></div>
          <div><p className="font-bold">ES / EN / 中文</p><p className="text-slate-500">Informe bilingüe</p></div>
        </div>
      </section>

      <section id="servicios" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Qué hacemos</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Tres servicios, un mismo principio: lo que se ve en la fábrica queda documentado con fotos
            y por escrito, para que la decisión de pagar o rechazar no dependa de una conversación de WeChat.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-slate-200 p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-6 flex-1">{s.text}</p>
                <a href={s.href} className="mt-4 text-sm font-bold text-primary-600 hover:underline">{s.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Cómo funciona</h2>
          <ol className="space-y-5">
            <li><strong>1. Nos escribes</strong> con el producto, la cantidad, la fábrica y la fecha prevista. Te decimos si conviene PSI, auditoría o supervisión de carga.</li>
            <li><strong>2. Confirmamos alcance y precio</strong> por escrito. Reservamos la visita con 1 a 3 días de antelación.</li>
            <li><strong>3. Inspección en planta</strong> con muestreo AQL. Si algo no cuadra, se documenta en el momento, no después.</li>
            <li><strong>4. Informe en 24 horas</strong> con fotos fechadas y conclusión. Puedes usarlo para liberar el pago o pedir correcciones.</li>
          </ol>
        </div>
      </section>

      <section id="ejemplos" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Informes reales, datos del cliente eliminados</h2>
          <p className="text-slate-600 mb-8">
            Publicamos dos muestras de 8 páginas: una inspección de ropa y una supervisión de carga.
            Para otras categorías enviamos la muestra por correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/samples/MUZHUO-Sample-Clothing-Inspection.pdf" className="rounded-full bg-primary-600 px-6 py-3 font-bold text-white text-center hover:bg-primary-700">
              Muestra de ropa (PDF)
            </a>
            <a href="/samples/MUZHUO-Sample-Loading-Supervision.pdf" className="rounded-full border border-slate-300 px-6 py-3 font-bold text-center hover:bg-slate-50">
              Muestra de carga (PDF)
            </a>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Escríbenos en español</h2>
          <p className="text-slate-300 mb-6">
            Cuéntanos qué producto estás comprando y en qué provincia está la fábrica. Respondemos
            normalmente el mismo día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/8616621704642?text=Hola%2C%20necesito%20una%20inspecci%C3%B3n%20en%20China" className="rounded-full bg-[#25D366] px-8 py-4 font-bold text-center text-slate-900 hover:brightness-95">
              WhatsApp: +86 166 2170 4642
            </a>
            <a href="mailto:info@muzhuoinspection.com?subject=Consulta%20de%20inspecci%C3%B3n" className="rounded-full bg-primary-600 px-8 py-4 font-bold text-center hover:bg-primary-700">
              info@muzhuoinspection.com
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-bold">{f.q}</h3>
                <p className="text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
