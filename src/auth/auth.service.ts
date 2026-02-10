import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    //1. cek apakah ada email yang sudah pernah dibuat
    //2. password di bycrpt
    const findUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (findUser) {
      throw new BadRequestException('Email sudah terdaftar!');
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const createUser = await this.prisma.user.create({
      data: {
        user_name: dto.username,
        email: dto.email,
        password: hashPassword,
      },
    });

    const { password, ...result } = createUser;
    return result;
  }

  async login(dto: LoginDto) {
    //1. cek apakah email
    //2. password di bycrpt
    const findUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!findUser) {
      throw new UnauthorizedException('invalid crentials');
    }

    const passwordCheck = await bcrypt.compare(
      dto.password,
      findUser?.password,
    );
    if (!passwordCheck) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payLoad = {
      sub: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };

    return {
      access_token: this.jwt.sign(payLoad),
    };
  }
}
