import {ApiProperty} from "@nestjs/swagger";

export class UserBanDTO {
    @ApiProperty({example: 'ADMIN', description: 'Value of role'})
    readonly userId: number;

    @ApiProperty({example: 'For hooliganism', description: 'Description about ban cause'})
    readonly banReason: string;
}