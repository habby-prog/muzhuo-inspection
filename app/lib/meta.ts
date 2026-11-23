import type { Metadata } from 'next'
import { SITE_URL } from './site'
import { OG_DEFAULT, OG_DEFAULT_IMAGES } from './og'

/**
 * 页面级 metadata 统一构造：canonical 与 og:url 都指向本页。
 * 只写 alternates 而不写 openGraph 时，og:url 会继承根布局的首页地址，
 * 导致每条分享/抓取都把子页标成首页。
 */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = SITE_URL + path
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Muzhuo Inspection',
      locale: 'en_US',
      type: 'website',
      images: OG_DEFAULT_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_DEFAULT.url],
    },
  }
}
