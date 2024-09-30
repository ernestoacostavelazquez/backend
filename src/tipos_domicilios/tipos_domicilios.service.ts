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

  async create(createTipoDomicilioDto: CreateTiposDomicilioDto): Promise<TiposDomicilio> {
    const tipoDomicilioExist = await this.tiposDomiciliosRepository.findOne({
      where: { nombre_tipo_domicilio: createTipoDomicilioDto.nombre_tipo_domicilio },
    });

    if (tipoDomicilioExist) {
      throw new HttpException('El tipo de domicilio ya existe', HttpStatus.CONFLICT);
    }

    const nuevoTipoDomicilio = this.tiposDomiciliosRepository.create(createTipoDomicilioDto);
    return this.tiposDomiciliosRepository.save(nuevoTipoDomicilio);
  }

  async findAll(): Promise<TiposDomicilio[]> {
    return this.tiposDomiciliosRepository.find();
  }

  async findOne(id: number): Promise<TiposDomicilio> {
    const tipoDomicilio = await this.tiposDomiciliosRepository.findOne({ where: { id_tipo_domicilio: id } });
    if (!tipoDomicilio) {
      throw new NotFoundException(`Tipo de domicilio con ID ${id} no encontrado`);
    }
    return tipoDomicilio;
  }

  async update(id: number, updateTipoDomicilioDto: UpdateTiposDomicilioDto): Promise<void> {
    const result = await this.tiposDomiciliosRepository.update(id, updateTipoDomicilioDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de domicilio con ID ${id} no encontrado`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.tiposDomiciliosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de domicilio con ID ${id} no encontrado`);
    }
  }
}
