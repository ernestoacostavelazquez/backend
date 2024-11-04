import { Injectable } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad_medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad_medida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad_medida.entity';

@Injectable()
export class UnidadMedidaService {

  constructor(
    @InjectRepository(UnidadMedida)
    private unidadMedidaRepository: Repository<UnidadMedida>,
  ) {}

  async create(createUnidadMedidaDto: CreateUnidadMedidaDto): Promise<{ message: string; result: boolean; data: UnidadMedida | null }> {
    const unidadExist = await this.unidadMedidaRepository.findOne({ where: { nombre: createUnidadMedidaDto.nombre } });

    if (unidadExist) {
      return {
        message: 'La unidad de medida ya existe',
        result: false,
        data: null,
      };
    }

    const nuevaUnidad = this.unidadMedidaRepository.create(createUnidadMedidaDto);
    const unidadCreada = await this.unidadMedidaRepository.save(nuevaUnidad);

    return {
      message: 'Unidad de medida creada con éxito',
      result: true,
      data: unidadCreada,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: UnidadMedida[] }> {
    const unidades = await this.unidadMedidaRepository.find();
    return {
      message: 'Listado de unidades de medida recuperado con éxito',
      result: true,
      data: unidades,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: UnidadMedida | null }> {
    const unidadMedida = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });

    if (!unidadMedida) {
      return {
        message: `Unidad de medida con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Unidad de medida con ID ${id} recuperada con éxito`,
      result: true,
      data: unidadMedida,
    };
  }

  async update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto): Promise<{ message: string; result: boolean; data: UnidadMedida | null }> {
    const unidadExist = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });

    if (!unidadExist) {
      return {
        message: `Unidad de medida con ID ${id} no encontrada`,
        result: false,
        data: null,
      };
    }

    const unidadActualizada = Object.assign(unidadExist, updateUnidadMedidaDto);
    await this.unidadMedidaRepository.save(unidadActualizada);

    return {
      message: `Unidad de medida con ID ${id} actualizada con éxito`,
      result: true,
      data: unidadActualizada,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const unidadMedida = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });

    if (!unidadMedida) {
      return {
        message: `Unidad de medida con ID ${id} no encontrada`,
        result: false,
      };
    }

    await this.unidadMedidaRepository.softDelete(id);

    return {
      message: `Unidad de medida con ID ${id} eliminada con éxito`,
      result: true,
    };
  }

  

}
