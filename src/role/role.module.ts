import {SequelizeModule} from "@nestjs/sequelize";
import {RoleController} from "./role.controller";
import {UsersRoles} from "./role.user.model";
import {RoleService} from "./role.service";
import {User} from "../user/user.model";
import {Module} from "@nestjs/common";
import {Role} from "./role.model";

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [SequelizeModule.forFeature([Role, User, UsersRoles])],
    exports: [RoleService]
})
export class RoleModule {}