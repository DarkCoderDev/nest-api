import {UserController} from "./users.controller";
import {UsersRoles} from "../role/role.user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {forwardRef, Module} from "@nestjs/common";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";
import {UserService} from "./users.service";
import {Role} from "../role/role.model";
import {User} from "./users.model";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [SequelizeModule.forFeature([User, Role, UsersRoles]), RoleModule, forwardRef(() => AuthModule)],
    exports: [UserService],
})
export class UserModule {}
