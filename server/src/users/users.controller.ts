import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { HidePassword } from "./decorators/users.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { OwnUserGuards } from "./guards/users.guard";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.ADMIN)
    @Get()
    @HidePassword
    findAll() {
        return this.usersService.findAll();
    }

    @Get("self")
    @HidePassword
    findSelf(@Req() req: any) {
        if (!req.user) throw new Error("User not found");
        return this.usersService.findOne(req.user.id);
    }

    @UseGuards(OwnUserGuards)
    @Get(":id")
    @HidePassword
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id);
    }
    @Patch(":id")
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.remove(id);
    }
}
