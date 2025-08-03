export const runtime = "edge";

export function GET() {
  const body = `
User-agent: *
Allow: /

Sitemap: https://nutrigeniusai.vercel.app/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
