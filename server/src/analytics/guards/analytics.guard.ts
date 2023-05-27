import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { AppsService } from "src/apps/apps.service";

@Injectable()
export class AnalyticsGuard implements CanActivate {
    constructor(private appsService: AppsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { headers, body } = request;
        if (!body.appId) throw new NotFoundException("App not found");
        const app = await this.appsService.getApp(body.appId);
        if (!app) {
            throw new NotFoundException("App not found");
        }
        if (body.appSecret) {
            return app.appSecret === body.appSecret;
        }
        if (headers.origin) {
            return app?.origins.includes(headers.origin);
        }
        return false;
    }
}
