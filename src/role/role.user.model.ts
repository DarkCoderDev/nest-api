import {Model, Table, Column, DataType, ForeignKey} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Role} from "./role.model";

@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    roleId: number
}