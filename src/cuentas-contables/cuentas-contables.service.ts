import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { Repository } from 'typeorm';
import { SubdivisionCuentasContable } from 'src/subdivision-cuentas-contables/entities/subdivision-cuentas-contable.entity';

@Injectable()
export class CuentasContablesService {

  constructor(
    @InjectRepository(CuentasContable)
    private cuentascontableRepository: Repository<CuentasContable>,
    
    @InjectRepository(SubdivisionCuentasContable)
    private subdivisionCuentasRepository: Repository<SubdivisionCuentasContable>, // Repositorio de subdivision_cuentas_contable
  ) {}

  // Función para crear una nueva cuenta contable
  async create(createCuentasContableDto: CreateCuentasContableDto) {
    const { id_subdivision, ...rest } = createCuentasContableDto;

    // Verificar si la subdivisión existe
    const subdivision = await this.subdivisionCuentasRepository.findOne({
      where: { id_subdivision },
    });

    if (!subdivision) {
      throw new HttpException('Subdivisión no encontrada', HttpStatus.NOT_FOUND);
    }

    // Crear la cuenta contable y asociarla con la subdivisión
    const newCuenta = this.cuentascontableRepository.create({
      ...rest,
      subdivision,  // Relación con la subdivisión
    });

    return await this.cuentascontableRepository.save(newCuenta);
  }

  // Función para encontrar todas las cuentas contables
  async findAll() {
    return await this.cuentascontableRepository.find({
      relations: ['subdivision'], // Incluir la relación con subdivision
    });
  }

  // Función para encontrar una cuenta contable por su ID
  async findOne(id_cuenta: number) {
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
      relations: ['subdivision'], // Incluir la relación con subdivision
    });

    if (!cuenta) {
      throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }

    return cuenta;
  }

  // Función para actualizar una cuenta contable existente
  async update(id_cuenta: number, updateCuentasContableDto: UpdateCuentasContableDto) {
    const { id_subdivision, ...rest } = updateCuentasContableDto;

    // Buscar la cuenta existente
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
      relations: ['subdivision'],
    });

    if (!cuenta) {
      throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar la subdivisión
    if (id_subdivision) {
      const subdivision = await this.subdivisionCuentasRepository.findOne({
        where: { id_subdivision },
      });

      if (!subdivision) {
        throw new HttpException('Subdivisión no encontrada', HttpStatus.NOT_FOUND);
      }

      cuenta.subdivision = subdivision;  // Actualizar la relación con la subdivisión
    }

    Object.assign(cuenta, rest);

    return await this.cuentascontableRepository.save(cuenta);
  }

  // Función para eliminar una cuenta contable por su ID
  async remove(id_cuenta: number) {
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
    });

    if (!cuenta) {
      throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.cuentascontableRepository.softDelete(id_cuenta);
  }
}
