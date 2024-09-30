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
    private polizascontableRepository: Repository<PolizasContable>,

    @InjectRepository(TiposPoliza)
    private tiposPolizaRepository: Repository<TiposPoliza>,
  ) {}

  async create(createPolizasContableDto: CreatePolizasContableDto) {
    const {id_tipo_poliza, ...rest } = createPolizasContableDto;

    // Verificar si el tipo de poliza existe
    const tipoPoliza = await this.tiposPolizaRepository.findOne({
      where: { id_tipo_poliza },
    });

    if (!tipoPoliza) {
      throw new HttpException('Tipo de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    const newPoliza = this.polizascontableRepository.create({
      ...rest,
      tipo_poliza: tipoPoliza,
    });

    return await this.polizascontableRepository.save(newPoliza);
  }

  async findAll() {
    return await this.polizascontableRepository.find({
      relations: ['tipo_poliza'], // Incluir la relación con tipo de póliza
    });
  }

  async findOne(id_poliza: number) {
    return await this.polizascontableRepository.findOne({
      where: { id_poliza },
      relations: ['tipo_poliza'], // Incluir la relación con tipo de póliza
    });
  }

  async update(id_poliza: number, updatePolizasContableDto: UpdatePolizasContableDto) {
    const { id_tipo_poliza, ...rest } = updatePolizasContableDto;

    // Buscar la póliza existente
    const poliza = await this.polizascontableRepository.findOne({
      where: { id_poliza },
      relations: ['tipo_poliza'],
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

      poliza.tipo_poliza = tipoPoliza;
    }

    Object.assign(poliza, rest);

    return await this.polizascontableRepository.save(poliza);
  }

  async remove(id_poliza: number) {
    return await this.polizascontableRepository.softDelete({ id_poliza });
  }
}
