import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/auth/enums/role.enum";
import { UsersService } from "../users.service";

@Injectable()
export class OwnUserGuards implements CanActivate {
    constructor(private userService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new UnauthorizedException();
        const { id } = context.switchToHttp().getRequest().params;
        const requestedUser = await this.userService.findOne(id);
        if (!requestedUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return requestedUser.id === user.id || user.roles.includes(Role.ADMIN);
    }
}
