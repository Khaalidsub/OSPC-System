import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Role, Status } from '@common/enums';
import { CreateUserInput } from 'users/dto/create-user.input';
import { User, UserDocument } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';
import { ICredential } from './types';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credential: ICredential): Promise<UserDocument | any> {
    const user = await this.usersService.findOne({ email: credential.email });
    if (user && user.password === credential.password) {
      const { password, ...result } = user;
      result.id = user._id;
      return result;
    }
    throw new HttpException('Wrong Email/Password !', HttpStatus.UNAUTHORIZED);
  }
  async login(payload: any) {
    return this.jwtService.sign(payload);
  }

  async register(user: CreateUserInput, role: Role, status: Status) {
    const newUser = <User>{
      ...user,
      accountStatus: status,
      role: role,
    };

    return this.usersService.create(newUser as User);
  }
  async validateToken(id: string) {
    return this.usersService.findById(id);
  }
}
