// paises.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pais } from './entities/paise.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaisDto } from './dto/create-paise.dto';
import { UpdatePaisDto } from './dto/update-paise.dto';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private paisesRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        codigo_iso_alpha2: createPaisDto.codigo_iso_alpha2,
      },
    });
    
    if (paisFound) {
      return {
        message: 'El país ya existe',
        result: false,
        data: null,
      };
    }

    const newPais = this.paisesRepository.create(createPaisDto);
    const paisCreado = await this.paisesRepository.save(newPais);

    return {
      message: 'País creado con éxito',
      result: true,
      data: paisCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Pais[] }> {
    const paises = await this.paisesRepository.find();
    return {
      message: 'Listado de países recuperado con éxito',
      result: true,
      data: paises,
    };
  }

  async findOne(id_pais: number): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        id_pais,
      },
    });

    if (!paisFound) {
      return {
        message: 'País no encontrado',
        result: false,
        data: null,
      };
    }

    return {
      message: `País con ID ${id_pais} recuperado con éxito`,
      result: true,
      data: paisFound,
    };
  }

  async update(id_pais: number, updatePaisDto: UpdatePaisDto): Promise<{ message: string; result: boolean; data: Pais }> {
    const paisFound = await this.paisesRepository.findOne({
      where: {
        id_pais,
      },
    });

    if (!paisFound) {
      return {
        message: 'País no encontrado',
        result: false,
        data: null,
      };
    }

    const updatedPais = Object.assign(paisFound, updatePaisDto);
    await this.paisesRepository.save(updatedPais);

    return {
      message: `País con ID ${id_pais} actualizado con éxito`,
      result: true,
      data: updatedPais,
    };
  }

  async remove(id_pais: number): Promise<{ message: string; result: boolean }> {
    const result = await this.paisesRepository.softDelete({ id_pais });

    if (result.affected === 0) {
      return {
        message: 'País no encontrado',
        result: false,
      };
    }

    return {
      message: `País con ID ${id_pais} eliminado con éxito`,
      result: true,
    };
  }
}
