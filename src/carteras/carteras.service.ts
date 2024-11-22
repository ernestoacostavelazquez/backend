// carteras.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartera } from './entities/cartera.entity';
import { CreateCarteraDto } from './dto/create-cartera.dto';
import { UpdateCarteraDto } from './dto/update-cartera.dto';

@Injectable()
export class CarterasService {
  constructor(
    @InjectRepository(Cartera)
    private readonly carterasRepository: Repository<Cartera>,
  ) {}

  /**
   * Crear una nueva cartera
   * @param createCarteraDto
   * @returns
   */
  async create(createCarteraDto: CreateCarteraDto): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const existingCartera = await this.carterasRepository.findOne({
      where: { nombre_cartera: createCarteraDto.nombre_cartera },
    });

    if (existingCartera) {
      return {
        message: 'La cartera ya existe',
        result: false,
        data: null,
      };
    }

    const newCartera = this.carterasRepository.create(createCarteraDto);
    const savedCartera = await this.carterasRepository.save(newCartera);

    return {
      message: 'Cartera creada con éxito',
      result: true,
      data: savedCartera,
    };
  }

  /**
   * Obtener todas las carteras
   * @returns
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Cartera[] }> {
    const carteras = await this.carterasRepository.find({
      order: { nombre_cartera: 'ASC' },
    });

    if (carteras.length === 0) {
      return {
        message: 'No se encontraron carteras',
        result: false,
        data: [],
      };
    }

    return {
      message: 'Listado de carteras recuperado con éxito',
      result: true,
      data: carteras,
    };
  }

  /**
   * Obtener una cartera por ID
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const cartera = await this.carterasRepository.findOne({ where: { id_cartera: id } });

    if (!cartera) {
      return {
        message: 'La cartera no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Cartera con ID ${id} recuperada con éxito`,
      result: true,
      data: cartera,
    };
  }

  /**
   * Actualizar una cartera por ID
   * @param id
   * @param updateCarteraDto
   * @returns
   */
  async update(id: number, updateCarteraDto: UpdateCarteraDto): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const cartera = await this.carterasRepository.preload({
      id_cartera: id,
      ...updateCarteraDto,
    });

    if (!cartera) {
      return {
        message: 'La cartera no existe',
        result: false,
        data: null,
      };
    }

    const updatedCartera = await this.carterasRepository.save(cartera);

    return {
      message: `Cartera con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedCartera,
    };
  }

  /**
   * Eliminar una cartera (soft delete)
   * @param id
   * @returns
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.carterasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'La cartera no existe',
        result: false,
      };
    }

    return {
      message: `Cartera con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}
