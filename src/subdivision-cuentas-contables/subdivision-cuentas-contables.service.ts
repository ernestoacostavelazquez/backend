import { Injectable } from '@nestjs/common';
import { CreateSubdivisionCuentasContableDto } from './dto/create-subdivision-cuentas-contable.dto';
import { UpdateSubdivisionCuentasContableDto } from './dto/update-subdivision-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubdivisionCuentasContable } from './entities/subdivision-cuentas-contable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubdivisionCuentasContablesService {

  constructor(
    @InjectRepository(SubdivisionCuentasContable)
    private subdivisioncuentascontablesRepository:Repository<SubdivisionCuentasContable>
  ){}

  async create(createSubdivisionCuentasContableDto: CreateSubdivisionCuentasContableDto) {
    return await this.subdivisioncuentascontablesRepository.save(createSubdivisionCuentasContableDto) ;
  }

  async findAll() {
    return await this.subdivisioncuentascontablesRepository.find();
  }

  async findOne(id_subdivision: number) {
    return await this.subdivisioncuentascontablesRepository.findOneBy({id_subdivision});
  }

  async update(id_subdivision: number, updateSubdivisionCuentasContableDto: UpdateSubdivisionCuentasContableDto) {
    return await this.subdivisioncuentascontablesRepository.update({id_subdivision},updateSubdivisionCuentasContableDto);
  }

  async remove(id_subdivision: number) {
    return await this.subdivisioncuentascontablesRepository.softDelete(id_subdivision) ;
  }
}
