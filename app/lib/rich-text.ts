const blockedTags = /<(script|style|iframe|object|embed|form|input|button|textarea|select|meta|link|base)[\s\S]*?<\/\1\s*>/gi;
const selfClosingBlocked = /<(script|style|iframe|object|embed|form|input|button|textarea|select|meta|link|base)\b[^>]*\/?>/gi;
const eventAttributes = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const javascriptUrls = /(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi;

export function sanitizeRichHtml(value: unknown) {
  return String(value ?? "")
    .replace(blockedTags, "")
    .replace(selfClosingBlocked, "")
    .replace(eventAttributes, "")
    .replace(javascriptUrls, '$1="#"')
    .trim();
}

export function plainTextFromHtml(value: unknown) {
  return sanitizeRichHtml(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
