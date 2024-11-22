// unidades_empaque.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadesEmpaque } from './entities/unidades_empaque.entity';
import { CreateUnidadesEmpaqueDto } from './dto/create-unidades_empaque.dto';
import { UpdateUnidadesEmpaqueDto } from './dto/update-unidades_empaque.dto';

@Injectable()
export class UnidadesEmpaqueService {
  constructor(
    @InjectRepository(UnidadesEmpaque)
    private readonly unidadesEmpaqueRepository: Repository<UnidadesEmpaque>,
  ) {}

  /**
   * Crear una nueva unidad de empaque
   * @param createUnidadesEmpaqueDto
   * @returns
   */
  async create(createUnidadesEmpaqueDto: CreateUnidadesEmpaqueDto): Promise<{ message: string; result: boolean; data: UnidadesEmpaque | null }> {
    const existingEmpaque = await this.unidadesEmpaqueRepository.findOne({
      where: { nombre_empaque: createUnidadesEmpaqueDto.nombre_empaque },
    });

    if (existingEmpaque) {
      return {
        message: 'La unidad de empaque ya existe',
        result: false,
        data: null,
      };
    }

    const newEmpaque = this.unidadesEmpaqueRepository.create(createUnidadesEmpaqueDto);
    const savedEmpaque = await this.unidadesEmpaqueRepository.save(newEmpaque);

    return {
      message: 'Unidad de empaque creada con éxito',
      result: true,
      data: savedEmpaque,
    };
  }

  /**
   * Obtener todas las unidades de empaque
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: UnidadesEmpaque[] }> {
    const empaques = await this.unidadesEmpaqueRepository.find({
      order: { nombre_empaque: 'ASC' },
    });

    if (empaques.length === 0) {
      return {
        message: 'No se encontraron unidades de empaque',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de unidades de empaque recuperado con éxito',
      result: true,
      data: empaques,
    };
  }

  /**
   * Obtener una unidad de empaque por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: UnidadesEmpaque | null }> {
    const empaque = await this.unidadesEmpaqueRepository.findOne({ where: { id_empaque: id } });

    if (!empaque) {
      return {
        message: 'La unidad de empaque no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Unidad de empaque con ID ${id} recuperada con éxito`,
      result: true,
      data: empaque,
    };
  }

  /**
   * Actualizar una unidad de empaque por ID
   * @param id
   * @param updateUnidadesEmpaqueDto
   * @returns
   */
  async update(id: number, updateUnidadesEmpaqueDto: UpdateUnidadesEmpaqueDto): Promise<{ message: string; result: boolean; data: UnidadesEmpaque | null }> {
    const empaque = await this.unidadesEmpaqueRepository.preload({
      id_empaque: id,
      ...updateUnidadesEmpaqueDto,
    });

    if (!empaque) {
      return {
        message: 'La unidad de empaque no existe',
        result: false,
        data: null,
      };
    }

    const updatedEmpaque = await this.unidadesEmpaqueRepository.save(empaque);

    return {
      message: `Unidad de empaque con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedEmpaque,
    };
  }

  /**
   * Eliminar una unidad de empaque (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.unidadesEmpaqueRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La unidad de empaque no existe',
        result: false,
      };
    }

    return {
      message: `Unidad de empaque con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}
