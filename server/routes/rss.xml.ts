import { queryCollection } from '@nuxt/content/server'

const SITE_URL = 'https://my-blog.zengxhzz.workers.dev'
const SITE_NAME = 'k1sakityan.'
const SITE_DESC = '记录开发、阅读与思考的个人博客。'

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.path}`
      const pubDate = new Date(post.date)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${Number.isNaN(pubDate.getTime()) ? '' : `<pubDate>${pubDate.toUTCString()}</pubDate>`}
      <description>${escapeXml(post.description ?? '')}</description>
    </item>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-cn</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`
})
