import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decator";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("auth")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle(5, 60)
    @Post("login")
    @Public()
    @HttpCode(200)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("register")
    @Public()
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
