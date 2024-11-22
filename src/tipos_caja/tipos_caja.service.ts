// tipos_caja.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposCaja } from './entities/tipos_caja.entity';
import { CreateTiposCajaDto } from './dto/create-tipos_caja.dto';
import { UpdateTiposCajaDto } from './dto/update-tipos_caja.dto';

@Injectable()
export class TiposCajaService {
  constructor(
    @InjectRepository(TiposCaja)
    private readonly tiposCajaRepository: Repository<TiposCaja>,
  ) {}

  async create(createTiposCajaDto: CreateTiposCajaDto): Promise<{ message: string; result: boolean; data: TiposCaja | null }> {
    const existingTipoCaja = await this.tiposCajaRepository.findOne({
      where: { nombre_caja: createTiposCajaDto.nombre_caja },
    });

    if (existingTipoCaja) {
      return {
        message: 'El tipo de caja ya existe',
        result: false,
        data: null,
      };
    }

    const newTipoCaja = this.tiposCajaRepository.create(createTiposCajaDto);
    const savedTipoCaja = await this.tiposCajaRepository.save(newTipoCaja);

    return {
      message: 'Tipo de caja creado con éxito',
      result: true,
      data: savedTipoCaja,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: TiposCaja[] }> {
    const tiposCaja = await this.tiposCajaRepository.find();
    return {
      message: 'Listado de tipos de caja recuperado con éxito',
      result: true,
      data: tiposCaja,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: TiposCaja | null }> {
    const tipoCaja = await this.tiposCajaRepository.findOne({ where: { id_tipo_caja: id } });

    if (!tipoCaja) {
      return {
        message: 'El tipo de caja no existe',
        result: false,
        data: null,
      };
    }

    return {
      message: `Tipo de caja con ID ${id} recuperado con éxito`,
      result: true,
      data: tipoCaja,
    };
  }

  async update(id: number, updateTiposCajaDto: UpdateTiposCajaDto): Promise<{ message: string; result: boolean; data: TiposCaja | null }> {
    const tipoCaja = await this.tiposCajaRepository.preload({
      id_tipo_caja: id,
      ...updateTiposCajaDto,
    });

    if (!tipoCaja) {
      return {
        message: 'El tipo de caja no existe',
        result: false,
        data: null,
      };
    }

    const updatedTipoCaja = await this.tiposCajaRepository.save(tipoCaja);

    return {
      message: `Tipo de caja con ID ${id} actualizado con éxito`,
      result: true,
      data: updatedTipoCaja,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const result = await this.tiposCajaRepository.softDelete(id);

    if (result.affected === 0) {
      return {
        message: 'El tipo de caja no existe',
        result: false,
      };
    }

    return {
      message: `Tipo de caja con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
