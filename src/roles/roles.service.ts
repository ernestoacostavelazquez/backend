import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRoleDto): Promise<{ message: string, result: boolean, data: Rol }> {
    const rolExists = await this.rolesRepository.findOne({ where: { nombre_rol: createRolDto.nombre_rol } });

    if (rolExists) {
      // Si el rol ya existe, retorna un mensaje adecuado
      return {
        message: 'El rol ya existe',
        result: false,
        data: null
      };
    }

    const newRol = this.rolesRepository.create(createRolDto);
    const savedRol = await this.rolesRepository.save(newRol);

    return {
      message: 'Rol creado con éxito',
      result: true,
      data: savedRol
    };
  }

  async findAll(): Promise<{ message: string, result: boolean, data: Rol[] }> {
    const roles = await this.rolesRepository.find();
    return {
      message: "Listado de roles recuperado con éxito",
      result: true,
      data: roles
    };
  }

  async findOne(id: number): Promise<{ message: string, result: boolean, data: Rol }> {
    const rol = await this.rolesRepository.findOne({ where: { id_rol: id } });

    if (!rol) {
      return {
        message: `Rol con ID ${id} no encontrado`,
        result: false,
        data: null
      };
    }

    return {
      message: `Rol con ID ${id} recuperado con éxito`,
      result: true,
      data: rol
    };
  }

  async update(id: number, updateRolDto: UpdateRoleDto): Promise<{ message: string, result: boolean, data: Rol }> {
    const rol = await this.rolesRepository.findOne({ where: { id_rol: id } });

    if (!rol) {
      return {
        message: `Rol con ID ${id} no encontrado`,
        result: false,
        data: null
      };
    }

    const updatedRol = Object.assign(rol, updateRolDto);
    await this.rolesRepository.save(updatedRol);

    return {
      message: `Rol con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedRol
    };
  }

  async remove(id: number): Promise<{ message: string, result: boolean }> {
    const rol = await this.rolesRepository.findOne({ where: { id_rol: id } });

    if (!rol) {
      return {
        message: `Rol con ID ${id} no encontrado`,
        result: false
      };
    }

    await this.rolesRepository.softDelete(id);

    return {
      message: `Rol con ID ${id} eliminado con éxito`,
      result: true
    };
  }
}
