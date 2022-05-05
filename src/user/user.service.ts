import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User} from "./users.model";
import {RoleService} from "../role/role.service";
import {InjectModel} from "@nestjs/sequelize";
import {UserCreateDTO} from "./dto/user.create.dto";
import {UserAddRoleDTO} from "./dto/user.add.role.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RoleService) {}

    async createUser(DTO: UserCreateDTO) {
        const USER = await this.userRepository.create(DTO);

        const ROLE = await this.rolesService.getRoleByValue('USER');

        USER.set('roles', [ROLE.id]);

        USER.roles = [ROLE];

        return USER;
    }

    async getAllUsers() {
        const USERS = await this.userRepository.findAll({include: {all: true}});

        return USERS;
    }

    async getUserByEmail(email: string) {
        const USER = await this.userRepository.findOne({where: {email}, include: {all: true}});

        return USER;
    }

    async addRoleForUser(DTO: UserAddRoleDTO) {
        const USER = await this.userRepository.findByPk(DTO.userId);

        const ROLE = await this.rolesService.getRoleByValue(DTO.value);

        if (USER && ROLE) {
            await USER.$add('role', ROLE.id)

            return USER;
        }

        throw new HttpException('User or role has not found', HttpStatus.NOT_FOUND);
    }

    async ban() {

    }

    async removeForUserRole() {

    }
}
