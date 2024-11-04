import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiposDomicilioDto } from './dto/create-tipos_domicilio.dto';
import { UpdateTiposDomicilioDto } from './dto/update-tipos_domicilio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposDomicilio } from './entities/tipos_domicilio.entity';

@Injectable()
export class TiposDomiciliosService {
  constructor(
    @InjectRepository(TiposDomicilio)
    private readonly tiposDomiciliosRepository: Repository<TiposDomicilio>,
  ) {}

  async create(createTipoDomicilioDto: CreateTiposDomicilioDto): Promise<{ message: string; result: boolean; data: TiposDomicilio | null }> {
    const tipoDomicilioExist = await this.tiposDomiciliosRepository.findOne({
      where: { nombre_tipo_domicilio: createTipoDomicilioDto.nombre_tipo_domicilio },
    });

    if (tipoDomicilioExist) {
      return {
        message: 'El tipo de domicilio ya existe',
        result: false,
        data: null,
      };
    }

    const nuevoTipoDomicilio = this.tiposDomiciliosRepository.create(createTipoDomicilioDto);
    const tipoDomicilioCreado = await this.tiposDomiciliosRepository.save(nuevoTipoDomicilio);

    return {
      message: 'Tipo de domicilio creado con éxito',
      result: true,
      data: tipoDomicilioCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: TiposDomicilio[] }> {
    const tiposDomicilios = await this.tiposDomiciliosRepository.find();
    return {
      message: 'Listado de tipos de domicilio recuperado con éxito',
      result: true,
      data: tiposDomicilios,
    };
  }

  async findOne(id: number): Promise<{ message: string; result: boolean; data: TiposDomicilio | null }> {
    const tipoDomicilio = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio: id } });
    
    if (!tipoDomicilio) {
      return {
        message: `Tipo de domicilio con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    return {
      message: `Tipo de domicilio con ID ${id} recuperado con éxito`,
      result: true,
      data: tipoDomicilio,
    };
  }

  async update(id: number, updateTipoDomicilioDto: UpdateTiposDomicilioDto): Promise<{ message: string; result: boolean; data: TiposDomicilio | null }> {
    const tipoDomicilioExist = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio: id } });

    if (!tipoDomicilioExist) {
      return {
        message: `Tipo de domicilio con ID ${id} no encontrado`,
        result: false,
        data: null,
      };
    }

    const tipoDomicilioActualizado = Object.assign(tipoDomicilioExist, updateTipoDomicilioDto);
    await this.tiposDomiciliosRepository.save(tipoDomicilioActualizado);

    return {
      message: `Tipo de domicilio con ID ${id} actualizado con éxito`,
      result: true,
      data: tipoDomicilioActualizado,
    };
  }

  async remove(id: number): Promise<{ message: string; result: boolean }> {
    const tipoDomicilio = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio: id } });

    if (!tipoDomicilio) {
      return {
        message: `Tipo de domicilio con ID ${id} no encontrado`,
        result: false,
      };
    }

    await this.tiposDomiciliosRepository.softDelete(id);

    return {
      message: `Tipo de domicilio con ID ${id} eliminado con éxito`,
      result: true,
    };
  }
}
