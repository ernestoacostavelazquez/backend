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
  private periodoscontablesRepository:Repository<PeriodosContable>
){}

  async create(createPeriodosContableDto: CreatePeriodosContableDto) {
    return await this.periodoscontablesRepository.save(createPeriodosContableDto);
  }

  async findAll() {
    return await this.periodoscontablesRepository.find();
  }

  async findOne(id_periodo: number) {
    return await this.periodoscontablesRepository.findOneBy({id_periodo});
  }

  async update(id_periodo: number, updatePeriodosContableDto: UpdatePeriodosContableDto) {
    return await this.periodoscontablesRepository.update({id_periodo},updatePeriodosContableDto);
  }

  async remove(id_periodo: number) {
    return this.periodoscontablesRepository.softDelete(id_periodo);
  }
}
