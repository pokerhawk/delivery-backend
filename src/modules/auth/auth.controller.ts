import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService, ILoginBody } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { ApiKeyAuthGuard } from './guards/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    login(@Body() body: ILoginBody){
        return this.authService.login(body);
    }

    @Post('register')
    registerUser(@Body() userPayload: CreateUserDto){
        return this.authService.registerUser(userPayload);
    }
}