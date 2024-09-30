import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaestroPersonaDto } from './dto/create-maestro_persona.dto';
import { UpdateMaestroPersonaDto } from './dto/update-maestro_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaestroPersona } from './entities/maestro_persona.entity';

@Injectable()
export class MaestroPersonasService {
 
  constructor(
    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>,
  ) {}

  async create(createMaestroPersonaDto: CreateMaestroPersonaDto): Promise<MaestroPersona> {
    // Verificar si el RFC ya existe en la base de datos
    const personaExistente = await this.maestroPersonasRepository.findOne({
      where: { rfc: createMaestroPersonaDto.rfc },
    });

    if (personaExistente) {
      // Lanzar una excepción si el RFC ya existe
      throw new ConflictException('RFC ya existe');
    }

    // Crear la nueva persona si el RFC no existe
    const nuevaPersona = this.maestroPersonasRepository.create(createMaestroPersonaDto);
    return this.maestroPersonasRepository.save(nuevaPersona);
  }

  async findAll(): Promise<MaestroPersona[]> {
    return this.maestroPersonasRepository.find();
  }

  async findOne(id: number): Promise<MaestroPersona> {
    const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona: id } });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }
    return persona;
  }

  async update(id: number, updateMaestroPersonaDto: UpdateMaestroPersonaDto): Promise<void> {
    const result = await this.maestroPersonasRepository.update(id, updateMaestroPersonaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.maestroPersonasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }
  }
}
