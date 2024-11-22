// tipos_cartera.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposCartera } from './entities/tipos_cartera.entity';
import { CreateTiposCarteraDto } from './dto/create-tipos_cartera.dto';
import { UpdateTiposCarteraDto } from './dto/update-tipos_cartera.dto';

@Injectable()
export class TiposCarteraService {
  constructor(
    @InjectRepository(TiposCartera)
    private readonly tiposCarteraRepository: Repository<TiposCartera>,
  ) {}

  /**
   * Crear un nuevo tipo de cartera
   * @param createTiposCarteraDto
   * @returns
   */
  async create(createTiposCarteraDto: CreateTiposCarteraDto): Promise<{ message: string; result: boolean; data: TiposCartera | null }> {
    const existingTipoCartera = await this.tiposCarteraRepository.findOne({
      where: { nombre_tipo_cartera: createTiposCarteraDto.nombre_tipo_cartera },
    });

    if (existingTipoCartera) {
      return {
        message: 'El tipo de cartera ya existe',
        result: false,
        data: null,
      };
    }

    const newTipoCartera = this.tiposCarteraRepository.create(createTiposCarteraDto);
    const savedTipoCartera = await this.tiposCarteraRepository.save(newTipoCartera);

    return {
      message: 'Tipo de cartera creado con éxito',
      result: true,
      data: savedTipoCartera,
    };
  }

  /**
   * Obtener todos los tipos de cartera
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: TiposCartera[] }> {
    const tiposCartera = await this.tiposCarteraRepository.find({
      order: { nombre_tipo_cartera: 'ASC' },
    });

    if (tiposCartera.length === 0) {
      return {
        message: 'No se encontraron tipos de cartera',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de tipos de cartera recuperado con éxito',
      result: true,
      data: tiposCartera,
    };
  }

  /**
   * Obtener un tipo de cartera por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: TiposCartera | null }> {
    const tipoCartera = await this.tiposCarteraRepository.findOne({ where: { id_tipo_cartera: id } });

    if (!tipoCartera) {
      return {
        message: 'El tipo de cartera no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Tipo de cartera con ID ${id} recuperado con éxito`,
      result: true,
      data: tipoCartera,
    };
  }

  /**
   * Actualizar un tipo de cartera por ID
   * @param id
   * @param updateTiposCarteraDto
   * @returns
   */
  async update(id: number, updateTiposCarteraDto: UpdateTiposCarteraDto): Promise<{ message: string; result: boolean; data: TiposCartera | null }> {
    const tipoCartera = await this.tiposCarteraRepository.preload({
      id_tipo_cartera: id,
      ...updateTiposCarteraDto,
    });

    if (!tipoCartera) {
      return {
        message: 'El tipo de cartera no existe',
        result: false,
        data: null,
      };
    }

    const updatedTipoCartera = await this.tiposCarteraRepository.save(tipoCartera);

    return {
      message: `Tipo de cartera con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedTipoCartera,
    };
  }

  /**
   * Eliminar un tipo de cartera (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.tiposCarteraRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El tipo de cartera no existe',
        result: false,
      };
    }

    return {
      message: `Tipo de cartera con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
