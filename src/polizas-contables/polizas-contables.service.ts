// polizas-contables.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePolizasContableDto } from './dto/create-polizas-contable.dto';
import { UpdatePolizasContableDto } from './dto/update-polizas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PolizasContable } from './entities/polizas-contable.entity';
import { Repository } from 'typeorm';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';

@Injectable()
export class PolizasContablesService {

  constructor(
    @InjectRepository(PolizasContable)
    private polizasContableRepository: Repository<PolizasContable>,

    @InjectRepository(TiposPoliza)
    private tiposPolizaRepository: Repository<TiposPoliza>,
  ) {}

  // Función para crear una nueva póliza contable
  async create(createPolizasContableDto: CreatePolizasContableDto) {
    const { id_tipo_poliza, ...rest } = createPolizasContableDto;

    // Verificar si el tipo de póliza existe
    const tipoPoliza = await this.tiposPolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPoliza) {
      throw new HttpException('Tipo de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    const newPoliza = this.polizasContableRepository.create({
      ...rest,
      tipo_poliza: tipoPoliza, // Relación con el tipo de póliza
    });

    return await this.polizasContableRepository.save(newPoliza);
  }

  // Función para obtener todas las pólizas contables
  async findAll() {
    return await this.polizasContableRepository.find({
      relations: ['tipo_poliza'], // Incluir la relación con tipo de póliza
    });
  }

  // Función para obtener una póliza contable por su ID
  async findOne(id_poliza: number) {
    const poliza = await this.polizasContableRepository.findOne({
      where: { id_poliza },
      relations: ['tipo_poliza'], // Incluir la relación con tipo de póliza
    });

    if (!poliza) {
      throw new HttpException('Póliza no encontrada', HttpStatus.NOT_FOUND);
    }

    return poliza;
  }

  // Función para actualizar una póliza contable existente
  async update(id_poliza: number, updatePolizasContableDto: UpdatePolizasContableDto) {
    const { id_tipo_poliza, ...rest } = updatePolizasContableDto;

    // Buscar la póliza existente
    const poliza = await this.polizasContableRepository.findOne({
      where: { id_poliza },
      relations: ['tipo_poliza'], // Incluir la relación con tipo de póliza
    });

    if (!poliza) {
      throw new HttpException('Póliza no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si el tipo de póliza necesita ser actualizado
    if (id_tipo_poliza) {
      const tipoPoliza = await this.tiposPolizaRepository.findOne({
        where: { id_tipo_poliza },
      });

      if (!tipoPoliza) {
        throw new HttpException('Tipo de póliza no encontrado', HttpStatus.NOT_FOUND);
      }

      poliza.tipo_poliza = tipoPoliza; // Actualizar la relación con el tipo de póliza
    }

    Object.assign(poliza, rest);

    return await this.polizasContableRepository.save(poliza);
  }

  // Función para eliminar una póliza contable por su ID
  async remove(id_poliza: number) {
    // Verificar si la póliza existe antes de eliminar
    const poliza = await this.polizasContableRepository.findOne({
      where: { id_poliza },
    });

    if (!poliza) {
      throw new HttpException('Póliza no encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.polizasContableRepository.softDelete({ id_poliza });
  }
}
