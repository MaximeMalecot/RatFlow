import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { AppsService } from "./apps.service";
import { CreateAppDto } from "./dto/create-app.dto";
import { LinkMailWithAppDto } from "./dto/link-email-with-app.dto";
import { IsManagerParamsGuard } from "./guards/is-manager-params.guard";
import { IsOwnerGuard } from "./guards/is-owner.guard";

@ApiTags("apps")
@Controller("apps")
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    // User management
    @Get("users/:appId")
    @UseGuards(IsManagerParamsGuard)
    getAppUsers(@Param("appId", ParseObjectIdPipe) appId: string) {
        return this.appsService.getUsersforApp(appId);
    }

    @Post("users")
    @UseGuards(IsOwnerGuard)
    appUserToApp(@Body() body: LinkMailWithAppDto) {
        return this.appsService.addUserToApp(body);
    }

    @Delete("users")
    @UseGuards(IsOwnerGuard)
    removeUserFromApp(@Body() body: LinkMailWithAppDto) {
        return this.appsService.removeUserFromApp(body);
    }

    // Apps

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

    @Patch(":id")
    updateApp(@Param("id", ParseObjectIdPipe) id: string) {
        return this.appsService.updateApp(id);
    }

    @Delete(":id")
    deleteApp(@Param("id", ParseObjectIdPipe) id: string) {
        return this.appsService.deleteApp(id);
    }
}
