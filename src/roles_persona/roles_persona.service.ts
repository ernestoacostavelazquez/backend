import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolesPersonaDto } from './dto/create-roles_persona.dto';
import { UpdateRolesPersonaDto } from './dto/update-roles_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesPersona } from './entities/roles_persona.entity';

@Injectable()
export class RolesPersonaService {
  constructor(
    @InjectRepository(RolesPersona)
    private readonly rolesPersonaRepository: Repository<RolesPersona>,
  ) {}

  async create(createRolesPersonaDto: CreateRolesPersonaDto): Promise<RolesPersona> {
    const nuevoRolPersona = this.rolesPersonaRepository.create(createRolesPersonaDto);
    return this.rolesPersonaRepository.save(nuevoRolPersona);
  }

  async findAll(): Promise<RolesPersona[]> {
    return this.rolesPersonaRepository.find();
  }

  async findOne(id: number): Promise<RolesPersona> {
    const rolPersona = await this.rolesPersonaRepository.findOne({ where: { id_rol_persona: id } });
    if (!rolPersona) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }
    return rolPersona;
  }

  async update(id: number, updateRolesPersonaDto: UpdateRolesPersonaDto): Promise<void> {
    const result = await this.rolesPersonaRepository.update(id, updateRolesPersonaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolesPersonaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }
  }
}
