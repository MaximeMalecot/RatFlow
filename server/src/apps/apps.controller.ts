import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { AppsService } from "./apps.service";
import { CreateAppDto } from "./dto/create-app.dto";

@ApiTags("apps")
@Controller("apps")
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @Get("")
    getApps() {
        return this.appsService.getApps();
    }

    @Get("self")
    getSelfApps(@Req() req: any) {
        return this.appsService.getSelfApps(req.user.id);
    }

    @Get(":id")
    getApp(@Param("id", ParseObjectIdPipe) id: string) {
        return this.appsService.getApp(id);
    }

    @Post("")
    createApp(@Body() createAppDto: CreateAppDto, @Req() req: any) {
        return this.appsService.createApp(createAppDto, req.user.id);
    }

    @Patch(":appId/addUser/:appSecret")
    addUserToApp(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Param("appSecret", ParseUUIDPipe) appSecret: string,
        @Req() req: any
    ) {
        return this.appsService.addUserToApp(appId, appSecret, req.user.id);
    }

    @Patch(":id")
    updateApp(@Param("id", ParseObjectIdPipe) id: string) {
        return this.appsService.updateApp(id);
    }

    @Delete(":id")
    deleteApp(@Param("id", ParseObjectIdPipe) id: string) {
        return this.appsService.deleteApp(id);
    }
}
