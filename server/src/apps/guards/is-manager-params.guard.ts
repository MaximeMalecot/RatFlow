import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/users/schemas/user.schema";
import { AppsService } from "../apps.service";

@Injectable()
export class IsManagerParamsGuard implements CanActivate {
    constructor(private readonly appsService: AppsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        if (!params.appId) return false;

        if (user.roles.includes(Role.ADMIN)) return true;

        const isAllowed = await this.appsService.isUserInApp({
            appId: params.appId,
            userId: user.id,
        });

        if (!isAllowed)
            throw new UnauthorizedException(
                "User is not allowed to manage the app"
            );

        return true;
    }
}
