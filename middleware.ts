import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 防盗链兜底：Cloudflare 的 Hotlink Protection 不覆盖 .webp/.avif，
 * Free 计划的 WAF 又不允许 matches 正则，所以在这一层补上。
 *
 * 规则与 Cloudflare 行为对齐：
 *  - 无 Referer（浏览器直接打开、社交平台抓取预览）/ 无法解析 → 放行
 *  - 本站 Referer → 放行
 *  - 搜索引擎、社交平台 Referer → 放行（避免误伤 Google 图片和分享预览）
 *  - 其他外站 Referer → 403
 */
const IMAGE_ASSET = /\.(webp|avif|jpe?g|png|gif)$/i

const ALLOWED_REFERER = [
  'muzhuoinspection.com',
  'google.', 'bing.com', 'yandex.', 'baidu.com', 'duckduckgo.com',
  'facebook.com', 'twitter.com', 'x.com', 'linkedin.com', 'whatsapp.com', 't.co',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!IMAGE_ASSET.test(pathname)) return NextResponse.next()

  const referer = req.headers.get('referer')
  if (!referer) return NextResponse.next()

  let host = ''
  try {
    host = new URL(referer).hostname.toLowerCase()
  } catch {
    return NextResponse.next()
  }

  const allowed = ALLOWED_REFERER.some((h) => (h.endsWith('.') ? host.includes(h) : host === h || host.endsWith('.' + h)))
  if (allowed) return NextResponse.next()

  return new NextResponse('Hotlinking is not allowed for this asset.', {
    status: 403,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export const config = {
  matcher: ['/samples/:path*', '/seo/:path*'],
}
