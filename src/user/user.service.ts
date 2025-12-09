import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepo.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = savedUser;
    return result;
  }

  async findAll() {
    return this.usersRepo.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        age: true,
        country: true,
        avatar: true,
        bio: true,
        favoriteGenres: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    return this.usersRepo.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        age: true,
        country: true,
        avatar: true,
        bio: true,
        favoriteGenres: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepo.delete(id);
    return { deleted: true, id };
  }
}
