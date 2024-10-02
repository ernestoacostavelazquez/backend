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
    private subdivisionCuentasRepository: Repository<SubdivisionCuentasContable>,

    @InjectRepository(TiposCuentasContables)
    private tiposCuentasContablesRepository: Repository<TiposCuentasContables>  // Repositorio para TiposCuentasContables
  ) {}

  // Función para crear una nueva subdivisión
  async create(createSubdivisionCuentasContableDto: CreateSubdivisionCuentasContableDto) {
    const { id_tipo_cuenta, ...rest } = createSubdivisionCuentasContableDto;

    // Verificar si el tipo de cuenta existe
    const tipoCuenta = await this.tiposCuentasContablesRepository.findOne({
      where: { id_tipo_cuenta },
    });

    if (!tipoCuenta) {
      throw new HttpException('Tipo de cuenta no encontrado', HttpStatus.NOT_FOUND);
    }

    // Crear la nueva subdivisión y asociarla con el tipo de cuenta
    const newSubdivision = this.subdivisionCuentasRepository.create({
      ...rest,
      tipo_cuenta: tipoCuenta,  // Relación con tipo de cuenta
    });

    return await this.subdivisionCuentasRepository.save(newSubdivision);
  }

  // Función para encontrar todas las subdivisiones
  async findAll() {
    return await this.subdivisionCuentasRepository.find({
      relations: ['tipo_cuenta'], // Incluir la relación con tipo_cuenta en las consultas
    });
  }

  // Función para encontrar una subdivisión por su ID
  async findOne(id_subdivision: number) {
    const subdivision = await this.subdivisionCuentasRepository.findOne({
      where: { id_subdivision },
      relations: ['tipo_cuenta'], // Cargar la relación con tipo_cuenta
    });

    // Validar si la subdivisión no existe
    if (!subdivision) {
      throw new HttpException('Subdivisión no encontrada', HttpStatus.NOT_FOUND);
    }

    return subdivision;
  }

  // Función para actualizar una subdivisión
  async update(id_subdivision: number, updateSubdivisionCuentasContableDto: UpdateSubdivisionCuentasContableDto) {
    const { id_tipo_cuenta, ...rest } = updateSubdivisionCuentasContableDto;

    // Buscar la subdivisión existente
    const subdivision = await this.subdivisionCuentasRepository.findOne({
      where: { id_subdivision },
      relations: ['tipo_cuenta'],  // Incluir la relación actual
    });

    if (!subdivision) {
      throw new HttpException('Subdivisión no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el tipo de cuenta
    if (id_tipo_cuenta) {
      const tipoCuenta = await this.tiposCuentasContablesRepository.findOne({
        where: { id_tipo_cuenta },
      });

      if (!tipoCuenta) {
        throw new HttpException('Tipo de cuenta no encontrado', HttpStatus.NOT_FOUND);
      }

      subdivision.tipo_cuenta = tipoCuenta;  // Actualizar la relación con tipo de cuenta
    }

    Object.assign(subdivision, rest);

    return await this.subdivisionCuentasRepository.save(subdivision);
  }

  // Función para eliminar una subdivisión
  async remove(id_subdivision: number) {
    const subdivision = await this.subdivisionCuentasRepository.findOne({
      where: { id_subdivision },
    });

    if (!subdivision) {
      throw new HttpException('Subdivisión no encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.subdivisionCuentasRepository.softDelete(id_subdivision);
  }

}

