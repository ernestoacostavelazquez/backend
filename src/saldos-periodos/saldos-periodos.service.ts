import { Injectable } from '@nestjs/common';
import { CreateSaldosPeriodoDto } from './dto/create-saldos-periodo.dto';
import { UpdateSaldosPeriodoDto } from './dto/update-saldos-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaldosPeriodo } from './entities/saldos-periodo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaldosPeriodosService {

  constructor(
    @InjectRepository(SaldosPeriodo)
    private saldosperiodoRepository:Repository<SaldosPeriodo>
  ){}


  async create(createSaldosPeriodoDto: CreateSaldosPeriodoDto) {
    return await this.saldosperiodoRepository.save(createSaldosPeriodoDto) ;
  }

  async findAll() {
    return await  this.saldosperiodoRepository.find() ;
  }

  async findOne(id_saldo: number) {
    return await this.saldosperiodoRepository.findOneBy({id_saldo}) ;
  }

  async update(id_saldo: number, updateSaldosPeriodoDto: UpdateSaldosPeriodoDto) {
    return await this.saldosperiodoRepository.update({id_saldo},updateSaldosPeriodoDto);
  }

  async remove(id_saldo: number) {
    return await this.saldosperiodoRepository.softDelete({id_saldo}) ;
  }
}
