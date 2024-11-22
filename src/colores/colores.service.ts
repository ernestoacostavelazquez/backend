// colores.sevice.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colore } from './entities/colore.entity';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';

@Injectable()
export class ColoresService {
  constructor(
    @InjectRepository(Colore)
    private readonly coloresRepository: Repository<Colore>,
  ) {}

  /**
   * Crear un nuevo color
   * @param createColoreDto
   * @returns
   */
  async create(createColoreDto: CreateColoreDto): Promise<{ message: string; result: boolean; data: Colore | null }> {
    const existingColore = await this.coloresRepository.findOne({
      where: { nombre_color: createColoreDto.nombre_color },
    });

    if (existingColore) {
      return {
        message: 'El color ya existe',
        result: false,
        data: null,
      };
    }

    const newColore = this.coloresRepository.create(createColoreDto);
    const savedColore = await this.coloresRepository.save(newColore);

    return {
      message: 'Color creado con éxito',
      result: true,
      data: savedColore,
    };
  }

  /**
   * Obtener todos los colores
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Colore[] }> {
    const colores = await this.coloresRepository.find({
      order: { nombre_color: 'ASC' },
    });

    if (colores.length === 0) {
      return {
        message: 'No se encontraron colores',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de colores recuperado con éxito',
      result: true,
      data: colores,
    };
  }

  /**
   * Obtener un color por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Colore | null }> {
    const colore = await this.coloresRepository.findOne({ where: { id_color: id } });

    if (!colore) {
      return {
        message: 'El color no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Color con ID ${id} recuperado con éxito`,
      result: true,
      data: colore,
    };
  }

  /**
   * Actualizar un color por ID
   * @param id
   * @param updateColoreDto
   * @returns
   */
  async update(id: number, updateColoreDto: UpdateColoreDto): Promise<{ message: string; result: boolean; data: Colore | null }> {
    const colore = await this.coloresRepository.preload({
      id_color: id,
      ...updateColoreDto,
    });

    if (!colore) {
      return {
        message: 'El color no existe',
        result: false,
        data: null,
      };
    }

    const updatedColore = await this.coloresRepository.save(colore);

    return {
      message: `Color con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedColore,
    };
  }

  /**
   * Eliminar un color (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.coloresRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El color no existe',
        result: false,
      };
    }

    return {
      message: `Color con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
