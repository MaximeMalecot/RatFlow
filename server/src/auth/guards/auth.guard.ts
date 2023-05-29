import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "../constants";
import { IS_PUBLIC_KEY } from "../decorators/public.decator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("Authentication token is required");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            const user = await this.usersService.findOne(payload.sub);
            if (!user) {
                throw new NotFoundException("User not found");
            }
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request["user"] = user;
        } catch (err) {
            if (err instanceof HttpException) {
                if (err instanceof NotFoundException) {
                    throw new UnauthorizedException("Account deleted");
                }
                throw err;
            }
            throw new UnauthorizedException("Invalid token");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
