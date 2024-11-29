// familias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';
import { Familia } from './entities/familia.entity';
import { Marca } from 'src/marcas/entities/marca.entity';

@Injectable()
export class FamiliasService {
  constructor(
    @InjectRepository(Familia)
    private readonly familiasRepository: Repository<Familia>,

    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,
  ) {}

  async create(createFamiliaDto: CreateFamiliaDto): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const marca = await this.marcasRepository.findOne({ where: { id_marca: createFamiliaDto.id_marca } });

    if (!marca) {
      return {
        message: 'Marca no encontrada',
        result: false,
        data: null,
      };
    }

    const newFamilia = this.familiasRepository.create({ ...createFamiliaDto, marca });
    const savedFamilia = await this.familiasRepository.save(newFamilia);

    return {
      message: 'Familia creada con éxito',
      result: true,
      data: savedFamilia,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Familia[] }> {
    const familias = await this.familiasRepository.find({ relations: ['marca'] });
    return {
      message: 'Listado de familias recuperado con éxito',
      result: true,
      data: familias,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const familia = await this.familiasRepository.findOne({ where: { id_familia: id }, relations: ['marca'] });

    if (!familia) {
      return {
        message: `Familia con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Familia con ID ${id} recuperada con éxito`,
      result: true,
      data: familia,
    };
  }

  async update(id: number, updateFamiliaDto: UpdateFamiliaDto): Promise<{ message: string; result: boolean; data: Familia | null }> {
    const familia = await this.familiasRepository.findOne({ where: { id_familia: id } });

    if (!familia) {
      return {
        message: `Familia con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    if (updateFamiliaDto.id_marca) {
      const marca = await this.marcasRepository.findOne({ where: { id_marca: updateFamiliaDto.id_marca } });

      if (!marca) {
        return {
          message: 'Marca no encontrada',
          result: false,
          data: null,
        };
      }

      familia.marca = marca;
    }

    Object.assign(familia, updateFamiliaDto);
    const updatedFamilia = await this.familiasRepository.save(familia);

    return {
      message: `Familia con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedFamilia,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.familiasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Familia con ID ${id} no encontrada`,
        result: false,
      };
    }

    return {
      message: `Familia con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}
