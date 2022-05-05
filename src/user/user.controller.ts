import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthJwt} from "../auth/jwt.auth-guard";
import {UserService} from "./users.service";
import {RoleGuard} from "../role/role.guard";
import {Roles} from "../role/role.decorator";
import {User} from "./users.model";

import {UserAddRoleDTO} from './dto/user.add.role.dto';
import {UserCreateDTO} from './dto/user.create.dto';
import {UserBanDTO} from './dto/user.ban.dto';

@ApiTags('User Service')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({summary: "Create user"})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() DTO: UserCreateDTO) {
        return this.userService.createUser(DTO);
    }

    @ApiOperation({summary: "Get all user"})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthJwt)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthJwt)
    @Post('/role/add')
    addRole(@Body() DTO: UserAddRoleDTO) {
        return this.userService.addRoleForUser(DTO);
    }

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthJwt)
    @Post('/role/remove')
    removeRole(@Body() DTO: UserAddRoleDTO) {
        return this.userService.removeForUserRole(DTO);
    }

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthJwt)
    @Post('/ban')
    ban(@Body() DTO: UserBanDTO) {
        return this.userService.ban(DTO);
    }
}