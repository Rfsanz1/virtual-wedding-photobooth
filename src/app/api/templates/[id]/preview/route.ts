import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { _p?: PrismaClient };
const prisma = g._p ?? (g._p = new PrismaClient());

type Field = "background" | "overlay" | "logo";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await ctx.params;
  const q = new URL(req.url).searchParams.get("f");
  const field: Field = q === "overlay" || q === "logo" ? q : "background";
  const t = (await prisma.template.findUnique({ where: { id }, select: { [field]: true } })) as unknown as Record<string, string | null> | null;
  const value = t?.[field];
  if (!value) return new Response("Not found", { status: 404 });

  const headers = { "Cache-Control": "public, max-age=31536000, immutable" };
  const m = value.match(/^data:([^;,]+)((?:;[^,]*)?),([\s\S]*)$/);
  if (!m) return Response.redirect(value, 302);
  const body = m[2].includes("base64") ? Buffer.from(m[3], "base64") : decodeURIComponent(m[3]);
  return new Response(body, { headers: { ...headers, "Content-Type": m[1] } });
}
