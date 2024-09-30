import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDomiciliosPersonaDto } from './dto/create-domicilios_persona.dto';
import { UpdateDomiciliosPersonaDto } from './dto/update-domicilios_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomiciliosPersona } from './entities/domicilios_persona.entity';

@Injectable()
export class DomiciliosPersonaService {
  constructor(
    @InjectRepository(DomiciliosPersona)
    private readonly domiciliosPersonaRepository: Repository<DomiciliosPersona>,
  ) {}

  async create(createDomicilioPersonaDto: CreateDomiciliosPersonaDto): Promise<DomiciliosPersona> {
    const nuevoDomicilio = this.domiciliosPersonaRepository.create(createDomicilioPersonaDto);
    return this.domiciliosPersonaRepository.save(nuevoDomicilio);
  }

  async findAll(): Promise<DomiciliosPersona[]> {
    return this.domiciliosPersonaRepository.find();
  }

  async findOne(id: number): Promise<DomiciliosPersona> {
    const domicilio = await this.domiciliosPersonaRepository.findOne({ where: { id_domicilio: id } });
    if (!domicilio) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }
    return domicilio;
  }

  async update(id: number, updateDomicilioPersonaDto: UpdateDomiciliosPersonaDto): Promise<void> {
    const result = await this.domiciliosPersonaRepository.update(id, updateDomicilioPersonaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.domiciliosPersonaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Domicilio con ID ${id} no encontrado`);
    }
  }
}
