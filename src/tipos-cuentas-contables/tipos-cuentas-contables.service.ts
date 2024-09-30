import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  const tiposCuentaFound =  await this.tiposcuentascontablesRepository.findOne({
    where:{
      nombre_tipo:createTiposCuentasContableDto.nombre_tipo
    }
  })
  if (tiposCuentaFound){
    return new HttpException('Tipo de Cuenta ya Existe',HttpStatus.CONFLICT)
  }
    const newTipoCuenta = this.tiposcuentascontablesRepository.create(createTiposCuentasContableDto)
    return this.tiposcuentascontablesRepository.save(newTipoCuenta);
  }

  async findAll() {
    return await this.tiposcuentascontablesRepository.find({
      relations:['id_subdivision'], // Incluir la relación en las consultas
    });   
  }

  /*
  async findOne(id_tipo_cuenta: number) {
    return await this.tiposcuentascontablesRepository.findOne({
      where:{id_tipo_cuenta},
      relations: ['id_subdivision'], // Cargar la relación con subdivision de cuentas
     } );
  }
*/


async findOne(id_tipo_cuenta: number) {

  const tiposCuentaFound = await this.tiposcuentascontablesRepository.findOne({
    where:{id_tipo_cuenta},
      relations: ['id_subdivision'], // Cargar la relación con subdivision de cuentas
  })
  if(!tiposCuentaFound){
    return new HttpException('Tipo de Cuenta no Existe',HttpStatus.NOT_FOUND)
  }
  return tiposCuentaFound
}


  async update(id_tipo_cuenta: number, updateTiposCuentasContableDto: UpdateTiposCuentasContableDto) {
    const tiposCuentaFound = await this.tiposcuentascontablesRepository.findOne({
      where:{
        id_tipo_cuenta
      }
    });
    if (!tiposCuentaFound){
      return new HttpException('Tipo de Cuenta no existe',HttpStatus.NOT_FOUND)
    }
    const updateTiposCuenta = Object.assign(tiposCuentaFound,updateTiposCuentasContableDto);
    return this.tiposcuentascontablesRepository.save(updateTiposCuenta)
  }

  async remove(id_tipo_cuenta: number) {
        const result = await this.tiposcuentascontablesRepository.softDelete(id_tipo_cuenta);
        if (result.affected ===0){
          return new HttpException('Tipo de Cuenta no Existe',HttpStatus.NOT_FOUND)
        }
        return result;
  }
}
