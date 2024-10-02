import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolesPersonaDto } from './dto/create-roles_persona.dto';
import { UpdateRolesPersonaDto } from './dto/update-roles_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesPersona } from './entities/roles_persona.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { Rol } from 'src/roles/entities/role.entity';

@Injectable()
export class RolesPersonaService {
  constructor(
    @InjectRepository(RolesPersona)
    private readonly rolesPersonaRepository: Repository<RolesPersona>,

    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>, // Repositorio para MaestroPersona

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>, // Repositorio para Rol
  ) {}

  // Función para crear un nuevo rol asociado a una persona
  async create(createRolesPersonaDto: CreateRolesPersonaDto): Promise<RolesPersona> {
    const { id_persona, id_rol, ...rest } = createRolesPersonaDto;

    // Verificar si la persona existe
    const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    // Verificar si el rol existe
    const rol = await this.rolRepository.findOne({ where: { id_rol } });
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }

    // Crear el nuevo rol de persona y asociarlo con la persona y el rol
    const nuevoRolPersona = this.rolesPersonaRepository.create({
      ...rest,
      persona: persona, // Asociar la persona
      rol: rol, // Asociar el rol
    });

    return this.rolesPersonaRepository.save(nuevoRolPersona);
  }

  // Función para obtener todos los roles de persona
  async findAll(): Promise<RolesPersona[]> {
    return this.rolesPersonaRepository.find({
      relations: ['persona', 'rol'], // Incluir la relación con persona y rol
    });
  }

  // Función para obtener un rol de persona por su ID
  async findOne(id: number): Promise<RolesPersona> {
    const rolPersona = await this.rolesPersonaRepository.findOne({
      where: { id_rol_persona: id },
      relations: ['persona', 'rol'], // Incluir la relación con persona y rol
    });
    if (!rolPersona) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }
    return rolPersona;
  }

  // Función para actualizar un rol de una persona
  async update(id: number, updateRolesPersonaDto: UpdateRolesPersonaDto): Promise<void> {
    const { id_persona, id_rol, ...rest } = updateRolesPersonaDto;

    // Buscar el rol de persona existente
    const rolPersona = await this.rolesPersonaRepository.findOne({
      where: { id_rol_persona: id },
      relations: ['persona', 'rol'],
    });

    if (!rolPersona) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }

    // Verificar si se necesita actualizar la persona
    if (id_persona) {
      const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
      if (!persona) {
        throw new NotFoundException('Persona no encontrada');
      }
      rolPersona.persona = persona; // Actualizar la relación con persona
    }

    // Verificar si se necesita actualizar el rol
    if (id_rol) {
      const rol = await this.rolRepository.findOne({ where: { id_rol } });
      if (!rol) {
        throw new NotFoundException('Rol no encontrado');
      }
      rolPersona.rol = rol; // Actualizar la relación con rol
    }

    Object.assign(rolPersona, rest);

    await this.rolesPersonaRepository.save(rolPersona);
  }

  // Función para eliminar un rol de persona
  async remove(id: number): Promise<void> {
    const rolPersona = await this.rolesPersonaRepository.findOne({
      where: { id_rol_persona: id },
    });

    if (!rolPersona) {
      throw new NotFoundException(`Rol de persona con ID ${id} no encontrado`);
    }

    await this.rolesPersonaRepository.softDelete(id);
  }
}
