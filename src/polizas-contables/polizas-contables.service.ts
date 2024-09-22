import { Injectable } from '@nestjs/common';
import { CreatePolizasContableDto } from './dto/create-polizas-contable.dto';
import { UpdatePolizasContableDto } from './dto/update-polizas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PolizasContable } from './entities/polizas-contable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PolizasContablesService {

  constructor(
    @InjectRepository(PolizasContable)
    private polizascontableRepository : Repository<PolizasContable>
  ){}

  async create(createPolizasContableDto: CreatePolizasContableDto) {
    return await this.polizascontableRepository.save(createPolizasContableDto);
  }

  async findAll() {
    return await this.polizascontableRepository.find();
  }

  async findOne(id_poliza: number) {
    return await  this.polizascontableRepository.findOneBy({id_poliza});
  }

  async update(id_poliza: number, updatePolizasContableDto: UpdatePolizasContableDto) {
    return await this.polizascontableRepository.update({id_poliza},updatePolizasContableDto);
  }

  async remove(id_poliza: number) {
    return await this.polizascontableRepository.softDelete({id_poliza});
  }
}
