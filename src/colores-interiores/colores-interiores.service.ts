// colores-interiores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColoresInteriore } from './entities/colores-interiore.entity';
import { CreateColoresInterioreDto } from './dto/create-colores-interiore.dto';
import { UpdateColoresInterioreDto } from './dto/update-colores-interiore.dto';

@Injectable()
export class ColoresInterioresService {
  constructor(
    @InjectRepository(ColoresInteriore)
    private readonly coloresInterioresRepository: Repository<ColoresInteriore>,
  ) {}

  async create(createColoresInterioreDto: CreateColoresInterioreDto) {
    const existingColor = await this.coloresInterioresRepository.findOne({
      where: { nombre_color_interior: createColoresInterioreDto.nombre_color_interior },
    });

    if (existingColor) {
      return {
        message: 'El color interior ya existe',
        result: false,
        data: null,
      };
    }

    const newColor = this.coloresInterioresRepository.create(createColoresInterioreDto);
    const savedColor = await this.coloresInterioresRepository.save(newColor);

    return {
      message: 'Color interior creado con éxito',
      result: true,
      data: savedColor,
    };
  }

  async findAll() {
    const colores = await this.coloresInterioresRepository.find();
    return {
      message: 'Listado de colores interiores recuperado con éxito',
      result: true,
      data: colores,
    };
  }

  async findOne(id: number) {
    const color = await this.coloresInterioresRepository.findOne({ where: { id_color_interior: id } });

    if (!color) {
      return {
        message: 'El color interior no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Color interior con ID ${id} recuperado con éxito`,
      result: true,
      data: color,
    };
  }

  async update(id: number, updateColoresInterioreDto: UpdateColoresInterioreDto) {
    const color = await this.coloresInterioresRepository.preload({
      id_color_interior: id,
      ...updateColoresInterioreDto,
    });

    if (!color) {
      return {
        message: 'El color interior no existe',
        result: false,
        data: null,
      };
    }

    const updatedColor = await this.coloresInterioresRepository.save(color);

    return {
      message: `Color interior con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedColor,
    };
  }

  async remove(id: number) {
    const result = await this.coloresInterioresRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El color interior no existe',
        result: false,
      };
    }

    return {
      message: `Color interior con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
