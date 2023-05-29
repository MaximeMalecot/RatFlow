import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/users/schemas/user.schema";
import { AppsService } from "../apps.service";

@Injectable()
export class IsOwnerGuard implements CanActivate {
    constructor(private readonly appsService: AppsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, body } = request;
        if (!body.appId) return false;
        if (user.roles.includes(Role.ADMIN)) return true;

        const isOwner = await this.appsService.isUserOwnerOfApp({
            appId: body.appId,
            userId: user.id,
        });

        if (!isOwner)
            throw new UnauthorizedException("User is not owner of app");

        return true;
    }
}
