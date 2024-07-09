import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async googleLogin(req: Request & GoogleUserDto) {
    try {
      if (!req.user) {
        throw new HttpException(
          'Missing user information',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.usersRepository.findOneBy({
        googleId: req.user.googleId,
      });

      if (!user) {
        const newUser = this.usersRepository.create({
          email: req.user.email,
          googleId: req.user.googleId,
        });
        await this.usersRepository.save(newUser);
        return newUser;
      }

      return user;
    } catch (error) {
      this.logger.error(`Error during login: ${req.user.googleId}`);
    }
  }
}
