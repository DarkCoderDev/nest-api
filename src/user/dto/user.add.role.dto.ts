import {ApiProperty} from "@nestjs/swagger";

export class UserAddRoleDTO {
    @ApiProperty({example: 'ADMIN', description: 'Value of role'})
    readonly value: string;

    @ApiProperty({example: '10', description: 'Id of target user'})
    readonly userId: number;
}