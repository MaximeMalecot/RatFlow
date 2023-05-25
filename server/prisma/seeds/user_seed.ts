import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const userData: Prisma.UserCreateInput[] = [
    {
        email: "user@user.com",
        password: "User123+",
    },
    {
        email: "admin@admin.com",
        password: "Admin123+",
        roles: ["USER", "ADMIN"],
    },
];

export default async function registerUsers(prisma: PrismaClient) {
    const defaultPwd = await hash("User123+", 10);
    for (let u of userData) {
        u.password = await hash(u.password, 10);
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }

    for (let i = 0; i < 5; i++) {
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: defaultPwd,
            },
        });
        console.log(`Created user with id: ${user.id}`);
    }
}
