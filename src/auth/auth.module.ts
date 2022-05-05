import {UserModule} from 'src/user/users.module';
import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY ?? 'SECRET', signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [AuthModule, JwtModule]
})
export class AuthModule {}