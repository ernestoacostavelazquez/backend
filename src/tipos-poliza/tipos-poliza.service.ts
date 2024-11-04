import { Injectable } from '@nestjs/common';
import { CreateTiposPolizaDto } from './dto/create-tipos-poliza.dto';
import { UpdateTiposPolizaDto } from './dto/update-tipos-poliza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposPoliza } from './entities/tipos-poliza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposPolizaService {

  constructor(
    @InjectRepository(TiposPoliza)
    private readonly tipospolizaRepository: Repository<TiposPoliza>,
  ) {}

  async create(createTiposPolizaDto: CreateTiposPolizaDto): Promise<{ message: string; result: boolean; data: TiposPoliza | null }> {
    const tipoPolizaExist = await this.tipospolizaRepository.findOne({
      where: { nombre_tipo_poliza: createTiposPolizaDto.nombre_tipo_poliza },
    });

    if (tipoPolizaExist) {
      return {
        message: 'El tipo de póliza ya existe',
        result: false,
        data: null,
      };
    }

    const nuevoTipoPoliza = this.tipospolizaRepository.create(createTiposPolizaDto);
    const tipoPolizaCreada = await this.tipospolizaRepository.save(nuevoTipoPoliza);

    return {
      message: 'Tipo de póliza creado con éxito',
      result: true,
      data: tipoPolizaCreada,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: TiposPoliza[] }> {
    const tiposPoliza = await this.tipospolizaRepository.find();
    return {
      message: 'Listado de tipos de póliza recuperado con éxito',
      result: true,
      data: tiposPoliza,
    };
  }

  async findOne(id_tipo_poliza: number): Promise<{ message: string; result: boolean; data: TiposPoliza | null }> {
    const tipoPoliza = await this.tipospolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPoliza) {
      return {
        message: `Tipo de póliza con ID ${id_tipo_poliza} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Tipo de póliza con ID ${id_tipo_poliza} recuperado con éxito`,
      result: true,
      data: tipoPoliza,
    };
  }

  async update(id_tipo_poliza: number, updateTiposPolizaDto: UpdateTiposPolizaDto): Promise<{ message: string; result: boolean; data: TiposPoliza | null }> {
    const tipoPolizaExist = await this.tipospolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPolizaExist) {
      return {
        message: `Tipo de póliza con ID ${id_tipo_poliza} no encontrado`,
        result: false,
        data: null,
      };
    }

    const tipoPolizaActualizada = Object.assign(tipoPolizaExist, updateTiposPolizaDto);
    await this.tipospolizaRepository.save(tipoPolizaActualizada);

    return {
      message: `Tipo de póliza con ID ${id_tipo_poliza} actualizado con éxito`,
      result: true,
      data: tipoPolizaActualizada,
    };
  }

  async remove(id_tipo_poliza: number): Promise<{ message: string; result: boolean }> {
    const tipoPolizaExist = await this.tipospolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPolizaExist) {
      return {
        message: `Tipo de póliza con ID ${id_tipo_poliza} no encontrado`,
        result: false,
      };
    }

    await this.tipospolizaRepository.softDelete(id_tipo_poliza);

    return {
      message: `Tipo de póliza con ID ${id_tipo_poliza} eliminado con éxito`,
      result: true,
    };
  }
}
