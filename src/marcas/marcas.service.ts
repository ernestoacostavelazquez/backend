// marcas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { Armadora } from 'src/armadoras/entities/armadora.entity';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,

    @InjectRepository(Armadora)
    private readonly armadorasRepository: Repository<Armadora>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const armadora = await this.armadorasRepository.findOne({ where: { id_armadora: createMarcaDto.id_armadora } });

    if (!armadora) {
      return {
        message: 'Armadora no encontrada',
        result: false,
        data: null,
      };
    }

    const newMarca = this.marcasRepository.create({ ...createMarcaDto, armadora });
    const savedMarca = await this.marcasRepository.save(newMarca);

    return {
      message: 'Marca creada con éxito',
      result: true,
      data: savedMarca,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: Marca[] }> {
    const marcas = await this.marcasRepository.find({ relations: ['armadora'] });
    return {
      message: 'Listado de marcas recuperado con éxito',
      result: true,
      data: marcas,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const marca = await this.marcasRepository.findOne({ where: { id_marca: id }, relations: ['armadora'] });

    if (!marca) {
      return {
        message: `Marca con ID ${id} no encontrada`,
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

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<{ message: string; result: boolean; data: Marca | null }> {
    const marca = await this.marcasRepository.findOne({ where: { id_marca: id } });

    if (!marca) {
      return {
        message: `Marca con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    if (updateMarcaDto.id_armadora) {
      const armadora = await this.armadorasRepository.findOne({ where: { id_armadora: updateMarcaDto.id_armadora } });

      if (!armadora) {
        return {
          message: 'Armadora no encontrada',
          result: false,
          data: null,
        };
      }

      marca.armadora = armadora;
    }

    Object.assign(marca, updateMarcaDto);
    const updatedMarca = await this.marcasRepository.save(marca);

    return {
      message: `Marca con ID ${id} actualizada con éxito`,
      result: true,
      data: updatedMarca,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.marcasRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: `Marca con ID ${id} no encontrada`,
        result: false,
      };
    }

    return {
      message: `Marca con ID ${id} eliminada con éxito`,
      result: true,
    };
  }
}
