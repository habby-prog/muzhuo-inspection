import type { Metadata } from 'next'
import { SITE_URL } from './site'

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
    },
  }
}
