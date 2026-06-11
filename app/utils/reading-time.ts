/**
 * 从 Nuxt Content v3 的 body(minimark AST)中提取纯文本。
 * minimark 节点形如 [tag, props, ...children];兼容旧式对象节点。
 */
function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) {
    // [tag, props, ...children] → 跳过 tag 与 props
    return node.slice(2).map(extractText).join('')
  }
  if (node && typeof node === 'object') {
    const n = node as Record<string, unknown>
    if (typeof n.value === 'string') return n.value
    if (Array.isArray(n.value)) return n.value.map(extractText).join('')
    if (Array.isArray(n.children)) return n.children.map(extractText).join('')
  }
  return ''
}

const CJK_RE = /[\u4E00-\u9FFF\u3040-\u30FF\uF900-\uFAFF]/g

/** 估算阅读分钟数:中文约 350 字/分钟,英文约 200 词/分钟,至少 1 分钟 */
export function readingTime(body: unknown): number {
  const text = extractText(body)
  const cjkCount = (text.match(CJK_RE) || []).length
  const latinWords = text
    .replace(CJK_RE, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(cjkCount / 350 + latinWords / 200))
}
