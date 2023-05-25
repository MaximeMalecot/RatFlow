import { PrismaClient } from "@prisma/client";
import registerUsers from "./seeds/user_seed";

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);
    await registerUsers(prisma);

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
