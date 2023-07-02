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
import { Roles } from "src/auth/decorators/roles.decorator";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { AppsService } from "./apps.service";
import { CreateAppDto } from "./dto/create-app.dto";
import { LinkMailWithAppDto } from "./dto/link-email-with-app.dto";
import { UpdateAppNameDto } from "./dto/update-app-name.dto";
import { UpdateAppOriginsDto } from "./dto/update-app-origins.dto";
import { IsManagerParamsGuard } from "./guards/is-manager-params.guard";
import { IsOwnerParamsGuard } from "./guards/is-owner-params.guard";
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

    // Apps a user has access to but is not owner of
    @Get("whitelisted")
    getWhiteListedApp(@Req() req: any) {
        return this.appsService.getWhiteListApps(req.user.id);
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

    @Roles(Role.ADMIN)
    @Get("")
    getApps() {
        return this.appsService.getApps();
    }

    @Get("self")
    getSelfApps(@Req() req: any) {
        return this.appsService.getSelfApps(req.user.id);
    }

    @Get(":appId")
    @UseGuards(IsManagerParamsGuard)
    getApp(@Param("appId", ParseObjectIdPipe) appId: string) {
        return this.appsService.getApp(appId);
    }

    @Post("")
    createApp(@Body() createAppDto: CreateAppDto, @Req() req: any) {
        return this.appsService.createApp(createAppDto, req.user.id);
    }

    @Patch(":appId/origins")
    @UseGuards(IsManagerParamsGuard)
    updateOrigins(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Body() origins: UpdateAppOriginsDto
    ) {
        return this.appsService.updateAppOrigins(appId, origins);
    }

    @Patch(":appId")
    @UseGuards(IsManagerParamsGuard)
    updateApp(
        @Param("appId", ParseObjectIdPipe) appId: string,
        @Body() body: UpdateAppNameDto
    ) {
        return this.appsService.updateNameApp(appId, body.name);
    }

    @Delete(":appId")
    @UseGuards(IsOwnerParamsGuard)
    deleteApp(@Param("appId", ParseObjectIdPipe) appId: string) {
        return this.appsService.deleteApp(appId);
    }
}
