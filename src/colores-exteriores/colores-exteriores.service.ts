// colores-exteriores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColoresExteriore } from './entities/colores-exteriore.entity';
import { CreateColoresExterioreDto } from './dto/create-colores-exteriore.dto';
import { UpdateColoresExterioreDto } from './dto/update-colores-exteriore.dto';

@Injectable()
export class ColoresExterioresService {
  constructor(
    @InjectRepository(ColoresExteriore)
    private readonly coloresExterioresRepository: Repository<ColoresExteriore>,
  ) {}

  async create(createColoresExterioreDto: CreateColoresExterioreDto) {
    const existingColor = await this.coloresExterioresRepository.findOne({
      where: { nombre_color_exterior: createColoresExterioreDto.nombre_color_exterior },
    });

    if (existingColor) {
      return {
        message: 'El color exterior ya existe',
        result: false,
        data: null,
      };
    }

    const newColor = this.coloresExterioresRepository.create(createColoresExterioreDto);
    const savedColor = await this.coloresExterioresRepository.save(newColor);

    return {
      message: 'Color exterior creado con éxito',
      result: true,
      data: savedColor,
    };
  }

  async findAll() {
    const colores = await this.coloresExterioresRepository.find();
    return {
      message: 'Listado de colores exteriores recuperado con éxito',
      result: true,
      data: colores,
    };
  }

  async findOne(id: number) {
    const color = await this.coloresExterioresRepository.findOne({ where: { id_color_exterior: id } });

    if (!color) {
      return {
        message: 'El color exterior no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Color exterior con ID ${id} recuperado con éxito`,
      result: true,
      data: color,
    };
  }

  async update(id: number, updateColoresExterioreDto: UpdateColoresExterioreDto) {
    const color = await this.coloresExterioresRepository.preload({
      id_color_exterior: id,
      ...updateColoresExterioreDto,
    });

    if (!color) {
      return {
        message: 'El color exterior no existe',
        result: false,
        data: null,
      };
    }

    const updatedColor = await this.coloresExterioresRepository.save(color);

    return {
      message: `Color exterior con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedColor,
    };
  }

  async remove(id: number) {
    const result = await this.coloresExterioresRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El color exterior no existe',
        result: false,
      };
    }

    return {
      message: `Color exterior con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
