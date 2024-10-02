import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonasFisicaDto } from './dto/create-personas_fisica.dto';
import { UpdatePersonasFisicaDto } from './dto/update-personas_fisica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonasFisica } from './entities/personas_fisica.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

@Injectable()
export class PersonasFisicasService {
  constructor(
    @InjectRepository(PersonasFisica)
    private readonly personasFisicasRepository: Repository<PersonasFisica>,

    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>, // Repositorio para MaestroPersona
  ) {}

  // Función para crear una nueva persona física
  async create(createPersonasFisicasDto: CreatePersonasFisicaDto): Promise<PersonasFisica> {
    const { id_persona, ...rest } = createPersonasFisicasDto;

    // Verificar si la persona existe
    const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    // Crear la nueva persona física y asociarla con maestro_personas
    const nuevaPersonaFisica = this.personasFisicasRepository.create({
      ...rest,
      persona, // Asociar con MaestroPersona
    });

    return this.personasFisicasRepository.save(nuevaPersonaFisica);
  }

  // Función para obtener todas las personas físicas
  async findAll(): Promise<PersonasFisica[]> {
    return this.personasFisicasRepository.find({
      relations: ['persona'], // Incluir la relación con maestro_personas
    });
  }

  // Función para obtener una persona física por su ID
  async findOne(id: number): Promise<PersonasFisica> {
    const personaFisica = await this.personasFisicasRepository.findOne({
      where: { id_persona_fisica: id },
      relations: ['persona'], // Incluir la relación con maestro_personas
    });
    if (!personaFisica) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }
    return personaFisica;
  }

  // Función para actualizar una persona física
  async update(id: number, updatePersonasFisicasDto: UpdatePersonasFisicaDto): Promise<void> {
    const { id_persona, ...rest } = updatePersonasFisicasDto;

    // Buscar la persona física existente
    const personaFisica = await this.personasFisicasRepository.findOne({
      where: { id_persona_fisica: id },
      relations: ['persona'], // Incluir la relación con maestro_personas
    });

    if (!personaFisica) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }

    // Verificar si se necesita actualizar la relación con MaestroPersona
    if (id_persona) {
      const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
      if (!persona) {
        throw new NotFoundException('Persona no encontrada');
      }
      personaFisica.persona = persona; // Actualizar la relación con maestro_personas
    }

    Object.assign(personaFisica, rest);
    await this.personasFisicasRepository.save(personaFisica);
  }

  // Función para eliminar una persona física
  async remove(id: number): Promise<void> {
    const result = await this.personasFisicasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }
  }
}
