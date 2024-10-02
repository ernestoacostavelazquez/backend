import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetallesPolizaDto } from './dto/create-detalles-poliza.dto';
import { UpdateDetallesPolizaDto } from './dto/update-detalles-poliza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesPoliza } from './entities/detalles-poliza.entity';
import { Repository } from 'typeorm';
import { PolizasContable } from 'src/polizas-contables/entities/polizas-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Injectable()
export class DetallesPolizasService {

  constructor(
    @InjectRepository(DetallesPoliza)
    private detallepolizaRepository: Repository<DetallesPoliza>,

    @InjectRepository(PolizasContable)
    private polizasContableRepository: Repository<PolizasContable>,  // Repositorio para pólizas contables

    @InjectRepository(CuentasContable)
    private cuentasContablesRepository: Repository<CuentasContable>, // Repositorio para cuentas contables
  ) {}

  // Función para crear un nuevo detalle de póliza
  async create(createDetallesPolizaDto: CreateDetallesPolizaDto) {
    const { id_poliza, id_cuenta, ...rest } = createDetallesPolizaDto;

    // Verificar si la póliza contable existe
    const polizaContable = await this.polizasContableRepository.findOne({
      where: { id_poliza },
    });

    if (!polizaContable) {
      throw new HttpException('Póliza contable no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar si la cuenta contable existe
    const cuentaContable = await this.cuentasContablesRepository.findOne({
      where: { id_cuenta },
    });

    if (!cuentaContable) {
      throw new HttpException('Cuenta contable no encontrada', HttpStatus.NOT_FOUND);
    }

    // Crear el nuevo detalle de la póliza y asociar la cuenta contable y la póliza
    const newDetalle = this.detallepolizaRepository.create({
      ...rest,
      poliza_contable: polizaContable,  // Relación con la póliza contable
      cuenta_contable: cuentaContable,  // Relación con la cuenta contable
    });

    return await this.detallepolizaRepository.save(newDetalle);
  }

  // Función para encontrar todos los detalles de póliza
  async findAll() {
    return await this.detallepolizaRepository.find({
      relations: ['poliza_contable', 'cuenta_contable'], // Incluir las relaciones con póliza contable y cuenta contable
    });
  }

  // Función para encontrar un detalle de póliza por su ID
  async findOne(id_detalle: number) {
    const detalle = await this.detallepolizaRepository.findOne({
      where: { id_detalle },
      relations: ['poliza_contable', 'cuenta_contable'], // Incluir las relaciones con póliza contable y cuenta contable
    });

    if (!detalle) {
      throw new HttpException('Detalle de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    return detalle;
  }

  // Función para actualizar un detalle de póliza existente
  async update(id_detalle: number, updateDetallesPolizaDto: UpdateDetallesPolizaDto) {
    const { id_poliza, id_cuenta, ...rest } = updateDetallesPolizaDto;

    // Buscar el detalle existente
    const detalle = await this.detallepolizaRepository.findOne({
      where: { id_detalle },
      relations: ['poliza_contable', 'cuenta_contable'],
    });

    if (!detalle) {
      throw new HttpException('Detalle de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si se necesita actualizar la póliza contable
    if (id_poliza) {
      const polizaContable = await this.polizasContableRepository.findOne({
        where: { id_poliza },
      });

      if (!polizaContable) {
        throw new HttpException('Póliza contable no encontrada', HttpStatus.NOT_FOUND);
      }

      detalle.poliza_contable = polizaContable;  // Actualizar la relación con la póliza contable
    }

    // Verificar si se necesita actualizar la cuenta contable
    if (id_cuenta) {
      const cuentaContable = await this.cuentasContablesRepository.findOne({
        where: { id_cuenta },
      });

      if (!cuentaContable) {
        throw new HttpException('Cuenta contable no encontrada', HttpStatus.NOT_FOUND);
      }

      detalle.cuenta_contable = cuentaContable;  // Actualizar la relación con la cuenta contable
    }

    Object.assign(detalle, rest);

    return await this.detallepolizaRepository.save(detalle);
  }

  // Función para eliminar un detalle de póliza
  async remove(id_detalle: number) {
    const detalle = await this.detallepolizaRepository.findOne({
      where: { id_detalle },
    });

    if (!detalle) {
      throw new HttpException('Detalle de póliza no encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.detallepolizaRepository.softDelete({ id_detalle });
  }
  
}
