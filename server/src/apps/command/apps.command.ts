import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { UsersService } from "src/users/users.service";
import { AppsService } from "../apps.service";

@Injectable()
export class AppCommand {
    constructor(
        private readonly appsService: AppsService,
        private readonly usersService: UsersService
    ) {}

    @Command({
        command: "apps:seed",
        describe: "create apps",
    })
    async seed() {
        console.log("clearing");
        await this.appsService.clear();
        let users = await this.usersService.findAll();

        console.log(users);
    }
}
