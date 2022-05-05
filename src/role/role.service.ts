import {InjectModel} from "@nestjs/sequelize";
import {Injectable} from "@nestjs/common";
import {RoleDTO} from "./dto/role.dto";
import {Role} from "./role.model";

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: RoleDTO) {
        const ROLE = await this.roleRepository.create(dto);

        return ROLE;
    }

    async getRoleByValue(value: string) {
        const ROLE = await this.roleRepository.findOne({where: {value}});

        return ROLE;
    }
}