import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/users.service";
import {ROLES_KEY} from "./role.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UserService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        if (!requiredRoles) return true;
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization.split(' ');
            const [bearer, token] = authHeader;
            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException()
            const verifiedUser = this.jwtService.verify(token);
            const USER = await this.userService.getUserByEmail(verifiedUser.email);
            if (verifiedUser && USER) {
                request.user = USER;
                return (USER.roles.some(role => requiredRoles.includes(role.value)));
            }
        } catch (error) {
            throw new HttpException('Недостаточно прав для чтения ресурса.', HttpStatus.FORBIDDEN)
        }
    }
}