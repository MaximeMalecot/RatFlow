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
    getSelfApps() {
        return this.appsService.getSelfApps();
    }

    @Get(":id")
    getApp(@Param("id", ParseUUIDPipe) id: string) {
        return this.appsService.getApp(id);
    }

    @Post("")
    createApp(@Body() createAppDto: CreateAppDto, @Req() req: any) {
        return this.appsService.createApp(createAppDto, req.user.id);
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
