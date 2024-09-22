import { Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuentasContablesService {

  constructor(
    @InjectRepository(CuentasContable)
    private cuentascontableRepository:Repository<CuentasContable>
  ) {} 
  

  async create(createCuentasContableDto: CreateCuentasContableDto) {
    return this.cuentascontableRepository.save(createCuentasContableDto);
  }

  async findAll() {
    return await this.cuentascontableRepository.find();
  }

  async findOne(id_cuenta: number) {
    return await this.cuentascontableRepository.findOneBy({id_cuenta});
  }

  async update(id_cuenta: number, updateCuentasContableDto: UpdateCuentasContableDto) {
    return await this.cuentascontableRepository.update({id_cuenta},updateCuentasContableDto);
  }

  async remove(id_cuenta: number) {
    return await this.cuentascontableRepository.softDelete(id_cuenta);
  }
}
