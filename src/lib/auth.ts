import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

const betterAuthUrl = process.env.BETTER_AUTH_URL?.trim();
const vercelEnv = process.env.VERCEL_ENV?.trim();
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL?.trim();
const vercelUrl = process.env.VERCEL_URL?.trim();
const isVercelPreview = vercelEnv === "preview";

const baseURL =
  betterAuthUrl ||
  (isVercelPreview && vercelBranchUrl
    ? `https://${vercelBranchUrl}`
    : undefined) ||
  (vercelUrl ? `https://${vercelUrl}` : undefined) ||
  "http://localhost:3000";

const trustedOrigins = Array.from(
  new Set(
    [
      betterAuthUrl,
      ...(isVercelPreview
        ? [
            vercelBranchUrl ? `https://${vercelBranchUrl}` : undefined,
            vercelUrl ? `https://${vercelUrl}` : undefined,
          ]
        : []),
    ].filter((origin): origin is string => Boolean(origin)),
  ),
);

export const auth = betterAuth({
  baseURL,
  trustedOrigins,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
  },
  rateLimit: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "MEMBER",
        input: false,
      },
    },
  },
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
