import {SequelizeModule} from "@nestjs/sequelize";
import {UsersRoles} from "./role/role.user.model";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {RoleModule} from "./role/role.module";
import {ConfigModule} from "@nestjs/config";
import {Role} from "./role/role.model";
import {User} from "./user/user.model";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.MYSQL_HOST,
            port: (+process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            models: [User, Role, UsersRoles],
            autoLoadModels: true,
        }),
        UserModule,
        RoleModule,
        AuthModule,
    ]
})
export class AppModule {}