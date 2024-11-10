import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCuentasContableDto } from './dto/create-cuentas-contable.dto';
import { UpdateCuentasContableDto } from './dto/update-cuentas-contable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { Repository } from 'typeorm';
import { GruposGenerosCuenta } from 'src/grupos_generos_cuentas/entities/grupos_generos_cuenta.entity';

@Injectable()
export class CuentasContablesService {

  constructor(
    @InjectRepository(CuentasContable)
    private cuentascontableRepository: Repository<CuentasContable>,
    
    @InjectRepository(GruposGenerosCuenta)
    private gruposGenerosRepository: Repository<GruposGenerosCuenta>,  // Repositorio para GruposGenerosCuenta
  ) {}

  // Función para crear una nueva cuenta contable
  async create(createCuentasContableDto: CreateCuentasContableDto) {
    const { id_grupo_genero, ...rest } = createCuentasContableDto;

    // Verificar si el grupo de género de cuenta existe
    const grupoGenero = await this.gruposGenerosRepository.findOne({
      where: { id_grupo_genero },
    });

    if (!grupoGenero) {
      throw new HttpException('Grupo de género no encontrado', HttpStatus.NOT_FOUND);
    }

    // Crear la cuenta contable y asociarla con la subdivisión y el grupo de género
    const newCuenta = this.cuentascontableRepository.create({
      ...rest,
      grupoGenero,  // Relación con el grupo de género
    });

    return await this.cuentascontableRepository.save(newCuenta);
  }

  // Función para encontrar todas las cuentas contables
  async findAll() {
    return await this.cuentascontableRepository.find({
      relations: ['grupoGenero'], // Incluir la relación con subdivision y grupoGenero
    });
  }

  // Función para encontrar una cuenta contable por su ID
  async findOne(id_cuenta: number) {
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
      relations: ['grupoGenero'], // Incluir la relación con subdivision y grupoGenero
    });

    if (!cuenta) {
      throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }

    return cuenta;
  }

  // Función para actualizar una cuenta contable existente
  async update(id_cuenta: number, updateCuentasContableDto: UpdateCuentasContableDto) {
    const { id_grupo_genero, ...rest } = updateCuentasContableDto;

    // Buscar la cuenta existente
    const cuenta = await this.cuentascontableRepository.findOne({
      where: { id_cuenta },
      relations: ['grupoGenero'],
    });

    if (!cuenta) {
      throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el grupo de género
    if (id_grupo_genero) {
      const grupoGenero = await this.gruposGenerosRepository.findOne({
        where: { id_grupo_genero },
      });

      if (!grupoGenero) {
        throw new HttpException('Grupo de género no encontrado', HttpStatus.NOT_FOUND);
      }

      cuenta.grupoGenero = grupoGenero;  // Actualizar la relación con el grupo de género
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
