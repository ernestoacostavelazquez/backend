import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)   
    private usersRepository:Repository<User>
  ){

  }

  async create(createUserDto: CreateUserDto) {
    const  userFound = await this.usersRepository.findOne({
      where:{
        username:createUserDto.username 
      }
    })
    if(userFound){
      return new HttpException('Usuario ya Existe',HttpStatus.CONFLICT)
    }

    const newUser = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(newUser)

  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const userFound =await this.usersRepository.findOne({
      where:{
        id,
      },
    })
    if (!userFound){
      return new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND)
    }
    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where:{
        id
      }
    })

    if(!userFound){
      return new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound,updateUserDto);
    return this.usersRepository.save(updateUser) ;
  }

  async remove(id: number) {
     const result = await this.usersRepository.softDelete({id})

      if (result.affected === 0){
        return new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND )
      }
      return result

    }



}
