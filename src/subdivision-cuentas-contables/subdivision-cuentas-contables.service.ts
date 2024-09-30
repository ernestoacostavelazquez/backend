import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubdivisionCuentasContableDto } from './dto/create-subdivision-cuentas-contable.dto';
import { UpdateSubdivisionCuentasContableDto } from './dto/update-subdivision-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubdivisionCuentasContable } from './entities/subdivision-cuentas-contable.entity';
import { Repository } from 'typeorm';
import { TiposCuentasContables } from 'src/tipos-cuentas-contables/entities/tipos-cuentas-contable.entity';

@Injectable()
export class SubdivisionCuentasContablesService {

  constructor(
    @InjectRepository(SubdivisionCuentasContable)
    private subdivisioncuentascontablesRepository:Repository<SubdivisionCuentasContable>,

    @InjectRepository(TiposCuentasContables)
    private readonly tiposCuentasContablesRepository: Repository<TiposCuentasContables>  // Repositorio para TiposCuentasContables
    
  ){}

  async create(createSubdivisionCuentasContableDto: CreateSubdivisionCuentasContableDto) {

    const subdivisionCuentasFound = await this.subdivisioncuentascontablesRepository.findOne({
      where:{
        nombre_subdivision:createSubdivisionCuentasContableDto.nombre_subdivision
      }
    })
    if(subdivisionCuentasFound){
      return new HttpException('Subdivision ya Existe',HttpStatus.CONFLICT)
    }

    // Obtener el tipo de cuenta
    const tipoCuenta = await this.tiposCuentasContablesRepository.findOne({
      where: { id_tipo_cuenta: createSubdivisionCuentasContableDto.id_tipo_cuenta },
    });

    if (!tipoCuenta) {
      throw new HttpException('Tipo de cuenta no encontrado', HttpStatus.NOT_FOUND);
    }

     // Crear la nueva subdivisión y asignar el tipo de cuenta
      const newSubdivisionCuenta =  await this.subdivisioncuentascontablesRepository.create({
      ...createSubdivisionCuentasContableDto,
      id_tipo_cuenta: tipoCuenta,  // Asignar el objeto tipo de cuenta a la subdivisión
     });

     return this.subdivisioncuentascontablesRepository.save(newSubdivisionCuenta);
    
  }

  async findAll() {
    return await this.subdivisioncuentascontablesRepository.find({
      relations:['id_tipo_cuenta'], // Incluir la relación en las consultas
    });
  }

  async findOne(id_subdivision: number) {
    return await this.subdivisioncuentascontablesRepository.findOne({
      where:{id_subdivision},
      relations: ['id_tipo_cuenta'], // Cargar la relación con TiposCuentasContables
    });
  }

  async update(id_subdivision: number, updateSubdivisionCuentasContableDto: UpdateSubdivisionCuentasContableDto) {
 //   return await this.subdivisioncuentascontablesRepository.update({id_subdivision},updateSubdivisionCuentasContableDto);
    return await '';
 
  }

  async remove(id_subdivision: number) {
    return await this.subdivisioncuentascontablesRepository.softDelete(id_subdivision) ;
  }
}

