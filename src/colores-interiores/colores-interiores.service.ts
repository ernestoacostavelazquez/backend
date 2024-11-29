// colores-interiores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColoresInteriore } from './entities/colores-interiore.entity';
import { CreateColoresInterioreDto } from './dto/create-colores-interiore.dto';
import { UpdateColoresInterioreDto } from './dto/update-colores-interiore.dto';
import { Colore } from 'src/colores/entities/colore.entity';

@Injectable()
export class ColoresInterioresService {
  constructor(
    @InjectRepository(ColoresInteriore)
    private readonly coloresInterioresRepository: Repository<ColoresInteriore>,

    @InjectRepository(Colore)
    private readonly coloresRepository: Repository<Colore>,
  ) {}

  /**
   * Crear un nuevo color interior
   */
  async create(createColoresInterioreDto: CreateColoresInterioreDto): Promise<{ message: string; result: boolean; data: ColoresInteriore | null }> {
    const { id_color, ...rest } = createColoresInterioreDto;

    // Verificar si el color existe
    const colore = await this.coloresRepository.findOne({ where: { id_color } });

    if (!colore) {
      return {
        message: 'Color no encontrado',
        result: false,
        data: null,
      };
    }

    // Crear y guardar el nuevo color interior
    const newColorInterior = this.coloresInterioresRepository.create({
      ...rest,
      colore,
    });

    const savedColorInterior = await this.coloresInterioresRepository.save(newColorInterior);

    return {
      message: 'Color interior creado con éxito',
      result: true,
      data: savedColorInterior,
    };
  }

  /**
   * Obtener todos los colores interiores
   */
  async findAll(): Promise<{ message: string; result: boolean; data: ColoresInteriore[] }> {
    const coloresInteriores = await this.coloresInterioresRepository.find({ relations: ['colore'] });

    return {
      message: 'Listado de colores interiores recuperado con éxito',
      result: true,
      data: coloresInteriores,
    };
  }

  /**
   * Obtener un color interior por ID
   */
  async findOne(id: number): Promise<{ message: string; result: boolean; data: ColoresInteriore | null }> {
    const colorInterior = await this.coloresInterioresRepository.findOne({
      where: { id_color_interior: id },
      relations: ['colore'],
    });

    if (!colorInterior) {
      return {
        message: `Color interior con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Color interior con ID ${id} recuperado con éxito`,
      result: true,
      data: colorInterior,
    };
  }

  /**
   * Actualizar un color interior
   */
  async update(id: number, updateColoresInterioreDto: UpdateColoresInterioreDto): Promise<{ message: string; result: boolean; data: ColoresInteriore | null }> {
    const { id_color, ...rest } = updateColoresInterioreDto;

    const colorInterior = await this.coloresInterioresRepository.findOne({
      where: { id_color_interior: id },
    });

    if (!colorInterior) {
      return {
        message: `Color interior con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    if (id_color) {
      const colore = await this.coloresRepository.findOne({ where: { id_color } });

      if (!colore) {
        return {
          message: 'Color no encontrado',
          result: false,
          data: null,
        };
      }

      colorInterior.colore = colore;
    }

    Object.assign(colorInterior, rest);

    const updatedColorInterior = await this.coloresInterioresRepository.save(colorInterior);

    return {
      message: `Color interior con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedColorInterior,
    };
  }

  /**
   * Eliminar un color interior (soft delete)
   */
  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.coloresInterioresRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Color interior con ID ${id} no encontrado`,
        result: false,
      };
    }

    return {
      message: `Color interior con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
