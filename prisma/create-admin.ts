import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Pemakaian: npx tsx prisma/create-admin.ts "<username>" "<password>" "<nama tampilan>" [--hapus-lama]
const prisma = new PrismaClient();

async function main() {
  const [rawUsername, password, name] = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  if (!rawUsername || !password) throw new Error('Pakai: npx tsx prisma/create-admin.ts "<username>" "<password>" "<nama>" [--hapus-lama]');
  const username = rawUsername.trim().toLowerCase();
  const passwordHash = await hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email: username },
    update: { passwordHash, name: name ?? undefined },
    create: { email: username, passwordHash, name: name ?? username },
  });
  console.log(`Admin siap: ${user.email}`);
  if (process.argv.includes("--hapus-lama")) {
    const removed = await prisma.user.deleteMany({ where: { id: { not: user.id } } });
    console.log(`Admin lama dihapus: ${removed.count}`);
  }
}

main().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
