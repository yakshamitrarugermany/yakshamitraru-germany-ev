import "dotenv/config";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

const MIN_PASSWORD_LENGTH = 12;

async function main() {
  const rawEmail = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim();

  const missing: string[] = [];
  if (!rawEmail) missing.push("ADMIN_EMAIL");
  if (!password) missing.push("ADMIN_PASSWORD");
  if (!name) missing.push("ADMIN_NAME");

  if (missing.length > 0) {
    console.error(
      `Refusing to create admin: missing required environment variable(s): ${missing.join(", ")}`,
    );
    process.exitCode = 1;
    return;
  }

  if (password!.length < MIN_PASSWORD_LENGTH) {
    console.error(
      `Refusing to create admin: ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    );
    process.exitCode = 1;
    return;
  }

  const email = rawEmail!.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Refusing to create admin: ADMIN_EMAIL is not a valid email address.");
    process.exitCode = 1;
    return;
  }

  const ctx = await auth.$context;

  const existing = await ctx.internalAdapter.findUserByEmail(email);
  if (existing?.user) {
    console.log(`Admin user "${email}" already exists. Nothing to do.`);
    return;
  }

  const hashedPassword = await ctx.password.hash(password!);

  const createdUser = await ctx.internalAdapter.createUser(
    {
      email,
      name: name!,
      emailVerified: true,
      role: "ADMIN",
    },
    { method: "admin" },
  );

  await ctx.internalAdapter.linkAccount({
    userId: createdUser.id,
    providerId: "credential",
    accountId: createdUser.id,
    password: hashedPassword,
  });

  console.log(`Created ADMIN user "${createdUser.email}" (id: ${createdUser.id}).`);
}

main()
  .catch((err) => {
    console.error("Failed to create admin user:", err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
