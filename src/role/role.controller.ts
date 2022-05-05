import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleDTO} from "./dto/role.dto";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post()
    create(@Body() DTO: RoleDTO) {
        return this.roleService.createRole(DTO);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
