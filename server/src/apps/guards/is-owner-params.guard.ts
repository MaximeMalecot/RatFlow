import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/users/schemas/user.schema";
import { AppsService } from "../apps.service";

@Injectable()
export class IsOwnerParamsGuard implements CanActivate {
    constructor(private readonly appsService: AppsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        if (!params.appId) return false;
        if (user.roles.includes(Role.ADMIN)) return true;

        const isOwner = await this.appsService.isUserOwnerOfApp({
            appId: params.appId,
            userId: user.id,
        });

        if (!isOwner)
            throw new UnauthorizedException("Current user is not owner of app");

        return true;
    }
}
