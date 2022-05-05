import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserCreateDTO} from "../user/dto/user.create.dto";
import {UserService} from "../user/users.service";
import {User} from "../user/users.model";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(DTO: UserCreateDTO) {
        const USER = await this.validateUser(DTO);
        return await this.generateToken(USER);
    }

    async registration(DTO: UserCreateDTO) {
        const CANDIDATE = await this.userService.getUserByEmail(DTO.email);
        if (CANDIDATE) throw new HttpException('Пользователь с таким электронным адресом уже существует.', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(DTO.password, 5);
        const USER = await this.userService.createUser({...DTO, password: hashPassword});
        return this.generateToken(USER);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {token: this.jwtService.sign(payload)};
    }

    private async validateUser(DTO: UserCreateDTO) {
        const USER = await this.userService.getUserByEmail(DTO.email);
        const verifiedPassword = await bcrypt.compare(DTO.password, USER.password);
        if (USER && verifiedPassword) return USER;
        throw new UnauthorizedException({message: 'Некоректный пароль или электронный адрес'});
    }
}