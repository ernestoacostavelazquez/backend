import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonasMoraleDto } from './dto/create-personas_morale.dto';
import { UpdatePersonasMoraleDto } from './dto/update-personas_morale.dto';
import { PersonasMorales } from './entities/personas_morale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

@Injectable()
export class PersonasMoralesService {
  constructor(
    @InjectRepository(PersonasMorales)
    private readonly personasMoralesRepository: Repository<PersonasMorales>,

    @InjectRepository(MaestroPersona)
    private readonly maestroPersonasRepository: Repository<MaestroPersona>, // Repositorio para MaestroPersona
  ) {}

  // Función para crear una nueva persona moral
  async create(createPersonasMoralesDto: CreatePersonasMoraleDto): Promise<PersonasMorales> {
    const { id_persona, ...rest } = createPersonasMoralesDto;

    // Verificar si la persona existe
    const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    // Crear la nueva persona moral y asociarla con maestro_personas
    const nuevaPersonaMoral = this.personasMoralesRepository.create({
      ...rest,
      persona, // Asociar con MaestroPersona
    });

    return this.personasMoralesRepository.save(nuevaPersonaMoral);
  }

  // Función para obtener todas las personas morales
  async findAll(): Promise<PersonasMorales[]> {
    return this.personasMoralesRepository.find({
      relations: ['persona'], // Incluir la relación con maestro_personas
    });
  }

  // Función para obtener una persona moral por su ID
  async findOne(id: number): Promise<PersonasMorales> {
    const personaMoral = await this.personasMoralesRepository.findOne({
      where: { id_persona_morales: id },
      relations: ['persona'], // Incluir la relación con maestro_personas
    });
    if (!personaMoral) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }
    return personaMoral;
  }

  // Función para actualizar una persona moral
  async update(id: number, updatePersonasMoralesDto: UpdatePersonasMoraleDto): Promise<void> {
    const { id_persona, ...rest } = updatePersonasMoralesDto;

    // Buscar la persona moral existente
    const personaMoral = await this.personasMoralesRepository.findOne({
      where: { id_persona_morales: id },
      relations: ['persona'],
    });

    if (!personaMoral) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }

    // Verificar si se necesita actualizar la relación con MaestroPersona
    if (id_persona) {
      const persona = await this.maestroPersonasRepository.findOne({ where: { id_persona } });
      if (!persona) {
        throw new NotFoundException('Persona no encontrada');
      }
      personaMoral.persona = persona; // Actualizar la relación con maestro_personas
    }

    Object.assign(personaMoral, rest);
    await this.personasMoralesRepository.save(personaMoral);
  }

  // Función para eliminar una persona moral
  async remove(id: number): Promise<void> {
    const result = await this.personasMoralesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }
  }
}
