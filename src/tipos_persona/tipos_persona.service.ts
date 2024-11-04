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

  async create(createTipoPersonaDto: CreateTiposPersonaDto): Promise<{ message: string; result: boolean; data: TiposPersona | null }> {
    const tipoPersonaExists = await this.tiposPersonaRepository.findOne({ where: { nombre_tipo: createTipoPersonaDto.nombre_tipo } });

    if (tipoPersonaExists) {
      return {
        message: 'El tipo de persona ya existe',
        result: false,
        data: null,
      };
    }

    const newTipoPersona = this.tiposPersonaRepository.create(createTipoPersonaDto);
    const tipoPersonaCreada = await this.tiposPersonaRepository.save(newTipoPersona);

    return {
      message: 'Tipo de persona creado con éxito',
      result: true,
      data: tipoPersonaCreada,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: TiposPersona[] }> {
    const tiposPersona = await this.tiposPersonaRepository.find();
    return {
      message: 'Listado de tipos de persona recuperado con éxito',
      result: true,
      data: tiposPersona,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: TiposPersona | null }> {
    const tipoPersona = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona: id } });
    if (!tipoPersona) {
      return {
        message: `Tipo de persona con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }
    return {
      message: `Tipo de persona con ID ${id} recuperado con éxito`,
      result: true,
      data: tipoPersona,
    };
  }

  async update(id: number, updateTipoPersonaDto: UpdateTiposPersonaDto): Promise<{ message: string; result: boolean; data: TiposPersona | null }> {
    const tipoPersonaExist = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona: id } });
    
    if (!tipoPersonaExist) {
      return {
        message: `Tipo de persona con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    const tipoPersonaActualizada = Object.assign(tipoPersonaExist, updateTipoPersonaDto);
    await this.tiposPersonaRepository.save(tipoPersonaActualizada);

    return {
      message: `Tipo de persona con ID ${id} actualizado con éxito`,
      result: true,
      data: tipoPersonaActualizada,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const tipoPersona = await this.tiposPersonaRepository.findOne({ where: { id_tipo_persona: id } });
    if (!tipoPersona) {
      return {
        message: `Tipo de persona con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.tiposPersonaRepository.softDelete(id);

    return {
      message: `Tipo de persona con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
