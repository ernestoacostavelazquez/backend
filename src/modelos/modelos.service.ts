// modelos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo } from './entities/modelo.entity';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';

@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modelosRepository: Repository<Modelo>,
  ) {}

  /**
   * Crear un nuevo modelo
   * @param createModeloDto
   * @returns
   */
  async create(createModeloDto: CreateModeloDto): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const existingModelo = await this.modelosRepository.findOne({
      where: { nombre_modelo: createModeloDto.nombre_modelo },
    });

    if (existingModelo) {
      return {
        message: 'El modelo ya existe',
        result: false,
        data: null,
      };
    }

    const newModelo = this.modelosRepository.create(createModeloDto);
    const savedModelo = await this.modelosRepository.save(newModelo);

    return {
      message: 'Modelo creado con éxito',
      result: true,
      data: savedModelo,
    };
  }

  /**
   * Obtener todos los modelos
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Modelo[] }> {
    const modelos = await this.modelosRepository.find({
      order: { nombre_modelo: 'ASC' },
    });

    if (modelos.length === 0) {
      return {
        message: 'No se encontraron modelos',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de modelos recuperado con éxito',
      result: true,
      data: modelos,
    };
  }

  /**
   * Obtener un modelo por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const modelo = await this.modelosRepository.findOne({ where: { id_modelo: id } });

    if (!modelo) {
      return {
        message: 'El modelo no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Modelo con ID ${id} recuperado con éxito`,
      result: true,
      data: modelo,
    };
  }

  /**
   * Actualizar un modelo por ID
   * @param id
   * @param updateModeloDto
   * @returns
   */
  async update(id: number, updateModeloDto: UpdateModeloDto): Promise<{ message: string; result: boolean; data: Modelo | null }> {
    const modelo = await this.modelosRepository.preload({
      id_modelo: id,
      ...updateModeloDto,
    });

    if (!modelo) {
      return {
        message: 'El modelo no existe',
        result: false,
        data: null,
      };
    }

    const updatedModelo = await this.modelosRepository.save(modelo);

    return {
      message: `Modelo con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedModelo,
    };
  }

  /**
   * Eliminar un modelo (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.modelosRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El modelo no existe',
        result: false,
      };
    }

    return {
      message: `Modelo con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
