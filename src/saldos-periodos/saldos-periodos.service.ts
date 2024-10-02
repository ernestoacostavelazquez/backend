import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaldosPeriodoDto } from './dto/create-saldos-periodo.dto';
import { UpdateSaldosPeriodoDto } from './dto/update-saldos-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaldosPeriodo } from './entities/saldos-periodo.entity';
import { Repository } from 'typeorm';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Injectable()
export class SaldosPeriodosService {

  constructor(
    @InjectRepository(SaldosPeriodo)
    private saldosPeriodoRepository: Repository<SaldosPeriodo>,

    @InjectRepository(PeriodosContable)
    private periodosContableRepository: Repository<PeriodosContable>,

    @InjectRepository(CuentasContable)
    private cuentasContableRepository: Repository<CuentasContable>,
  ) {}

  // Función para crear un nuevo saldo de periodo
  async create(createSaldosPeriodoDto: CreateSaldosPeriodoDto) {
    const { id_periodo, id_cuenta, ...rest } = createSaldosPeriodoDto;

    // Verificar si el periodo contable existe
    const periodoContable = await this.periodosContableRepository.findOne({
      where: { id_periodo },
    });

    if (!periodoContable) {
      throw new HttpException('Periodo contable no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si la cuenta contable existe
    const cuentaContable = await this.cuentasContableRepository.findOne({
      where: { id_cuenta },
    });

    if (!cuentaContable) {
      throw new HttpException('Cuenta contable no encontrada', HttpStatus.NOT_FOUND);
    }

    // Crear el nuevo saldo y asociar la cuenta contable y el periodo contable
    const newSaldo = this.saldosPeriodoRepository.create({
      ...rest,
      periodo_contable: periodoContable,  // Relación con el periodo contable
      cuenta_contable: cuentaContable,    // Relación con la cuenta contable
    });

    return await this.saldosPeriodoRepository.save(newSaldo);
  }

  // Función para obtener todos los saldos de periodo
  async findAll() {
    return await this.saldosPeriodoRepository.find({
      relations: ['periodo_contable', 'cuenta_contable'], // Incluir las relaciones con periodo contable y cuenta contable
    });
  }

  // Función para obtener un saldo por su ID
  async findOne(id_saldo: number) {
    const saldo = await this.saldosPeriodoRepository.findOne({
      where: { id_saldo },
      relations: ['periodo_contable', 'cuenta_contable'], // Incluir las relaciones con periodo contable y cuenta contable
    });

    if (!saldo) {
      throw new HttpException('Saldo no encontrado', HttpStatus.NOT_FOUND);
    }

    return saldo;
  }

  // Función para actualizar un saldo existente
  async update(id_saldo: number, updateSaldosPeriodoDto: UpdateSaldosPeriodoDto) {
    const { id_periodo, id_cuenta, ...rest } = updateSaldosPeriodoDto;

    // Buscar el saldo existente
    const saldo = await this.saldosPeriodoRepository.findOne({
      where: { id_saldo },
      relations: ['periodo_contable', 'cuenta_contable'],
    });

    if (!saldo) {
      throw new HttpException('Saldo no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar el periodo contable
    if (id_periodo) {
      const periodoContable = await this.periodosContableRepository.findOne({
        where: { id_periodo },
      });

      if (!periodoContable) {
        throw new HttpException('Periodo contable no encontrado', HttpStatus.NOT_FOUND);
      }

      saldo.periodo_contable = periodoContable;  // Actualizar la relación con el periodo contable
    }

    // Verificar si se necesita actualizar la cuenta contable
    if (id_cuenta) {
      const cuentaContable = await this.cuentasContableRepository.findOne({
        where: { id_cuenta },
      });

      if (!cuentaContable) {
        throw new HttpException('Cuenta contable no encontrada', HttpStatus.NOT_FOUND);
      }

      saldo.cuenta_contable = cuentaContable;  // Actualizar la relación con la cuenta contable
    }

    Object.assign(saldo, rest);

    return await this.saldosPeriodoRepository.save(saldo);
  }

  // Función para eliminar un saldo por su ID
  async remove(id_saldo: number) {
    const saldo = await this.saldosPeriodoRepository.findOne({
      where: { id_saldo },
    });

    if (!saldo) {
      throw new HttpException('Saldo no encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.saldosPeriodoRepository.softDelete({ id_saldo });
  }
}
