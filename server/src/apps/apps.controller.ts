import {
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppsService } from "./apps.service";

@ApiTags("apps")
@Controller("apps")
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @Get("")
    getApps() {
        return this.appsService.getApps();
    }

    @Get("self")
    getSelfApps() {
        return this.appsService.getSelfApps();
    }

    @Get(":id")
    getApp(@Param("id", ParseUUIDPipe) id: string) {
        return this.appsService.getApp(id);
    }

    @Post("")
    createApp() {
        return this.appsService.createApp();
    }

    @Patch(":id/addUser")
    addUserToApp(@Param("id", ParseUUIDPipe) id: string) {
        return this.appsService.addUserToApp(id);
    }

    @Patch(":id")
    updateApp(@Param("id", ParseUUIDPipe) id: string) {
        return this.appsService.updateApp(id);
    }

    @Delete(":id")
    deleteApp(@Param("id", ParseUUIDPipe) id: string) {
        return this.appsService.deleteApp(id);
    }
}
