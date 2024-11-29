// carteras.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartera } from './entities/cartera.entity';
import { CreateCarteraDto } from './dto/create-cartera.dto';
import { UpdateCarteraDto } from './dto/update-cartera.dto';
import { TiposCartera } from 'src/tipos_cartera/entities/tipos_cartera.entity';

@Injectable()
export class CarterasService {
  constructor(
    @InjectRepository(Cartera)
    private readonly carterasRepository: Repository<Cartera>,

    @InjectRepository(TiposCartera)
    private readonly tiposCarteraRepository: Repository<TiposCartera>,
  ) {}

  /**
   * Crear una nueva cartera
   */
  async create(createCarteraDto: CreateCarteraDto): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const { id_tipo_cartera, ...rest } = createCarteraDto;

    const tipoCartera = await this.tiposCarteraRepository.findOne({ where: { id_tipo_cartera } });

    if (!tipoCartera) {
      return {
        message: 'Tipo de cartera no encontrado',
        result: false,
        data: null,
      };
    }

    const newCartera = this.carterasRepository.create({
      ...rest,
      tipo_cartera: tipoCartera,
    });

    const savedCartera = await this.carterasRepository.save(newCartera);

    return {
      message: 'Cartera creada con éxito',
      result: true,
      data: savedCartera,
    };
  }

  /**
   * Obtener todas las carteras
   */
  async findAll(): Promise<{ message: string; result: boolean; data: Cartera[] }> {
    const carteras = await this.carterasRepository.find({ relations: ['tipo_cartera'] });

    return {
      message: 'Listado de carteras recuperado con éxito',
      result: true,
      data: carteras,
    };
  }

  /**
   * Obtener una cartera por ID
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const cartera = await this.carterasRepository.findOne({
      where: { id_cartera: id },
      relations: ['tipo_cartera'],
    });

    if (!cartera) {
      return {
        message: `Cartera con ID ${id} no encontrada`,
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
   * Actualizar una cartera
   */
  async update(id: number, updateCarteraDto: UpdateCarteraDto): Promise<{ message: string; result: boolean; data: Cartera | null }> {
    const { id_tipo_cartera, ...rest } = updateCarteraDto;

    const cartera = await this.carterasRepository.findOne({ where: { id_cartera: id } });

    if (!cartera) {
      return {
        message: `Cartera con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    if (id_tipo_cartera) {
      const tipoCartera = await this.tiposCarteraRepository.findOne({ where: { id_tipo_cartera } });

      if (!tipoCartera) {
        return {
          message: 'Tipo de cartera no encontrado',
          result: false,
          data: null,
        };
      }

      cartera.tipo_cartera = tipoCartera;
    }

    Object.assign(cartera, rest);

    const updatedCartera = await this.carterasRepository.save(cartera);

    return {
      message: `Cartera con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedCartera,
    };
  }

  /**
   * Eliminar una cartera
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.carterasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Cartera con ID ${id} no encontrada`,
        result: false,
      };
    }

    return {
      message: `Cartera con ID ${id} eliminada con éxito`,
      result: true,
    };
  }

}
