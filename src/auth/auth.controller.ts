import {UserCreateDTO} from "../user/dto/user.create.dto";
import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() DTO: UserCreateDTO) {
		return this.authService.login(DTO)
	}

	@Post('/registration')
	registration(@Body() DTO: UserCreateDTO) {
		return this.authService.registration(DTO)
	}
}