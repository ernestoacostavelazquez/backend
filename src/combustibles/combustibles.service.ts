// combustibles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Combustible } from './entities/combustible.entity';
import { CreateCombustibleDto } from './dto/create-combustible.dto';
import { UpdateCombustibleDto } from './dto/update-combustible.dto';

@Injectable()
export class CombustiblesService {
  constructor(
    @InjectRepository(Combustible)
    private readonly combustiblesRepository: Repository<Combustible>,
  ) {}

  /**
   * Crear un nuevo combustible
   * @param createCombustibleDto
   * @returns
   */
  async create(createCombustibleDto: CreateCombustibleDto): Promise<{ message: string; result: boolean; data: Combustible | null }> {
    const existingCombustible = await this.combustiblesRepository.findOne({
      where: { nombre_combustible: createCombustibleDto.nombre_combustible },
    });

    if (existingCombustible) {
      return {
        message: 'El combustible ya existe',
        result: false,
        data: null,
      };
    }

    const newCombustible = this.combustiblesRepository.create(createCombustibleDto);
    const savedCombustible = await this.combustiblesRepository.save(newCombustible);

    return {
      message: 'Combustible creado con éxito',
      result: true,
      data: savedCombustible,
    };
  }

  /**
   * Obtener todos los combustibles
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Combustible[] }> {
    const combustibles = await this.combustiblesRepository.find({
      order: { nombre_combustible: 'ASC' },
    });

    if (combustibles.length === 0) {
      return {
        message: 'No se encontraron combustibles',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de combustibles recuperado con éxito',
      result: true,
      data: combustibles,
    };
  }

  /**
   * Obtener un combustible por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Combustible | null }> {
    const combustible = await this.combustiblesRepository.findOne({ where: { id_combustible: id } });

    if (!combustible) {
      return {
        message: 'El combustible no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Combustible con ID ${id} recuperado con éxito`,
      result: true,
      data: combustible,
    };
  }

  /**
   * Actualizar un combustible por ID
   * @param id
   * @param updateCombustibleDto
   * @returns
   */
  async update(id: number, updateCombustibleDto: UpdateCombustibleDto): Promise<{ message: string; result: boolean; data: Combustible | null }> {
    const combustible = await this.combustiblesRepository.preload({
      id_combustible: id,
      ...updateCombustibleDto,
    });

    if (!combustible) {
      return {
        message: 'El combustible no existe',
        result: false,
        data: null,
      };
    }

    const updatedCombustible = await this.combustiblesRepository.save(combustible);

    return {
      message: `Combustible con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedCombustible,
    };
  }

  /**
   * Eliminar un combustible (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.combustiblesRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El combustible no existe',
        result: false,
      };
    }

    return {
      message: `Combustible con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
