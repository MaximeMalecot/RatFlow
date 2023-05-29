import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { AppCommand } from "./apps/command/apps.command";
import { UserCommand } from "./users/command/users.command";

@Injectable()
export class SeedCommand {
    constructor(
        private readonly userCommand: UserCommand,
        private readonly appCommand: AppCommand
    ) {}

    @Command({
        command: "db:seed",
        describe: "seed",
    })
    async seed() {
        console.log("ULTIMATE");
        await this.userCommand.seed();
        await this.appCommand.seed();
    }
}
