import { Injectable } from '@nestjs/common';
import { CreateTiposCuentasContableDto } from './dto/create-tipos-cuentas-contable.dto';
import { UpdateTiposCuentasContableDto } from './dto/update-tipos-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposCuentasContables } from './entities/tipos-cuentas-contable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposCuentasContablesService {

  constructor(
    @InjectRepository(TiposCuentasContables)
    private tiposcuentascontablesRepository:Repository<TiposCuentasContables>
  ){ }


  async create(createTiposCuentasContableDto: CreateTiposCuentasContableDto) {
    return await this.tiposcuentascontablesRepository.save(createTiposCuentasContableDto);
    
  }

  async findAll() {
    return await this.tiposcuentascontablesRepository.find();
  }

  async findOne(id_tipo_cuenta: number) {
    return await this.tiposcuentascontablesRepository.findOneBy({id_tipo_cuenta});
  }

  async update(id_tipo_cuenta: number, updateTiposCuentasContableDto: UpdateTiposCuentasContableDto) {
    return await this.tiposcuentascontablesRepository.update({id_tipo_cuenta},updateTiposCuentasContableDto);
  }
s
  async remove(id_tipo_cuenta: number) {
    return await this.tiposcuentascontablesRepository.softDelete(id_tipo_cuenta);
  }
}
