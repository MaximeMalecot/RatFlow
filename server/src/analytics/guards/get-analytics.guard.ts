import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { AppsService } from "src/apps/apps.service";
import { Role } from "src/users/schemas/user.schema";

@Injectable()
export class GetAnalyticsGuard implements CanActivate {
    constructor(private appsService: AppsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { appId } = request.params;
        if (!appId) throw new NotFoundException("App not found");
        const app = await this.appsService.getApp(appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        return (
            app.users.includes(request.user.id) ||
            app.owner === request.user.id ||
            request.user.role === Role.ADMIN
        );
    }
}
