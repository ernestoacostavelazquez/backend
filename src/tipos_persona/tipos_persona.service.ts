import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiposPersonaDto } from './dto/create-tipos_persona.dto';
import { UpdateTiposPersonaDto } from './dto/update-tipos_persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposPersona } from './entities/tipos_persona.entity'; 

@Injectable()
export class TiposPersonaService {
  constructor(
    @InjectRepository(TiposPersona)
    private readonly tiposPersonaRepository: Repository<TiposPersona>,
  ) {}

  async create(createTipoPersonaDto: CreateTiposPersonaDto): Promise<TiposPersona> {
    const tipoPersonaExists = await this.tiposPersonaRepository.findOne({ where: { nombre_tipo: createTipoPersonaDto.nombre_tipo } });

    if (tipoPersonaExists) {
      throw new HttpException('El tipo de persona ya existe', HttpStatus.CONFLICT);
    }

    const newTipoPersona = this.tiposPersonaRepository.create(createTipoPersonaDto);
    return this.tiposPersonaRepository.save(newTipoPersona);
  }

  async findAll(): Promise<TiposPersona[]> {
    return this.tiposPersonaRepository.find();
  }

  async findOne(id: number): Promise<TiposPersona> {
    const tipoPersona = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona: id } });
    if (!tipoPersona) {
      throw new NotFoundException(`Tipo de persona con ID ${id} no encontrado`);
    }
    return tipoPersona;
  }

  async update(id: number, updateTipoPersonaDto: UpdateTiposPersonaDto): Promise<void> {
    const result = await this.tiposPersonaRepository.update(id, updateTipoPersonaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de persona con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.tiposPersonaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de persona con ID ${id} no encontrado`);
    }
  }
}
