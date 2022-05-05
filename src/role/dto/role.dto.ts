import {ApiProperty} from "@nestjs/swagger";

export class RoleDTO {
    @ApiProperty({example: 'ADMIN', description: 'Value of role'})
    readonly value: string;

    @ApiProperty({example: 'Admin role', description: 'Description about role'})
    readonly description: string;
}