import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { OwnUserGuards } from "./guards/users.guard";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get("self")
    findSelf(@Req() req: any) {
        if (!req.user) throw new Error("User not found");
        return this.usersService.findOne(req.user.id);
    }

    @UseGuards(OwnUserGuards)
    @Get(":id")
    findOne(@Param("id", ParseObjectIdPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id", ParseObjectIdPipe) id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(OwnUserGuards)
    @Delete(":id")
    remove(@Param("id", ParseObjectIdPipe) id: string) {
        return this.usersService.remove(id);
    }
}
