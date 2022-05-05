import {Role} from "../role/role.model";
import {BelongsToMany, Column, DataType, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Model} from "sequelize";
import {UsersRoles} from "../role/role.user.model";

interface UserCreateAttributes {
    userName: string,
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttributes> {
    @ApiProperty({example: '1', description: 'User id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@gmail.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'John', description: 'User name'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'password2010', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Is banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Reason of ban'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[];
}