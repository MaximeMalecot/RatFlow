import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { UsersService } from "../../users/users.service";

@Injectable()
export class UserSeed {
    constructor(private readonly usersService: UsersService) {}

    async seed() {
        console.log("SEEDING USERS -----");
        await this.usersService.clear();
        let user = {
            email: "user@user.com",
            password: "User123+=",
        };
        let admin = {
            email: "admin@admin.com",
            password: "Admin123+=",
            roles: ["USER", "ADMIN"],
        };
        const defaultPwd = await hash("User123+", 10);
        let usersData = [user, admin];
        for (let i = 0; i < usersData.length; i++) {
            let tmpUser = await this.usersService.unrestrictedCreate(
                usersData[i]
            );
            console.log(`Created user with id: ${tmpUser.id}`);
        }
        for (let i = 0; i < 5; i++) {
            const data = {
                email: `user${i}@user.com`,
                password: defaultPwd,
            };
            let tmpUser = await this.usersService.unrestrictedCreate(data);
            await tmpUser.save();
            console.log(`Created user with id: ${tmpUser.id}`);
        }
    }
}
