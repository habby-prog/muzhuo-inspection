/**
 * Per-article SEO layer for the blog.
 *
 * The article body itself lives in Sanity. This module only adds what the CMS
 * cannot express: a keyword-led H1 and meta title, a standfirst that states the
 * search intent in the first paragraph, a small set of extra FAQs (rendered and
 * emitted as FAQPage JSON-LD), and the cross-links that keep the three
 * "edge" articles and the service pages connected.
 *
 * Keys are Sanity slugs. Articles without an entry render exactly as before.
 */

export type BlogFaq = { q: string; a: string }
export type BlogLink = { href: string; label: string; note: string }

export type BlogSeo = {
  metaTitle?: string
  metaDescription?: string
  h1?: string
  lead?: string
  faqs?: BlogFaq[]
  /** Heading for the extra FAQ block. */
  faqHeading?: string
  links?: BlogLink[]
}

export const blogSeo: Record<string, BlogSeo> = {
  'argentina-import-regulations-2026-quality-control': {
    metaTitle: 'Argentina Import Regulations 2026: SIMI, S-Mark and QC Checklist',
    metaDescription:
      'Argentina import regulations 2026 in practice: SIMI declarations, S-mark certification, Spanish labeling, plug and voltage rules, and the pre-shipment quality control checklist that keeps a container out of demurrage.',
    h1: 'Argentina Import Regulations 2026: SIMI, S-Mark and Quality Control Checklist',
    lead:
      'Argentina import regulations are enforced at the port, but the expensive mistakes are made in China: the wrong plug, a 110V marking on a 220V market, an S-mark that does not cover the model, an SIMI declaration filed with data that does not match the cartons. This checklist covers what to verify before the container is sealed.',
    faqs: [
      {
        q: 'Does a pre-shipment inspection replace S-mark certification?',
        a: 'No. S-mark certification is a market-access process carried out by an IRAM-accredited body before the goods are sold; an inspection cannot create it. What a pre-shipment inspection does is verify that the certificate exists, that its scope names your model, and that the S-mark is actually printed on the product and the label as the certificate requires. Goods marked with a CE or CB logo but no S-mark fail at customs regardless of how good the product is.',
      },
      {
        q: 'Can my Chinese supplier file the SIMI declaration for me?',
        a: 'The SIMI declaration is filed in Argentina by the importer of record, not by the Chinese supplier. The supplier side is to deliver accurate commercial invoice and packing list data early enough for the declaration to be approved before the vessel sails. The inspection step is checking that the data in those documents matches the goods: model references, quantities, carton marks, HS code and unit values.',
      },
      {
        q: 'What should an inspection report for Argentina-bound goods contain?',
        a: 'At minimum: legible photos of the Spanish label showing the importer name and CUIT, the country of origin, 220V/50Hz ratings, the date of manufacture and the S-mark where applicable; a photo of the plug type fitted; photos of carton marks that match the SIMI and packing list data; and the AQL plan used, with lot size, code letter, sample size and accept and reject numbers. Those photos are the evidence you rely on if customs or the importer disputes the shipment later.',
      },
    ],
    faqHeading: 'More questions about Argentina-bound shipments',
    links: [
      {
        href: '/blog/inspection-report-photo-standards-5-views',
        label: 'Inspection report photo standards: the 5 views',
        note: 'Label, S-mark and plug evidence only counts if the photos are shot and named to a standard.',
      },
      {
        href: '/blog/como-verificar-bobinas-acero-antes-cargar',
        label: 'Inspección de bobinas de acero antes de cargar',
        note: 'For steel and coil cargo, the pre-loading check is where most claims are won or lost.',
      },
      {
        href: '/container-loading-supervision',
        label: 'China container loading supervision',
        note: 'Quantity, container condition, loading sequence, securing and seal, documented before the doors close.',
      },
      {
        href: '/services/psi',
        label: 'Pre-shipment inspection service',
        note: 'The AQL-based quality check that runs before loading.',
      },
    ],
  },

  'como-verificar-bobinas-acero-antes-cargar': {
    metaTitle: 'Inspección de bobinas de acero antes de cargar: lista de control',
    metaDescription:
      'Cómo inspeccionar bobinas de acero antes de cargar en China: dimensiones, superficie y bordes, embalaje, condición del contenedor y trincaje. Lista de control y errores que encontramos en puerto.',
    h1: 'Inspección de bobinas de acero antes de cargar: lista de control',
    lead:
      'Una bobina de acero se daña en dos momentos: en el puerto de origen, durante la manipulación y el trincaje, o durante la travesía. La inspección antes de cargar es la última oportunidad de documentar el estado real del material y de comprobar que el trincaje aguanta treinta días de mar.',
    faqs: [
      {
        q: '¿Qué diferencia hay entre inspeccionar la bobina y supervisar la carga?',
        a: 'La inspección de la bobina mide y documenta el material: espesor, ancho, peso, condición superficial, bordes, embalaje y marcas. La supervisión de carga documenta el contenedor y la operación: condición del equipo, secuencia de carga, calzos, flejes, puntos de apoyo, fotos y precinto final. En bobinas conviene hacer las dos cosas en la misma visita, porque el daño suele aparecer justo en el paso de la bobina al contenedor.',
      },
      {
        q: '¿Se puede inspeccionar una bobina sin desenrollarla?',
        a: 'Sí. El espesor y el ancho se miden en el borde y en varios puntos, la superficie y los bordes se revisan visualmente en la cara exterior y en los costados, y el peso se contrasta con la documentación. Desenrollar solo se justifica cuando el cliente necesita ver capas interiores por un defecto concreto; en ese caso hay que acordarlo antes, porque implica devanar y volver a embalar.',
      },
      {
        q: '¿Qué pasa si el trincaje no cumple en el momento de cargar?',
        a: 'Se detiene la carga antes de cerrar las puertas. El inspector documenta con fotos lo que falta —calzos, flejes, separación entre bobinas, apoyo sobre madera, distribución del peso— y se corrige en el sitio, con una segunda ronda de fotos que muestra la solución. Cerrar el contenedor con un trincaje deficiente traslada el riesgo al comprador: en un reclamo, el transportista y la naviera van a señalar precisamente esas fotos.',
      },
    ],
    faqHeading: 'Preguntas adicionales sobre bobinas de acero',
    links: [
      {
        href: '/blog/steel-coil-container-loading-supervision-guide',
        label: 'Steel coil container loading supervision (English guide)',
        note: 'The loading plan, dunnage and lashing rules in detail.',
      },
      {
        href: '/blog/inspection-report-photo-standards-5-views',
        label: 'Normas de fotografía para informes de inspección',
        note: 'Cómo fotografiar para que la evidencia sirva en un reclamo.',
      },
      {
        href: '/container-loading-supervision',
        label: 'Supervisión de carga de contenedores en China',
        note: 'Alcance, proceso y entregables de la supervisión de carga.',
      },
      {
        href: '/aql-calculator-guide',
        label: 'Guía de muestreo AQL (Z1.4 / ISO 2859-1)',
        note: 'Cómo se fijan el tamaño de muestra y los números de aceptación.',
      },
    ],
  },

  'inspection-report-photo-standards-5-views': {
    metaTitle: 'Inspection Report Photo Standards: The 5 Views Every Report Needs',
    metaDescription:
      'The five photo views every inspection report needs — carton, open carton, color box, open box and products — plus the IMAGE XX naming rule and the shots that make a report hold up in a claim.',
    h1: 'Inspection Report Photo Standards: The 5 Views Every Report Needs',
    lead:
      'Inspection report photos are evidence, not decoration. The five-view standard exists so that a buyer who never sets foot in the factory can verify packing, labelling and product condition from the file alone, and so that a supplier cannot argue about what was photographed. Get the order and the names wrong and the strongest finding in the report becomes the easiest one to dispute.',
    faqs: [
      {
        q: 'How many photos should an inspection report contain?',
        a: 'There is no fixed number, and any inspector who quotes one is guessing. The floor is the five standard views for every carton in the sample, plus close-ups of every defect recorded, plus the measurement and test shots the checklist requires. A 200-unit sample with three defect types commonly produces 80 to 150 files. What matters is that the report states the count and that every defect line refers to a named photo.',
      },
      {
        q: 'Should photos be cropped or edited before they go into the report?',
        a: 'No cropping that removes context, no filters, no retouching. The point of the carton, open-carton and open-box views is that they show the goods in their surroundings: the shipping mark, the packing material, the number of units in the box. A tight crop of a scratch proves a scratch exists but not which carton it came from. Resizing for file size is fine; anything that changes what the camera recorded is not.',
      },
      {
        q: 'Do phone photos meet inspection report standards?',
        a: 'They can, if four rules are followed: enough resolution to read a label at 100%, even lighting with the label or defect in focus, a timestamp that matches the inspection day, and the IMAGE XX naming sequence applied to the files as they are transferred. What fails in a claim is not the phone but the missing context — an unreadable label, a shadow across the defect, or a file name that no longer matches the report line.',
      },
    ],
    faqHeading: 'More questions about inspection photos',
    links: [
      {
        href: '/blog/argentina-import-regulations-2026-quality-control',
        label: 'Argentina import regulations 2026: quality control checklist',
        note: 'Where label, S-mark and plug photos become customs evidence.',
      },
      {
        href: '/blog/como-verificar-bobinas-acero-antes-cargar',
        label: 'Inspección de bobinas de acero antes de cargar',
        note: 'Photo documentation for coil condition and lashing before the doors close.',
      },
      {
        href: '/container-loading-supervision',
        label: 'China container loading supervision',
        note: 'Container condition, loading sequence, securing and seal — photographed end to end.',
      },
      {
        href: '/services/psi',
        label: 'Pre-shipment inspection service',
        note: 'The inspection these photo standards are written for.',
      },
    ],
  },
}

export function getBlogSeo(slug: string): BlogSeo | undefined {
  return blogSeo[slug]
}
