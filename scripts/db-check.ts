import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const [
    users,
    sessions,
    accounts,
    verifications,
    events,
    media,
    classInfos,
    inquiries,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.session.count(),
    prisma.account.count(),
    prisma.verification.count(),
    prisma.event.count(),
    prisma.media.count(),
    prisma.classInfo.count(),
    prisma.inquiry.count(),
  ]);

  console.log("Database table row counts:");
  console.table({
    user: users,
    session: sessions,
    account: accounts,
    verification: verifications,
    Event: events,
    Media: media,
    ClassInfo: classInfos,
    Inquiry: inquiries,
  });
}

main()
  .catch((err) => {
    console.error("Database check failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
