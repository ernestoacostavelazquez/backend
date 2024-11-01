import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; // Importar bcrypt correctamente



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)   
    private usersRepository:Repository<User>
  ){

  }

  /*
  async create(createUserDto: CreateUserDto) {
    const  userFound = await this.usersRepository.findOne({
      where:{
        nombre_completo:createUserDto.nombre_completo 
      }
    })
    if(userFound){
      return new HttpException('Usuario ya Existe',HttpStatus.CONFLICT)
    }

    const newUser = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(newUser)

  }
 */

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        nombre_completo: createUserDto.nombre_completo,
      },
    });
    if (userFound) {
      return new HttpException('Usuario ya Existe', HttpStatus.CONFLICT);
    }
  
    // Encriptar la contraseña antes de guardar
    const saltRounds = 10; // Puedes ajustar este valor
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    
    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // Asegúrate de reemplazar la contraseña original por la encriptada
    });
  
    return this.usersRepository.save(newUser);
  }
  

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id_user: number) {
    const userFound =await this.usersRepository.findOne({
      where:{
        id_user,
      },
    })
    if (!userFound){
      return new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND)
    }
    return userFound;
  }

  async update(id_user: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where:{
        id_user
      }
    })

    if(!userFound){
      return new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound,updateUserDto);
    return this.usersRepository.save(updateUser) ;
  }

  async remove(id_user: number) {
     const result = await this.usersRepository.softDelete({id_user})

      if (result.affected === 0){
        return new HttpException('Usuario no Existe',HttpStatus.NOT_FOUND )
      }
      return result

    }


    // Nuevo método para el login
  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      return {
        message: "Credenciales Incorrectas",
        result: false,
        data: null,
      };
    }

    // Comprobar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Credenciales Incorrectas",
        result: false,
        data: null,
      };
    }

    // Si las credenciales son válidas, devolver la información del usuario
    return {
      message: "login Exitoso",
      result: true,
      data: {
        id_user: user.id_user,
        nombre_completo: user.nombre_completo,
        email: user.email,
        rol: user.rol,
      },
    };
  }

}
