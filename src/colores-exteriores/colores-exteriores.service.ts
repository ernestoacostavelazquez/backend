// colores-exteriores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColoresExteriore } from './entities/colores-exteriore.entity';
import { CreateColoresExterioreDto } from './dto/create-colores-exteriore.dto';
import { UpdateColoresExterioreDto } from './dto/update-colores-exteriore.dto';
import { Colore } from 'src/colores/entities/colore.entity';

@Injectable()
export class ColoresExterioresService {
  constructor(
    @InjectRepository(ColoresExteriore)
    private readonly coloresExterioresRepository: Repository<ColoresExteriore>,

    @InjectRepository(Colore)
    private readonly coloresRepository: Repository<Colore>,
  ) {}

  async create(createColoresExterioreDto: CreateColoresExterioreDto): Promise<{ message: string; result: boolean; data: ColoresExteriore | null }> {
    const { id_color, ...rest } = createColoresExterioreDto;

    const colore = await this.coloresRepository.findOne({ where: { id_color } });

    if (!colore) {
      return {
        message: 'Color no encontrado',
        result: false,
        data: null,
      };
    }

    const newColorExterior = this.coloresExterioresRepository.create({
      ...rest,
      colore,
    });

    const savedColorExterior = await this.coloresExterioresRepository.save(newColorExterior);

    return {
      message: 'Color exterior creado con éxito',
      result: true,
      data: savedColorExterior,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: ColoresExteriore[] }> {
    const coloresExteriores = await this.coloresExterioresRepository.find({ relations: ['colore'] });

    return {
      message: 'Listado de colores exteriores recuperado con éxito',
      result: true,
      data: coloresExteriores,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: ColoresExteriore | null }> {
    const colorExterior = await this.coloresExterioresRepository.findOne({ where: { id_color_exterior: id }, relations: ['colore'] });

    if (!colorExterior) {
      return {
        message: `Color exterior con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Color exterior con ID ${id} recuperado con éxito`,
      result: true,
      data: colorExterior,
    };
  }

  async update(id: number, updateColoresExterioreDto: UpdateColoresExterioreDto): Promise<{ message: string; result: boolean; data: ColoresExteriore | null }> {
    const { id_color, ...rest } = updateColoresExterioreDto;

    const colorExterior = await this.coloresExterioresRepository.findOne({ where: { id_color_exterior: id } });

    if (!colorExterior) {
      return {
        message: `Color exterior con ID ${id} no encontrado`,
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

      colorExterior.colore = colore;
    }

    Object.assign(colorExterior, rest);

    const updatedColorExterior = await this.coloresExterioresRepository.save(colorExterior);

    return {
      message: `Color exterior con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedColorExterior,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.coloresExterioresRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Color exterior con ID ${id} no encontrado`,
        result: false,
      };
    }

    return {
      message: `Color exterior con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
