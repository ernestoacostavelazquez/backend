import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonasMoraleDto } from './dto/create-personas_morale.dto';
import { UpdatePersonasMoraleDto } from './dto/update-personas_morale.dto';
import { PersonasMorales } from './entities/personas_morale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasMoralesService {
  constructor(
    @InjectRepository(PersonasMorales)
    private readonly personasMoralesRepository: Repository<PersonasMorales>,
  ) {}

  async create(createPersonasMoralesDto: CreatePersonasMoraleDto): Promise<PersonasMorales> {
    const nuevaPersonaMoral = this.personasMoralesRepository.create(createPersonasMoralesDto);
    return this.personasMoralesRepository.save(nuevaPersonaMoral);
  }

  async findAll(): Promise<PersonasMorales[]> {
    return this.personasMoralesRepository.find();
  }

  async findOne(id: number): Promise<PersonasMorales> {
    const personaMoral = await this.personasMoralesRepository.findOne({where:{id_persona_morales:id}});
    if (!personaMoral) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }
    return personaMoral;
  }

  async update(id: number, updatePersonasMoralesDto: UpdatePersonasMoraleDto): Promise<void> {
    const result = await this.personasMoralesRepository.update(id, updatePersonasMoralesDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.personasMoralesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona moral con ID ${id} no encontrada`);
    }
  }
}
