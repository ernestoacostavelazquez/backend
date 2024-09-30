import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonasFisicaDto } from './dto/create-personas_fisica.dto';
import { UpdatePersonasFisicaDto } from './dto/update-personas_fisica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonasFisica } from './entities/personas_fisica.entity';

@Injectable()
export class PersonasFisicasService {
  constructor(
    @InjectRepository(PersonasFisica)
    private readonly personasFisicasRepository: Repository<PersonasFisica>,
  ) {}

  async create(createPersonasFisicasDto: CreatePersonasFisicaDto): Promise<PersonasFisica> {
    const nuevaPersonaFisica = this.personasFisicasRepository.create(createPersonasFisicasDto);
    return this.personasFisicasRepository.save(nuevaPersonaFisica);
  }

  async findAll(): Promise<PersonasFisica[]> {
    return this.personasFisicasRepository.find();
  }

  async findOne(id: number): Promise<PersonasFisica> {
    const personaFisica = await this.personasFisicasRepository.findOne({ where: { id_persona_fisica: id } });
    if (!personaFisica) {
      throw new NotFoundException(`Persona Física con ID ${id} no encontrada`);
    }
    return personaFisica;
  }

  async update(id: number, updatePersonasFisicasDto: UpdatePersonasFisicaDto): Promise<void> {
    const result = await this.personasFisicasRepository.update(id, updatePersonasFisicasDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona Física con ID ${id} no encontrada`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.personasFisicasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona Física con ID ${id} no encontrada`);
    }
  }
}
