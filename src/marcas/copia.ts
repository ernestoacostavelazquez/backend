// marcas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,
  ) {}

  /**
   * Crear una nueva marca
   * @param createMarcaDto
   * @returns
   */
  async create(createMarcaDto: CreateMarcaDto): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const existingMarca = await this.marcasRepository.findOne({
      where: { nombre_marca: createMarcaDto.nombre_marca },
    });

    if (existingMarca) {
      return {
        message: 'La marca ya existe',
        result: false,
        data: null,
      };
    }

    const newMarca = this.marcasRepository.create(createMarcaDto);
    const savedMarca = await this.marcasRepository.save(newMarca);

    return {
      message: 'Marca creada con éxito',
      result: true,
      data: savedMarca,
    };
  }

  /**
   * Obtener todas las marcas
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Marca[] }> {
    const marcas = await this.marcasRepository.find({
      order: { nombre_marca: 'ASC' },
    });

    if (marcas.length === 0) {
      return {
        message: 'No se encontraron marcas',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de marcas recuperado con éxito',
      result: true,
      data: marcas,
    };
  }

  /**
   * Obtener una marca por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const marca = await this.marcasRepository.findOne({ where: { id_marca: id } });

    if (!marca) {
      return {
        message: 'La marca no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Marca con ID ${id} recuperada con éxito`,
      result: true,
      data: marca,
    };
  }

  /**
   * Actualizar una marca por ID
   * @param id
   * @param updateMarcaDto
   * @returns
   */
  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const marca = await this.marcasRepository.preload({
      id_marca: id,
      ...updateMarcaDto,
    });

    if (!marca) {
      return {
        message: 'La marca no existe',
        result: false,
        data: null,
      };
    }

    const updatedMarca = await this.marcasRepository.save(marca);

    return {
      message: `Marca con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedMarca,
    };
  }

  /**
   * Eliminar una marca (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.marcasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La marca no existe',
        result: false,
      };
    }

    return {
      message: `Marca con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}
