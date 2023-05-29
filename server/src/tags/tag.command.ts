// import { Injectable } from "@nestjs/common";
// import { Command } from "nestjs-command";
// import { TagsService } from "./tags.service";

// @Injectable()
// export class UserCommand {
//     constructor(private readonly tagService: TagsService, private) {}

//     @Command({
//         command: "tag:seed",
//         describe: "create users",
//     })
//     async seed() {
//         this.tagService.clear();
//         for (let i = 0; i < 5; i++) {
//             const data = {
//                 name: `user${i}@user.com`,
//                 appId: defaultPwd,
//             };
//             let tmpUser = await this.usersService.unrestrictedCreate(data);
//             await tmpUser.save();
//             console.log(`Created user with id: ${tmpUser.id}`);
//         }
//     }
// }
