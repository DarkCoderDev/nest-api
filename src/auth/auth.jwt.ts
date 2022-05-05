import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthJwt implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const authHeader = req.headers.authorization.split(' ');
			const bearer = authHeader[0]
			const token = authHeader[1]
			if (bearer !== 'Bearer' || !token) throw new UnauthorizedException()
			const USER = this.jwtService.verify(token);
			req.user = USER;
			return true;
		} catch (error) {
			throw new UnauthorizedException({ message: 'Пользователь не авторизован.' })
		}
	}
}