import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AnalyticsService } from "src/analytics/analytics.service";
import { AppsService } from "src/apps/apps.service";
import { TagsService } from "src/tags/tags.service";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AnalyticSeed {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly appsService: AppsService,
        private readonly tagsService: TagsService,
        private readonly usersService: UsersService
    ) {}

    async seed() {
        console.log("SEEDING ANALYTICS -----");
        await this.analyticsService.clear();
        const user = await this.usersService.findOneByEmail("user@user.com");
        const app = await this.appsService.findAppForNameAndUser(
            "Test app",
            user.id
        );
        const tags = await this.tagsService.findAllByAppId(app.id);
        const cliendIds = [];
        for (let i = 0; i < 5; i++) {
            cliendIds.push(faker.string.uuid());
        }
        const urls = ["/", "/about", "/contact", "/register", "/login"];
        const events = ["page_changed", "click", "dblclick"];

        const sessions = [];
        for (let clientId of cliendIds) {
            for (let i = 0; i < 2; i++) {
                for (
                    let i = 0;
                    i <
                    faker.number.int({
                        min: 2,
                        max: 5,
                    });
                    i++
                ) {
                    const sessionStart = faker.date.between({
                        from:
                            i % 2 == 0
                                ? `2023-05-20T00:00:00.000Z`
                                : `2023-04-20T00:00:00.000Z`,
                        to:
                            i % 2 == 0
                                ? `2023-05-30T00:00:00.000Z`
                                : `2023-04-30T00:00:00.000Z`,
                    });
                    const sessionMaxEnd = new Date(sessionStart);
                    sessionMaxEnd.setHours(sessionMaxEnd.getHours() + 2);
                    const sessionEnd = faker.date.between({
                        from: sessionStart,
                        to: sessionMaxEnd,
                    });
                    sessions.push({
                        sessionId: faker.string.uuid(),
                        clientId: clientId,
                        userAgent: faker.internet.userAgent(),
                        start: sessionStart,
                        end: sessionEnd,
                    });
                }
            }
        }
        for (let session of sessions) {
            for (
                let i = 0;
                i <
                faker.number.int({
                    min: 2,
                    max: 10,
                });
                i++
            ) {
                let data = {
                    clientId: session.clientId,
                    sessionId: session.sessionId,
                    eventName: faker.helpers.arrayElement(events),
                    url: faker.helpers.arrayElement(urls),
                    userAgent: session.userAgent,
                    date: faker.date
                        .between({
                            from: session.start,
                            to: session.end,
                        })
                        .toString(),
                    service: "front",
                    tagId: faker.helpers.arrayElement(tags).id,
                };
                await this.analyticsService.create(data, app.id);
            }
            let endData = {
                clientId: session.clientId,
                sessionId: session.sessionId,
                eventName: "session_end",
                url: faker.helpers.arrayElement(urls),
                userAgent: session.userAgent,
                date: session.end,
                service: "front",
                customData: {
                    sessionStart: session.start,
                    sessionEnd: session.end,
                },
            };
            await this.analyticsService.create(endData, app.id);
        }
    }
}
