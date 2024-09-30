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

  async create(createRolDto: CreateRoleDto): Promise<Rol> {
    const rolExists = await this.rolesRepository.findOne({ where: { nombre_rol: createRolDto.nombre_rol } });

    if (rolExists) {
      throw new HttpException('El rol ya existe', HttpStatus.CONFLICT);
    }

    const newRol = this.rolesRepository.create(createRolDto);
    return this.rolesRepository.save(newRol);
  }

  async findAll(): Promise<Rol[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolesRepository.findOne({ where: { id_rol: id } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRoleDto): Promise<void> {
    const result = await this.rolesRepository.update(id, updateRolDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
  }
 
}
