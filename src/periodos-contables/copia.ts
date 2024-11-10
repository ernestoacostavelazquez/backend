//periodos-contables.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePeriodosContableDto } from './dto/create-periodos-contable.dto';
import { UpdatePeriodosContableDto } from './dto/update-periodos-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodosContable } from './entities/periodos-contable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodosContablesService {


  constructor(
    @InjectRepository(PeriodosContable)
    private periodoscontablesRepository: Repository<PeriodosContable>,
  ) {}

  async create(createPeriodosContableDto: CreatePeriodosContableDto): Promise<{ message: string; result: boolean; data: PeriodosContable }> {
    const periodoFound = await this.periodoscontablesRepository.findOne({
      where: { periodo: createPeriodosContableDto.periodo },
    });

    if (periodoFound) {
      return {
        message: 'El periodo contable ya existe',
        result: false,
        data: null,
      };
    }

    const newPeriodo = this.periodoscontablesRepository.create(createPeriodosContableDto);
    const periodoCreado = await this.periodoscontablesRepository.save(newPeriodo);

    return {
      message: 'Periodo contable creado con éxito',
      result: true,
      data: periodoCreado,
    };
  }

  async findAll(): Promise<{ message: string; result: boolean; data: PeriodosContable[] }> {
    const periodos = await this.periodoscontablesRepository.find();
    return {
      message: 'Listado de periodos contables recuperado con éxito',
      result: true,
      data: periodos,
    };
  }

  async findOne(id_periodo: number): Promise<{ message: string; result: boolean; data: PeriodosContable }> {
    const periodoFound = await this.periodoscontablesRepository.findOne({ where: { id_periodo } });
    if (!periodoFound) {
      return {
        message: 'Periodo contable no encontrado',
        result: false,
        data: null,
      };
    }

    return {
      message: `Periodo contable con ID ${id_periodo} recuperado con éxito`,
      result: true,
      data: periodoFound,
    };
  }

  async update(id_periodo: number, updatePeriodosContableDto: UpdatePeriodosContableDto): Promise<{ message: string; result: boolean; data: PeriodosContable }> {
    const periodoFound = await this.periodoscontablesRepository.findOne({ where: { id_periodo } });

    if (!periodoFound) {
      return {
        message: 'Periodo contable no encontrado',
        result: false,
        data: null,
      };
    }

    const updatedPeriodo = Object.assign(periodoFound, updatePeriodosContableDto);
    await this.periodoscontablesRepository.save(updatedPeriodo);

    return {
      message: `Periodo contable con ID ${id_periodo} actualizado con éxito`,
      result: true,
      data: updatedPeriodo,
    };
  }

  async remove(id_periodo: number): Promise<{ message: string; result: boolean }> {
    const result = await this.periodoscontablesRepository.softDelete({ id_periodo });
    if (result.affected === 0) {
      return {
        message: 'Periodo contable no encontrado',
        result: false,
      };
    }

    return {
      message: `Periodo contable con ID ${id_periodo} eliminado con éxito`,
      result: true,
    };
  }
}
