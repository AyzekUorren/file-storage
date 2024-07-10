import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { GoogleUserDto } from '../dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(googleUser: GoogleUserDto): Promise<any> {
    const { googleId, email } = googleUser;

    const user = await this.usersService.findOneByGoogleId(googleId);

    return !user ? await this.usersService.create({ googleId, email }) : user;
  }
}
