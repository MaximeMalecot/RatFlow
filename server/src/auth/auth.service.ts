import {
    HttpException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        try {
            const user = await this.userService.findOneByEmail(loginDto.email);
            if (!compareSync(loginDto.password, user.password)) {
                throw new UnauthorizedException();
            }
            const payload = {
                sub: user._id,
                roles: user.roles,
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (err) {
            if (err instanceof HttpException) {
                if (
                    err instanceof UnauthorizedException ||
                    err instanceof NotFoundException
                ) {
                    throw new UnauthorizedException(
                        "Email or password don't match"
                    );
                }
                throw err;
            }
            throw new HttpException(err.message, 500, err);
        }
    }

    async register(registerDto: RegisterDto) {
        await this.userService.create(registerDto);
        return null;
    }
}
