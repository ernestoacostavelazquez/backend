import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadosCivilDto } from './dto/create-estados_civil.dto';
import { UpdateEstadosCivilDto } from './dto/update-estados_civil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadosCivil } from './entities/estados_civil.entity';

@Injectable()
export class EstadosCivilService {
  constructor(
    @InjectRepository(EstadosCivil)
    private readonly estadosCivilRepository: Repository<EstadosCivil>,
  ) {}

  async create(createEstadoCivilDto: CreateEstadosCivilDto): Promise<{ message: string; result: boolean; data: EstadosCivil | null }> {
    const estadoCivilExist = await this.estadosCivilRepository.findOne({
      where: { nombre_estado: createEstadoCivilDto.nombre_estado },
    });

    if (estadoCivilExist) {
      return {
        message: 'El estado civil ya existe',
        result: false,
        data: null,
      };
    }

    const nuevoEstadoCivil = this.estadosCivilRepository.create(createEstadoCivilDto);
    const estadoCivilCreado = await this.estadosCivilRepository.save(nuevoEstadoCivil);

    return {
      message: 'Estado civil creado con éxito',
      result: true,
      data: estadoCivilCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: EstadosCivil[] }> {
    const estadosCiviles = await this.estadosCivilRepository.find();
    return {
      message: 'Listado de estados civiles recuperado con éxito',
      result: true,
      data: estadosCiviles,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: EstadosCivil | null }> {
    const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil: id } });
    
    if (!estadoCivil) {
      return {
        message: `Estado civil con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Estado civil con ID ${id} recuperado con éxito`,
      result: true,
      data: estadoCivil,
    };
  }

  async update(id: number, updateEstadoCivilDto: UpdateEstadosCivilDto): Promise<{ message: string; result: boolean; data: EstadosCivil | null }> {
    const estadoCivilExist = await this.estadosCivilRepository.findOne({
      where: { id_estado_civil: id },
    });

    if (!estadoCivilExist) {
      return {
        message: `Estado civil con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    const updatedEstadoCivil = Object.assign(estadoCivilExist, updateEstadoCivilDto);
    await this.estadosCivilRepository.save(updatedEstadoCivil);

    return {
      message: `Estado civil con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedEstadoCivil,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const estadoCivil = await this.estadosCivilRepository.findOne({ where: { id_estado_civil: id } });
    
    if (!estadoCivil) {
      return {
        message: `Estado civil con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.estadosCivilRepository.softDelete(id);

    return {
      message: `Estado civil con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
  
}
